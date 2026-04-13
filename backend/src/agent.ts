import "dotenv/config";
import WebSocket from "ws";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getHistory, appendHistory, getAgentMemory, saveAgentMemory } from "./db.js";

const ELIZA_BASE_URL = process.env.ELIZA_BASE_URL || "http://127.0.0.1:7070";

export type AgentResponse =
  | { type: "conversation"; text: string }
  | { type: "commands"; text: string; commands: any[] };

type GeneratedCommand = { index: number; instruction: string; tag: "ai" };
type AgentCommandResult = {
  index?: number;
  status?: string;
  detail?: string;
  instruction?: string;
  tag?: string;
  screenshot_data_url?: string;
  screenshot_path?: string;
};

// Keep this map for websocket voice session compatibility with frontend.
const activeSessions = new Map<string, WebSocket>();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEXT_SYSTEM_PROMPT = readFileSync(
  join(__dirname, "../prompts/system_prompt.txt"),
  "utf8"
).trim();

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

function maxCommandIndex(commands: GeneratedCommand[]): number {
  return commands.reduce((m, c) => Math.max(m, c.index || 0), 0);
}

async function callEliza(path: string, payload: Record<string, any>): Promise<any> {
  const url = `${ELIZA_BASE_URL}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    throw new Error(`Eliza call failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
}

function normalizeCommands(raw: any): GeneratedCommand[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((c: any, i: number) => ({
      index: Number.isFinite(Number(c?.index)) ? Number(c.index) : i + 1,
      instruction: String(c?.instruction || "").trim(),
      tag: "ai" as const
    }))
    .filter((c: GeneratedCommand) => c.instruction.length > 0);
}

async function planTasks(uid: string, goal: string): Promise<string[]> {
  const history = await getHistory(uid);
  const memory = await getAgentMemory(uid);
  try {
    const data = await callEliza("/reason/plan", {
      uid,
      goal,
      history,
      memory,
      systemPrompt: TEXT_SYSTEM_PROMPT,
      screenshot_data_url: memory.context?.latest_screenshot_data_url || null
    });
    if (Array.isArray(data?.tasks) && data.tasks.length > 0) {
      return data.tasks.map((t: any) => String(t).trim()).filter(Boolean).slice(0, 8);
    }
  } catch (err) {
    console.error("Eliza plan call failed:", err);
  }
  return [goal.trim()];
}

async function planAction(uid: string, task: string): Promise<GeneratedCommand[] | null> {
  const history = await getHistory(uid);
  const memory = await getAgentMemory(uid);
  try {
    const data = await callEliza("/reason/action", {
      uid,
      task,
      history,
      memory,
      systemPrompt: TEXT_SYSTEM_PROMPT,
      screenshot_data_url: memory.context?.latest_screenshot_data_url || null,
      last_agent_result: memory.context?.last_agent_result || null
    });
    const commands = normalizeCommands(data?.commands);
    return commands.length ? commands : null;
  } catch (err) {
    console.error("Eliza action call failed:", err);
    return null;
  }
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

  memory.context = {
    ...(memory.context || {}),
    last_agent_result: {
      index: result.index,
      status: result.status,
      detail: result.detail,
      instruction: result.instruction,
      tag: result.tag,
      screenshot_data_url: result.screenshot_data_url || null,
      screenshot_path: result.screenshot_path || null,
      ts_ms: Date.now()
    }
  };

  if (result.screenshot_data_url) {
    memory.context.latest_screenshot_data_url = result.screenshot_data_url;
  }

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
  const liveWs = activeSessions.get(uid);
  if (liveWs && liveWs.readyState === WebSocket.OPEN) {
    await appendHistory(uid, "user", text);
    return { type: "conversation", text: "" };
  }

  const history = await getHistory(uid);
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

  try {
    const data = await callEliza("/reason/chat", {
      uid,
      text,
      history,
      memory,
      systemPrompt: TEXT_SYSTEM_PROMPT,
      screenshot_data_url: memory.context?.latest_screenshot_data_url || null
    });

    const replyText = String(data?.text || "").trim() || "Done.";
    await appendHistory(uid, "model", replyText);

    const commands = normalizeCommands(data?.commands);
    if (commands.length > 0) {
      return { type: "commands", text: replyText, commands };
    }
    return { type: "conversation", text: replyText };
  } catch (err) {
    console.error("Eliza chat call failed:", err);
    return { type: "conversation", text: "Sorry, I had trouble talking to the reasoning service." };
  }
}

export async function startLiveSession(uid: string, frontendWs: WebSocket) {
  activeSessions.set(uid, frontendWs);
  if (frontendWs.readyState === WebSocket.OPEN) {
    frontendWs.send(JSON.stringify({
      type: "chat_reply",
      text: "Voice mode is not enabled for this ElizaOS runtime yet. Please use chat while desktop execution stays active."
    }));
  }
}

export function sendAudioChunk(_uid: string, _base64Pcm: string) {
  // No-op for ElizaOS text-first runtime.
}

export function endLiveSession(uid: string) {
  activeSessions.delete(uid);
}
