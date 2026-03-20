import "dotenv/config";
import WebSocket from "ws";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getHistory, appendHistory, getUserGeminiApiKey } from "./db.js";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const HOST = "generativelanguage.googleapis.com";

export type AgentResponse =
  | { type: "conversation"; text: string }
  | { type: "commands"; text: string; commands: any[] };

// Maintain active Gemini connections per user UID
const activeSessions = new Map<string, WebSocket>();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEXT_SYSTEM_PROMPT = readFileSync(
  join(__dirname, "../prompts/system_prompt.txt"),
  "utf8"
).trim();

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

  const userApiKey = await getUserGeminiApiKey(uid);
  if (!userApiKey) {
    return { type: "conversation", text: "Gemini API key is missing. Add your key in Dashboard settings." };
  }

  const url = `https://${HOST}/v1beta/models/${GEMINI_MODEL}:generateContent?key=${userApiKey}`;

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

  const userApiKey = await getUserGeminiApiKey(uid);
  if (!userApiKey) {
    if (frontendWs.readyState === WebSocket.OPEN) {
      frontendWs.send(JSON.stringify({
        type: "chat_reply",
        text: "Gemini API key is missing. Add your key in Dashboard settings."
      }));
    }
    return;
  }
  const wsUrl = `wss://${HOST}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${userApiKey}`;

  const geminiWs = new WebSocket(wsUrl);

  geminiWs.on("open", () => {
    console.log(`[LiveProxy] Connected to Gemini Live for UID=${uid}`);

    // Send setup without systemInstruction
    const setupMsg = {
      setup: {
        model: "models/gemini-2.5-flash-native-audio-preview-12-2025",
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
        // Completely removed the text payload injection here. 
        // The socket is now safely open and purely waiting for `realtimeInput` (audio chunks).
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
