import "dotenv/config";
import WebSocket from "ws";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const HOST = "generativelanguage.googleapis.com";
// Maintain active Gemini connections per user UID
const activeSessions = new Map();
// The system prompt for the voice assistant
const SYSTEM_PROMPT = `You are The Intern, a helpful AI desktop assistant. 
You are currently on a live voice call with the user. 
Converse with them naturally, keep answers concise and conversational, as you are speaking out loud.`;
export function startLiveSession(uid, frontendWs) {
    if (activeSessions.has(uid)) {
        endLiveSession(uid);
    }
    console.log(`[LiveProxy] Starting Gemini Live session for UID=${uid}`);
    const key = process.env.GEMINI_API_KEY || GEMINI_API_KEY;
    const wsUrl = `wss://${HOST}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${key}`;
    const geminiWs = new WebSocket(wsUrl);
    geminiWs.on("open", () => {
        console.log(`[LiveProxy] Connected to Gemini Live for UID=${uid}`);
        // Send setup
        const setupMsg = {
            setup: {
                model: "models/gemini-2.0-flash-exp",
                systemInstruction: {
                    parts: [{ text: SYSTEM_PROMPT }]
                },
                generationConfig: {
                    responseModalities: ["AUDIO"]
                }
            }
        };
        geminiWs.send(JSON.stringify(setupMsg));
    });
    geminiWs.on("message", (data) => {
        try {
            const response = JSON.parse(data.toString());
            if (response.serverContent && response.serverContent.modelTurn) {
                const parts = response.serverContent.modelTurn.parts;
                for (const part of parts) {
                    if (part.inlineData && part.inlineData.mimeType.startsWith("audio/pcm")) {
                        // Forward audio to frontend
                        if (frontendWs.readyState === WebSocket.OPEN) {
                            frontendWs.send(JSON.stringify({
                                type: "audio_reply",
                                data: part.inlineData.data
                            }));
                        }
                    }
                    else if (part.text) {
                        // We can optionally forward text transcriptions to the chat
                        if (frontendWs.readyState === WebSocket.OPEN) {
                            frontendWs.send(JSON.stringify({
                                type: "chat_reply",
                                text: `(Voice): ${part.text}`
                            }));
                        }
                    }
                }
            }
        }
        catch (err) {
            console.error(`[LiveProxy] Failed to parse Gemini msg for UID=${uid}`, err);
        }
    });
    geminiWs.on("close", (code, reason) => {
        console.log(`[LiveProxy] Gemini Live session closed for UID=${uid}. Code: ${code}, Reason: ${reason.toString()}`);
        activeSessions.delete(uid);
    });
    geminiWs.on("error", (err) => {
        console.error(`[LiveProxy] Gemini Live error for UID=${uid}:`, err);
    });
    activeSessions.set(uid, geminiWs);
}
export function sendAudioChunk(uid, base64Pcm) {
    const geminiWs = activeSessions.get(uid);
    if (!geminiWs || geminiWs.readyState !== WebSocket.OPEN) {
        return;
    }
    const realtimeInputMsg = {
        realtimeInput: {
            mediaChunks: [
                {
                    mimeType: "audio/pcm;rate=16000",
                    data: base64Pcm
                }
            ]
        }
    };
    geminiWs.send(JSON.stringify(realtimeInputMsg));
}
export function endLiveSession(uid) {
    const geminiWs = activeSessions.get(uid);
    if (geminiWs) {
        console.log(`[LiveProxy] Ending Gemini Live session for UID=${uid}`);
        geminiWs.close();
        activeSessions.delete(uid);
    }
}
