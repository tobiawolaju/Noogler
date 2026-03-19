import "dotenv/config";
import { createServer } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { handleMessage, startLiveSession, sendAudioChunk, endLiveSession } from "./agent.js";
import { getHistory, getUserGeminiApiKey, setUserGeminiApiKey } from "./db.js";
const PORT = Number(process.env.PORT || process.env.BACKEND_PORT || 8080);
const LOG_LEVEL = (process.env.LOG_LEVEL || "info").toLowerCase();
const LOG_LEVELS = { debug: 10, info: 20, warn: 30, error: 40 };
function log(level, message, meta) {
    if (LOG_LEVELS[level] < (LOG_LEVELS[LOG_LEVEL] || 20))
        return;
    const stamp = new Date().toISOString();
    if (meta !== undefined) {
        console.log(`[${stamp}] [${level.toUpperCase()}] ${message}`, meta);
    }
    else {
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
server.headersTimeout = 66000; // 66 seconds
server.listen(PORT, "0.0.0.0", () => {
    log("info", `Backend listening on http://0.0.0.0:${PORT} (WS included)`);
});
// Track connections by user_uid
const agentsByUid = new Map();
const frontendsByUid = new Map();
wss.on("connection", (ws) => {
    let isAgent = false;
    let isFrontend = false;
    let clientUid = null;
    let deviceId = null;
    log("info", "New client connected. Waiting for handshake...");
    ws.on("close", () => {
        log("info", `Client disconnected. IsAgent=${isAgent}, IsFrontend=${isFrontend}, UID=${clientUid}`);
        if (isAgent && clientUid) {
            if (agentsByUid.get(clientUid) === ws) {
                agentsByUid.delete(clientUid);
                broadcastToFrontends(clientUid, makeEvent("agent_disconnected", "error", "Local agent disconnected"));
            }
        }
        else if (isFrontend && clientUid) {
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
        let msg;
        try {
            msg = JSON.parse(data.toString());
        }
        catch {
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
                frontendsByUid.get(clientUid).add(ws);
                log("info", `Frontend registered for UID=${clientUid}`);
                ws.send(JSON.stringify(makeEvent("backend_ready", "ok", "Backend connected")));
                getUserGeminiApiKey(clientUid)
                    .then((apiKey) => {
                    ws.send(JSON.stringify({
                        type: "user_settings",
                        has_gemini_api_key: Boolean(apiKey)
                    }));
                })
                    .catch((err) => log("error", "Failed to load user settings", err));
                getHistory(clientUid).then(history => {
                    if (history && history.length > 0) {
                        const historyEvents = history.map(turn => {
                            const text = turn.parts?.[0]?.text || "";
                            if (turn.role === "user") {
                                return { type: "outgoing", text, tag: "ws" };
                            }
                            else {
                                return { type: "chat_reply", text };
                            }
                        });
                        ws.send(JSON.stringify({ type: "history_sync", events: historyEvents }));
                    }
                }).catch(err => log("error", "Failed to sync history", err));
                if (agentsByUid.has(clientUid)) {
                    ws.send(JSON.stringify(makeEvent("agent_connected", "ok", "Local agent is already connected")));
                }
                else {
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
                const event = makeEvent("chat_reply", "ok", "Screenshot attached.");
                broadcastToFrontends(clientUid, { ...event, type: "chat_reply", text: "Screenshot attached." });
            }
            else if (msg.status === "error") {
                const errText = msg.error || msg.detail || "Local agent encountered an error.";
                const event = makeEvent("chat_reply", "error", errText);
                broadcastToFrontends(clientUid, { ...event, type: "chat_reply", text: `Error: ${errText}` });
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
                startLiveSession(uid, ws);
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
                const nextApiKey = typeof msg.gemini_api_key === "string" ? msg.gemini_api_key : "";
                setUserGeminiApiKey(uid, nextApiKey)
                    .then(() => {
                    endLiveSession(uid);
                    ws.send(JSON.stringify({
                        type: "settings_updated",
                        has_gemini_api_key: Boolean(nextApiKey.trim())
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
                handleMessage(clientUid, input).then(response => {
                    if (response.type === "conversation") {
                        if (response.text.trim() !== "") {
                            const event = makeEvent("chat_reply", "ok", response.text);
                            ws.send(JSON.stringify({ ...event, type: "chat_reply", text: response.text }));
                        }
                    }
                    else if (response.type === "commands") {
                        if (!agentWs || agentWs.readyState !== WebSocket.OPEN) {
                            ws.send(JSON.stringify(makeEvent("agent_offline", "error", "AI generated commands, but local agent is not connected!")));
                            return;
                        }
                        sendToAgent(agentWs, response.commands);
                        // Send the natural language reply accompanying the internal commands
                        const event = makeEvent("chat_reply", "ok", response.text);
                        ws.send(JSON.stringify({ ...event, type: "chat_reply", text: response.text }));
                    }
                }).catch(err => {
                    log("error", "Agent error", err);
                    ws.send(JSON.stringify(makeEvent("agent_error", "error", "AI failed to process instruction")));
                });
                return;
            }
        }
    });
});
/* ── Helpers ──────────────────────────────────────── */
function broadcastToFrontends(uid, event) {
    const set = frontendsByUid.get(uid);
    if (!set)
        return;
    const message = JSON.stringify(event);
    for (const client of set) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    }
}
function makeEvent(instruction, status, detail) {
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
function isScreenshotEvent(payload) {
    return Boolean(payload &&
        payload.instruction &&
        typeof payload.instruction === "string" &&
        payload.instruction.startsWith("screenshot ") &&
        payload.status === "ok" &&
        payload.screenshot_data_url);
}
function sendToAgent(agentWs, commands) {
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
