import "dotenv/config";
import { createServer } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { handleMessage, startLiveSession, sendAudioChunk, endLiveSession, onAgentCommandResult } from "./agent.js";
import { getHistory, getUserSettings, updateUserSettings, setActiveAgentId, getActiveAgentId, deleteActiveAgent, getChatEvents, appendChatEvent } from "./db.js";

const PORT = Number(process.env.PORT || process.env.BACKEND_PORT || 8080);
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

// Create HTTP server for health checks and to host WebSocket
const server = createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Backend is live\n");
    return;
  }
  res.writeHead(404);
  res.end();
});

const wss = new WebSocketServer({ server });

// Increase timeouts for Cloud Run stability
server.keepAliveTimeout = 65000; // 65 seconds
server.headersTimeout = 66000;   // 66 seconds

server.listen(PORT, "0.0.0.0", () => {
  log("info", `Backend listening on http://0.0.0.0:${PORT} (WS included)`);
});


// Track connections by user_uid
const agentsByUid = new Map<string, WebSocket>();
const frontendsByUid = new Map<string, Set<WebSocket>>();

wss.on("connection", (ws) => {
  let isAgent = false;
  let isFrontend = false;
  let clientUid: string | null = null;
  let deviceId: string | null = null;
  let frontendAgentId: string | null = null;

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

  ws.on("message", async (data) => {
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
        const requestedAgentId = typeof msg.agent_id === "string" ? msg.agent_id.trim() : "";
        if (requestedAgentId) {
          try {
            await setActiveAgentId(clientUid, requestedAgentId);
          } catch (err) {
            log("error", "Failed to set active agent", err);
          }
          frontendAgentId = requestedAgentId;
        } else {
          try {
            frontendAgentId = await getActiveAgentId(clientUid);
          } catch {
            frontendAgentId = null;
          }
        }
        if (!frontendsByUid.has(clientUid)) {
          frontendsByUid.set(clientUid, new Set());
        }
        frontendsByUid.get(clientUid)!.add(ws);
        log("info", `Frontend registered for UID=${clientUid}`);
        ws.send(JSON.stringify(makeEvent("backend_ready", "ok", "Backend connected")));
        getUserSettings(clientUid)
          .then((settings) => {
            ws.send(JSON.stringify({
              type: "user_settings",
              has_gemini_api_key: Boolean(settings.gemini_api_key),
              agent_tag: settings.agent_tag,
              agent_soul: settings.agent_soul,
              agent_id: frontendAgentId
            }));
          })
          .catch((err) => log("error", "Failed to load user settings", err));
        
        getChatEvents(clientUid).then(events => {
          if (events && events.length > 0) {
            ws.send(JSON.stringify({ type: "history_sync", events }));
            return;
          }
          // Backward-compatible fallback for users who only have legacy AI history
          getHistory(clientUid).then(history => {
            if (history && history.length > 0) {
              const historyEvents = history.map(turn => {
                const text = turn.parts?.[0]?.text || "";
                if (turn.role === "user") {
                  return { type: "outgoing", text, tag: "ws", ts_ms: Date.now() };
                } else {
                  return { type: "chat_reply", text, ts_ms: Date.now() };
                }
              });
              ws.send(JSON.stringify({ type: "history_sync", events: historyEvents }));
            }
          }).catch(err => log("error", "Failed to sync legacy history", err));
        }).catch(err => log("error", "Failed to sync chat events", err));
        
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
        // Only broadcast screenshots or strict errors to the frontend UI
        if (isScreenshotEvent(msg)) {
          broadcastToFrontends(clientUid, msg);
          appendChatEvent(clientUid, {
            ts_ms: msg.ts_ms || Date.now(),
            duration_ms: msg.duration_ms || 0,
            index: msg.index || 0,
            tag: msg.tag || "ws",
            instruction: msg.instruction || "screenshot",
            status: msg.status || "ok",
            detail: msg.detail || "Screenshot captured.",
            screenshot_path: msg.screenshot_path || null,
            screenshot_data_url: msg.screenshot_data_url || null
          }).catch((err) => log("error", "Failed to save screenshot chat event", err));

          const event = makeEvent("chat_reply", "ok", "Screenshot attached.");
          const replyEvent = { ...event, type: "chat_reply", text: "Screenshot attached." };
          broadcastToFrontends(clientUid, replyEvent);
          appendChatEvent(clientUid, replyEvent).catch((err) => log("error", "Failed to save screenshot reply event", err));
        } else if (msg.status === "error") {
          const errText = msg.error || msg.detail || "Local agent encountered an error.";
          const event = makeEvent("chat_reply", "error", errText);
          const replyEvent = { ...event, type: "chat_reply", text: `Error: ${errText}` };
          broadcastToFrontends(clientUid, replyEvent);
          appendChatEvent(clientUid, replyEvent).catch((err) => log("error", "Failed to save error chat event", err));
        }

        if (isCommandResultEvent(msg)) {
          onAgentCommandResult(clientUid, msg).then((next) => {
            if (!next) return;
            if (next.type === "conversation") {
              const event = makeEvent("chat_reply", "ok", next.text);
              const replyEvent = { ...event, type: "chat_reply", text: next.text };
              broadcastToFrontends(clientUid!, replyEvent);
              appendChatEvent(clientUid!, replyEvent).catch((err) => log("error", "Failed to save orchestration reply event", err));
              return;
            }
            const nextAgentWs = agentsByUid.get(clientUid!);
            if (!nextAgentWs || nextAgentWs.readyState !== WebSocket.OPEN) return;
            sendToAgent(nextAgentWs, next.commands);
            const event = makeEvent("chat_reply", "ok", next.text);
            const replyEvent = { ...event, type: "chat_reply", text: next.text };
            broadcastToFrontends(clientUid!, replyEvent);
            appendChatEvent(clientUid!, replyEvent).catch((err) => log("error", "Failed to save orchestration command event", err));
          }).catch((err) => log("error", "Failed to advance task orchestration", err));
        }
        return;
      }

    if (isFrontend) {
      if (!clientUid) {
        ws.send(JSON.stringify({ type: "error", error: "Must send handshake first" }));
        return;
      }
      const uid = clientUid;
      const agentWs = agentsByUid.get(uid);

      if (msg.type === "start_call") {
        log("info", `Frontend -> LiveProxy started for UID=${uid}`, {});
        startLiveSession(uid, ws as any);
        return;
      }

      if (msg.type === "end_call") {
        log("info", `Frontend -> LiveProxy ended for UID=${uid}`, {});
        endLiveSession(uid);
        return;
      }

      if (msg.type === "audio_chunk") {
        sendAudioChunk(uid, msg.data);
        return;
      }

      if (msg.type === "update_settings") {
        const incoming: { gemini_api_key?: string; agent_tag?: string; agent_soul?: string } = {};
        if (typeof msg.gemini_api_key === "string") incoming.gemini_api_key = msg.gemini_api_key;
        if (typeof msg.agent_tag === "string") incoming.agent_tag = msg.agent_tag;
        if (typeof msg.agent_soul === "string") incoming.agent_soul = msg.agent_soul;

        updateUserSettings(uid, incoming)
          .then((settings) => {
            if (Object.prototype.hasOwnProperty.call(incoming, "gemini_api_key")) endLiveSession(uid);
            ws.send(JSON.stringify({
              type: "settings_updated",
              has_gemini_api_key: Boolean(settings.gemini_api_key),
              agent_tag: settings.agent_tag,
              agent_soul: settings.agent_soul
            }));
          })
          .catch((err) => {
            log("error", "Failed to update user settings", err);
            ws.send(JSON.stringify({
              type: "agent_error",
              detail: "Failed to save settings."
            }));
          });
        return;
      }

      if (msg.type === "delete_active_agent") {
        deleteActiveAgent(uid)
          .then((result) => {
            endLiveSession(uid);
            ws.send(JSON.stringify({
              type: "agent_deleted",
              deleted_agent_id: result.deleted_agent_id,
              active_agent_id: result.active_agent_id
            }));
          })
          .catch((err) => {
            log("error", "Failed to delete active agent", err);
            ws.send(JSON.stringify({
              type: "agent_error",
              detail: "Failed to delete agent."
            }));
          });
        return;
      }

      if (msg.type === "commands" && Array.isArray(msg.commands)) {
        if (!agentWs || agentWs.readyState !== WebSocket.OPEN) {
          ws.send(JSON.stringify(makeEvent("agent_offline", "error", "Local agent not connected")));
          return;
        }
        log("info", `Frontend -> Agent for UID=${clientUid} (batch)`, { count: msg.commands.length });
        sendToAgent(agentWs, msg.commands);
        ws.send(JSON.stringify(makeEvent("commands_sent", "ok", `Sent ${msg.commands.length} commands to agent`)));
        return;
      }

      const input = msg.text || msg.instruction;
      if (input) {
        log("info", `Frontend -> AI for UID=${clientUid}`, { input });
        const outgoingEvent = {
          type: "outgoing",
          text: String(input),
          tag: (typeof msg.tag === "string" && msg.tag.trim()) ? msg.tag.trim() : "ws",
          reply_to: typeof msg.reply_to === "string" ? msg.reply_to : undefined,
          ts_ms: Date.now()
        };
        appendChatEvent(clientUid, outgoingEvent).catch((err) => log("error", "Failed to save outgoing chat event", err));

        handleMessage(clientUid, input).then(response => {
           if (response.type === "conversation") {
              if (response.text.trim() !== "") {
                const event = makeEvent("chat_reply", "ok", response.text);
                const replyEvent = { ...event, type: "chat_reply", text: response.text };
                ws.send(JSON.stringify(replyEvent));
                appendChatEvent(clientUid, replyEvent).catch((err) => log("error", "Failed to save conversation reply event", err));
              }
           } else if (response.type === "commands") {
              if (!agentWs || agentWs.readyState !== WebSocket.OPEN) {
                 ws.send(JSON.stringify(makeEvent("agent_offline", "error", "AI generated commands, but local agent is not connected!")));
                 return;
              }
              sendToAgent(agentWs, response.commands);
              // Send the natural language reply accompanying the internal commands
              const event = makeEvent("chat_reply", "ok", response.text);
              const replyEvent = { ...event, type: "chat_reply", text: response.text };
              ws.send(JSON.stringify(replyEvent));
              appendChatEvent(clientUid, replyEvent).catch((err) => log("error", "Failed to save command reply event", err));
           }
        }).catch(err => {
           log("error", "Agent error", err);
           const errorEvent = makeEvent("agent_error", "error", "AI failed to process instruction");
           ws.send(JSON.stringify(errorEvent));
           appendChatEvent(clientUid, errorEvent).catch((saveErr) => log("error", "Failed to save agent error event", saveErr));
        });

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

function isCommandResultEvent(payload: any): boolean {
  return Boolean(
    payload &&
    typeof payload === "object" &&
    typeof payload.instruction === "string" &&
    typeof payload.status === "string" &&
    (typeof payload.index === "number" || typeof payload.index === "string")
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
