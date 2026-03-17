import "dotenv/config";
import WebSocket from "ws";
import { getHistory, appendHistory } from "./db.js";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const HOST = "generativelanguage.googleapis.com";

if (!GEMINI_API_KEY) {
  console.warn("WARNING: GEMINI_API_KEY is not set. The agent will not function properly.");
}

export type AgentResponse =
  | { type: "conversation"; text: string }
  | { type: "commands"; text: string; commands: any[] };

// Maintain active Gemini connections per user UID
// Maintain active Gemini connections per user UID
const activeSessions = new Map<string, WebSocket>();

const TEXT_SYSTEM_PROMPT = `You are Noogler, a helpful AI desktop assistant.
You can converse with the user normally OR you can execute commands on their Windows PC.
When the user asks you a general question or wants to chat, reply with normal text.
When the user asks you to perform an action on their PC (e.g., "open start menu", "move the mouse", "type something"), you must output ONLY a valid JSON object matching this exact schema:
{
  "reply": "A natural language response saying what you are doing (e.g. 'Opening notepad for you.')",
  "commands": [
    { "index": 1, "instruction": "move <x> <y>", "tag": "ai" }
  ]
}

Supported commands:
- { "index": 1, "instruction": "move <x> <y>", "tag": "ai" }
- { "index": 1, "instruction": "click <x> <y>", "tag": "ai" }
- { "index": 1, "instruction": "doubleclick <x> <y>", "tag": "ai" }
- { "index": 1, "instruction": "mousedown <x> <y>", "tag": "ai" }
- { "index": 1, "instruction": "mouseup <x> <y>", "tag": "ai" }
- { "index": 1, "instruction": "drag <x1> <y1> <x2> <y2>", "tag": "ai" }
- { "index": 1, "instruction": "scroll <delta>", "tag": "ai" }
- { "index": 1, "instruction": "type: <text>", "tag": "ai" }
- { "index": 1, "instruction": "key: <NAME>", "tag": "ai" } (e.g., 'super', 'enter')
- { "index": 1, "instruction": "hotkey: <KEYS>", "tag": "ai" } (e.g., 'ctrl+c')
- { "index": 1, "instruction": "wait <ms>", "tag": "ai" }
- { "index": 1, "instruction": "screenshot <path>", "tag": "ai" }

If you reply with JSON commands, the entire response MUST be the JSON object and nothing else.
If you reply with conversational text ONLY (no commands), just output the plain text.
`;

const VOICE_SYSTEM_PROMPT = `You are Noogler, a helpful AI desktop assistant. 
You are currently on a live voice call with the user. 
Converse with them naturally, keep answers concise and conversational, as you are speaking out loud.`;

export async function handleMessage(uid: string, text: string): Promise<AgentResponse> {
  // Check if there is an active Live session
  const liveWs = activeSessions.get(uid);
  if (liveWs && liveWs.readyState === WebSocket.OPEN) {
    const realtimeClientContent = {
      clientContent: {
        turns: [{ role: "user", parts: [{ text }] }],
        turnComplete: true
      }
    };
    liveWs.send(JSON.stringify(realtimeClientContent));
    await appendHistory(uid, "user", text);
    // Return empty response so it doesn't duplicate in UI
    return { type: "conversation", text: "" };
  }

  const history = await getHistory(uid);

  // Add the new user message
  history.push({ role: "user", parts: [{ text }] });
  await appendHistory(uid, "user", text);

  const url = `https://${HOST}/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    system_instruction: { parts: { text: TEXT_SYSTEM_PROMPT } },
    contents: history,
    generationConfig: { temperature: 0.1 } // low temp for predictable JSON output
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API Error:", res.status, errText);
      return { type: "conversation", text: "Sorry, I had trouble talking to the AI service." };
    }

    const data = await res.json();
    let replyText = "";

    if (data.candidates && data.candidates.length > 0) {
      replyText = data.candidates[0].content.parts[0].text.trim();
    }

    // Add model reply to history
    await appendHistory(uid, "model", replyText);

    // Detect if the response is a JSON object of commands
    if (replyText.startsWith("{") && replyText.endsWith("}")) {
      try {
        const parsed = JSON.parse(replyText);
        if (parsed.commands && Array.isArray(parsed.commands)) {
          return { type: "commands", text: parsed.reply || "Done.", commands: parsed.commands };
        }
      } catch (e) {
        console.warn("Failed to parse AI JSON response", e);
      }
    }

    // Otherwise, treat as conversational text
    return { type: "conversation", text: replyText };

  } catch (err) {
    console.error("Gemini API request failed:", err);
    return { type: "conversation", text: "Sorry, an internal error occurred while reaching the AI." };
  }
}

export async function startLiveSession(uid: string, frontendWs: WebSocket) {
  if (activeSessions.has(uid)) {
    endLiveSession(uid);
  }

  console.log(`[LiveProxy] Starting Gemini Live session for UID=${uid}`);

  const key = process.env.GEMINI_API_KEY || GEMINI_API_KEY;
  const wsUrl = `wss://${HOST}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${key}`;

  const historyTurns = await getHistory(uid);
  const geminiWs = new WebSocket(wsUrl);

  geminiWs.on("open", () => {
    console.log(`[LiveProxy] Connected to Gemini Live for UID=${uid}`);

    // Send setup
    const setupMsg = {
      setup: {
        model: "models/gemini-2.5-flash-native-audio-preview-12-2025",
        systemInstruction: {
          parts: [{ text: VOICE_SYSTEM_PROMPT }]
        },
        generationConfig: {
          responseModalities: ["AUDIO"]
        }
      }
    };
    geminiWs.send(JSON.stringify(setupMsg));
  });

  let voiceTranscriptBuffer = "";

  geminiWs.on("message", (data) => {
    try {
      const response = JSON.parse(data.toString());

      if (response.setupComplete) {
        console.log(`[LiveProxy] Setup complete for UID=${uid}`);
        // Session is ready. Send initial context/history if any.
        if (historyTurns.length > 0) {
          geminiWs.send(JSON.stringify({
            clientContent: {
              turns: historyTurns,
              turnComplete: true
            }
          }));
        }
        return;
      }

      if (response.serverContent) {
        if (response.serverContent.modelTurn) {
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
            } else if (part.text) {
              voiceTranscriptBuffer += part.text;
            }
          }
        }

        if (response.serverContent.turnComplete) {
          if (voiceTranscriptBuffer.trim().length > 0) {
            appendHistory(uid, "model", voiceTranscriptBuffer.trim());
            voiceTranscriptBuffer = ""; // reset for next turn
          }
        }
      }
    } catch (err) {
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

export function sendAudioChunk(uid: string, base64Pcm: string) {
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

export function endLiveSession(uid: string) {
  const geminiWs = activeSessions.get(uid);
  if (geminiWs) {
    console.log(`[LiveProxy] Ending Gemini Live session for UID=${uid}`);
    geminiWs.close();
    activeSessions.delete(uid);
  }
}
