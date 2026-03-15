import "dotenv/config";
import { WebSocket, WebSocketServer } from "ws";

const PORT = Number(process.env.BACKEND_PORT || 8787);
const LOG_LEVEL = (process.env.LOG_LEVEL || "info").toLowerCase();

type LogLevel = "debug" | "info" | "warn" | "error";
const LOG_LEVELS: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

function log(level: LogLevel, message: string, meta?: unknown) {
  if (LOG_LEVELS[level] < (LOG_LEVELS[LOG_LEVEL as LogLevel] || 20)) return;
  const stamp = new Date().toISOString();
  if (meta !== undefined) {
    console.log(`[${stamp}] [${level.toUpperCase()}] ${message}`, meta);
  } else {
    console.log(`[${stamp}] [${level.toUpperCase()}] ${message}`);
  }
}

const wss = new WebSocketServer({ port: PORT });
log("info", `Backend listening on ws://0.0.0.0:${PORT}`);

// Track connections by user_uid
const agentsByUid = new Map<string, WebSocket>();
const frontendsByUid = new Map<string, Set<WebSocket>>();

wss.on("connection", (ws) => {
  let isAgent = false;
  let isFrontend = false;
  let clientUid: string | null = null;
  let deviceId: string | null = null;

  log("info", "New client connected. Waiting for handshake...");

  ws.on("close", () => {
    log("info", `Client disconnected. IsAgent=${isAgent}, IsFrontend=${isFrontend}, UID=${clientUid}`);
    if (isAgent && clientUid) {
      if (agentsByUid.get(clientUid) === ws) {
        agentsByUid.delete(clientUid);
        broadcastToFrontends(clientUid, makeEvent("agent_disconnected", "error", "Local agent disconnected"));
      }
    } else if (isFrontend && clientUid) {
      const set = frontendsByUid.get(clientUid);
      if (set) {
        set.delete(ws);
        if (set.size === 0) {
          frontendsByUid.delete(clientUid);
        }
      }
    }
  });

  ws.on("message", (data) => {
    let msg: any;
    try {
      msg = JSON.parse(data.toString());
    } catch {
      ws.send(JSON.stringify({ type: "error", error: "Invalid JSON" }));
      log("warn", "Invalid JSON from client", data.toString());
      return;
    }

    // Ping/pong keepalive
    if (msg.type === "ping") {
      ws.send(JSON.stringify({ type: "pong", ts_ms: Date.now() }));
      return;
    }

    // --- Handshakes ---
    if (msg.type === "agent_handshake") {
      isAgent = true;
      clientUid = msg.user_uid;
      deviceId = msg.device_id;
      if (clientUid) {
        agentsByUid.set(clientUid, ws);
        log("info", `Agent registered for UID=${clientUid}, DeviceID=${deviceId}`);
        broadcastToFrontends(clientUid, makeEvent("agent_connected", "ok", `Connected to agent ${deviceId}`));
      }
      return;
    }

    if (msg.type === "frontend_handshake") {
      isFrontend = true;
      clientUid = msg.user_uid;
      if (clientUid) {
        if (!frontendsByUid.has(clientUid)) {
          frontendsByUid.set(clientUid, new Set());
        }
        frontendsByUid.get(clientUid)!.add(ws);
        log("info", `Frontend registered for UID=${clientUid}`);
        ws.send(JSON.stringify(makeEvent("backend_ready", "ok", "Backend connected")));
        
        if (agentsByUid.has(clientUid)) {
           ws.send(JSON.stringify(makeEvent("agent_connected", "ok", "Local agent is already connected")));
        } else {
           ws.send(JSON.stringify(makeEvent("agent_offline", "error", "Local agent not connected")));
        }
      }
      return;
    }

    // --- Message Routing ---
    if (!clientUid) {
      ws.send(JSON.stringify({ type: "error", error: "Must send handshake first" }));
      return;
    }

    if (isAgent) {
      log("debug", `Agent -> Backend for UID=${clientUid}`, msg);
      broadcastToFrontends(clientUid, msg);
      if (isScreenshotEvent(msg)) {
        broadcastToFrontends(clientUid, makeEvent("done", "ok", "Done. Screenshot attached."));
      }
      return;
    }

    if (isFrontend) {
      const agentWs = agentsByUid.get(clientUid);
      if (!agentWs || agentWs.readyState !== WebSocket.OPEN) {
        ws.send(JSON.stringify(makeEvent("agent_offline", "error", "Local agent not connected")));
        return;
      }

      if (msg.type === "commands" && Array.isArray(msg.commands)) {
        log("info", `Frontend -> Agent for UID=${clientUid} (batch)`, { count: msg.commands.length });
        sendToAgent(agentWs, msg.commands);
        ws.send(JSON.stringify(makeEvent("commands_sent", "ok", `Sent ${msg.commands.length} commands to agent`)));
        return;
      }

      if (msg.instruction) {
        const command = { index: 0, instruction: msg.instruction, tag: msg.tag || "ws" };
        log("info", `Frontend -> Agent for UID=${clientUid} (single)`, command);
        sendToAgent(agentWs, command);
        ws.send(JSON.stringify(makeEvent("commands_sent", "ok", `Sent command: ${msg.instruction}`)));
        return;
      }

      if (msg.text) {
        const command = { index: 0, instruction: msg.text, tag: msg.tag || "ws" };
        log("info", `Frontend -> Agent for UID=${clientUid} (raw text)`, { text: msg.text });
        sendToAgent(agentWs, command);
        ws.send(JSON.stringify(makeEvent("commands_sent", "ok", `Forwarded: ${msg.text}`)));
        return;
      }
    }
  });
});

/* ── Helpers ──────────────────────────────────────── */

function broadcastToFrontends(uid: string, event: unknown) {
  const set = frontendsByUid.get(uid);
  if (!set) return;
  const message = JSON.stringify(event);
  for (const client of set) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

function makeEvent(instruction: string, status: "ok" | "error", detail: string) {
  return {
    ts_ms: Date.now(),
    duration_ms: 0,
    index: 0,
    tag: "ai",
    instruction,
    status,
    detail
  };
}

function isScreenshotEvent(payload: any): boolean {
  return Boolean(
    payload &&
    payload.instruction &&
    typeof payload.instruction === "string" &&
    payload.instruction.startsWith("screenshot ") &&
    payload.status === "ok" &&
    payload.screenshot_data_url
  );
}

type CommandItem = { index?: number; instruction: string; tag?: string };

function sendToAgent(agentWs: WebSocket, commands: CommandItem[] | CommandItem) {
  if (Array.isArray(commands)) {
    const payload = {
      index: 0,
      instruction: JSON.stringify(commands),
      tag: "ws"
    };
    agentWs.send(JSON.stringify(payload));
    return;
  }

  const payload = {
    index: commands.index ?? 0,
    instruction: commands.instruction,
    tag: commands.tag ?? "ws"
  };
  agentWs.send(JSON.stringify(payload));
}
