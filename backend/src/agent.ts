import "dotenv/config";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";

if (!GEMINI_API_KEY) {
  console.warn("WARNING: GEMINI_API_KEY is not set. The agent will not function properly.");
}

export type AgentResponse =
  | { type: "conversation"; text: string }
  | { type: "commands"; text: string; commands: any[] };

// Store history per user_uid: { role: "user" | "model", parts: [{ text: string }] }[]
const historyByUid = new Map<string, any[]>();

const SYSTEM_PROMPT = `You are The Intern, a helpful AI desktop assistant.
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

export async function handleMessage(uid: string, text: string): Promise<AgentResponse> {
  if (!historyByUid.has(uid)) {
    historyByUid.set(uid, []);
  }
  const history = historyByUid.get(uid)!;

  // Add the new user message
  history.push({ role: "user", parts: [{ text }] });

  // Keep history manageable (last 20 messages)
  if (history.length > 20) {
    history.splice(0, history.length - 20);
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  
  const body = {
    system_instruction: { parts: { text: SYSTEM_PROMPT } },
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
    history.push({ role: "model", parts: [{ text: replyText }] });

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
