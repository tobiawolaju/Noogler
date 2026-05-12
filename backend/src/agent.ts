import "dotenv/config";
import WebSocket from "ws";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getHistory, appendHistory, getUserGeminiApiKey, getAgentMemory, saveAgentMemory } from "./db.js";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const HOST = "generativelanguage.googleapis.com";

export type AgentResponse =
  | { type: "conversation"; text: string }
  | { type: "commands"; text: string; commands: any[] };

type GeneratedCommand = { index: number; instruction: string; tag: "ai" };
type AgentCommandResult = { index?: number; status?: string; detail?: string; instruction?: string; tag?: string };

// Maintain active Gemini connections per user UID
const activeSessions = new Map<string, WebSocket>();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEXT_SYSTEM_PROMPT = readFileSync(
  join(__dirname, "../prompts/system_prompt.txt"),
  "utf8"
).trim();

function extractOpenTarget(input: string): string | null {
  const m = input.trim().match(/^open\s+(.+)$/i);
  if (!m) return null;
  const target = (m[1] || "").trim();
  return target || null;
}

function normalizeAppTarget(target: string): string {
  const t = target.toLowerCase().trim();
  if (["cli", "cmd", "command prompt", "terminal"].includes(t)) return "command prompt";
  if (["edge", "microsoft edge", "ms edge"].includes(t)) return "microsoft edge";
  return target.trim();
}

function buildOpenAppCommands(rawTarget: string): GeneratedCommand[] {
  const target = normalizeAppTarget(rawTarget);
  return [
    { index: 1, instruction: "hotkey: CTRL+ESC", tag: "ai" },
    { index: 2, instruction: "wait 900", tag: "ai" },
    { index: 3, instruction: `type: ${target}`, tag: "ai" },
    { index: 4, instruction: "wait 700", tag: "ai" },
    { index: 5, instruction: "key: ENTER", tag: "ai" },
    { index: 6, instruction: "wait 1000", tag: "ai" }
  ];
}

function isLikelyActionRequest(input: string): boolean {
  const t = input.trim().toLowerCase();
  if (!t) return false;
  return /^(open|launch|run|start|create|send|build|deploy|check|fix|go to|navigate|search|type|click)\b/.test(t)
    || t.includes("please ")
    || t.includes("task")
    || t.includes("automate");
}

function isStopRequest(input: string): boolean {
  const t = input.trim().toLowerCase();
  return ["stop", "pause", "abort", "cancel", "halt"].includes(t);
}

function formatPlanPreview(tasks: string[]): string {
  if (!tasks.length) return "Plan: (no steps)";
  const lines = tasks.map((task, i) => `${i + 1}. ${task}`);
  return `Plan:\n${lines.join("\n")}`;
}

async function generateText(uid: string, userText: string, systemPrompt: string): Promise<string> {
  const userApiKey = await getUserGeminiApiKey(uid);
  if (!userApiKey) return "";
  const url = `https://${HOST}/v1beta/models/${GEMINI_MODEL}:generateContent?key=${userApiKey}`;
  const body = {
    system_instruction: { parts: { text: systemPrompt } },
    contents: [{ role: "user", parts: [{ text: userText }] }],
    generationConfig: { temperature: 0.1 }
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) return "";
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim?.() || "";
}

async function planTasks(uid: string, goal: string): Promise<string[]> {
  const plannerPrompt = `You are a task planner for a desktop automation agent.
Return STRICT JSON only:
{"tasks":["task 1","task 2","task 3"]}
Rules:
- break a high-level goal into short executable desktop subtasks
- each task must be a single action-oriented sentence
- 1 to 8 tasks max
- no markdown, no prose`;
  const planned = await generateText(uid, goal, plannerPrompt);
  if (planned.startsWith("{") && planned.endsWith("}")) {
    try {
      const parsed = JSON.parse(planned);
      if (Array.isArray(parsed.tasks)) {
        const tasks = parsed.tasks.map((t: any) => String(t).trim()).filter(Boolean).slice(0, 8);
        if (tasks.length) return tasks;
      }
    } catch {
      // fall through
    }
  }
  return [goal.trim()];
}

async function planAction(uid: string, task: string): Promise<GeneratedCommand[] | null> {
  const openTarget = extractOpenTarget(task);
  if (openTarget) return buildOpenAppCommands(openTarget);

  const actionPrompt = `${TEXT_SYSTEM_PROMPT}
You are planning commands for exactly one task.
Return STRICT JSON only:
{"commands":[{"index":1,"instruction":"...","tag":"ai"}]}
No extra keys except commands.`;
  const raw = await generateText(uid, task, actionPrompt);
  if (!(raw.startsWith("{") && raw.endsWith("}"))) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.commands)) return null;
    const normalized: GeneratedCommand[] = parsed.commands
      .map((c: any, i: number) => ({
        index: Number.isFinite(Number(c?.index)) ? Number(c.index) : i + 1,
        instruction: String(c?.instruction || "").trim(),
        tag: "ai" as const
      }))
      .filter((c: GeneratedCommand) => c.instruction.length > 0);
    return normalized.length ? normalized : null;
  } catch {
    return null;
  }
}

function maxCommandIndex(commands: GeneratedCommand[]): number {
  return commands.reduce((m, c) => Math.max(m, c.index || 0), 0);
}

export async function continuePlannedExecution(uid: string): Promise<AgentResponse | null> {
  const memory = await getAgentMemory(uid);
  const awaiting = Boolean(memory.context?.awaiting_action_result);
  if (awaiting) return null;

  if (!memory.currentTask) {
    const next = memory.taskQueue.shift() || null;
    memory.currentTask = next;
    if (memory.currentTask) {
      const prevStep = Number(memory.context?.plan_step || 0);
      memory.context = { ...(memory.context || {}), plan_step: prevStep + 1 };
    }
  }
  if (!memory.currentTask) {
    await saveAgentMemory(uid, memory);
    return null;
  }

  const commands = await planAction(uid, memory.currentTask);
  if (!commands || commands.length === 0) {
    const failedTask = memory.currentTask;
    memory.currentTask = null;
    memory.context = { ...(memory.context || {}), awaiting_action_result: false };
    await saveAgentMemory(uid, memory);
    return { type: "conversation", text: `I could not plan a valid action for: ${failedTask}` };
  }

  memory.context = {
    ...(memory.context || {}),
    awaiting_action_result: true,
    expected_final_index: maxCommandIndex(commands),
    last_task_started_at: Date.now()
  };
  const step = Number(memory.context?.plan_step || 1);
  const total = Number(memory.context?.plan_total || (step + memory.taskQueue.length));
  await saveAgentMemory(uid, memory);
  return { type: "commands", text: `Step ${step}/${total}: ${memory.currentTask}`, commands };
}

export async function onAgentCommandResult(uid: string, result: AgentCommandResult): Promise<AgentResponse | null> {
  const memory = await getAgentMemory(uid);
  const awaiting = Boolean(memory.context?.awaiting_action_result);
  if (!awaiting || !memory.currentTask) return null;

  const status = String(result.status || "").toLowerCase();
  const idx = Number(result.index || 0);
  const expected = Number(memory.context?.expected_final_index || 0);

  if (status === "error") {
    memory.taskQueue.unshift(memory.currentTask);
    memory.currentTask = null;
    memory.context = { ...(memory.context || {}), awaiting_action_result: false, last_error: result.detail || "action failed" };
    await saveAgentMemory(uid, memory);
    return { type: "conversation", text: `Task failed. I queued it to retry: ${memory.taskQueue[0]}` };
  }

  if (expected > 0 && idx < expected) {
    await saveAgentMemory(uid, memory);
    return null;
  }

  memory.completedTasks.push(memory.currentTask);
  if (memory.completedTasks.length > 200) {
    memory.completedTasks = memory.completedTasks.slice(memory.completedTasks.length - 200);
  }
  memory.currentTask = null;
  memory.context = { ...(memory.context || {}), awaiting_action_result: false, expected_final_index: 0, last_success_at: Date.now() };
  await saveAgentMemory(uid, memory);

  const next = await continuePlannedExecution(uid);
  if (next) return next;
  const total = Number(memory.context?.plan_total || memory.completedTasks.length);
  const done = Number(memory.context?.plan_step || memory.completedTasks.length);
  return { type: "conversation", text: `Plan complete (${done}/${total}).` };
}

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
  const memory = await getAgentMemory(uid);

  if (isStopRequest(text)) {
    const hadWork = Boolean(memory.currentTask || memory.taskQueue.length || memory.context?.awaiting_action_result);
    memory.currentTask = null;
    memory.taskQueue = [];
    memory.context = {
      ...(memory.context || {}),
      awaiting_action_result: false,
      expected_final_index: 0,
      stop_requested: true,
      stopped_at: Date.now()
    };
    await saveAgentMemory(uid, memory);
    const reply = hadWork ? "Stopped. Current plan is cleared. Tell me what to do next." : "No active plan to stop.";
    await appendHistory(uid, "model", reply);
    return { type: "conversation", text: reply };
  }

  if (memory.currentTask || (Array.isArray(memory.taskQueue) && memory.taskQueue.length > 0)) {
    const resume = await continuePlannedExecution(uid);
    if (resume) {
      await appendHistory(uid, "model", resume.text);
      return resume;
    }
  }

  if (isLikelyActionRequest(text)) {
    const goal = text.trim();
    const tasks = await planTasks(uid, goal);
    memory.goals.push(goal);
    if (memory.goals.length > 50) {
      memory.goals = memory.goals.slice(memory.goals.length - 50);
    }
    memory.taskQueue.push(...tasks);
    memory.context = {
      ...(memory.context || {}),
      plan_goal: goal,
      plan_total: tasks.length,
      plan_step: 0,
      stop_requested: false,
      plan_created_at: Date.now()
    };
    await saveAgentMemory(uid, memory);

    const next = await continuePlannedExecution(uid);
    if (next) {
      const preview = formatPlanPreview(tasks);
      const combined = `${preview}\n\n${next.text}`;
      await appendHistory(uid, "model", combined);
      return { ...next, text: combined };
    }
  }

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
