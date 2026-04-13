import { EXECUTE_ON_DESKTOP } from "./plugins/desktop.js";

const PORT = Number(process.env.ELIZA_PORT || 7070);
const NOSANA_BASE_URL = process.env.NOSANA_BASE_URL || "https://inference-api.nosana.ai/v1";
const NOSANA_MODEL = process.env.NOSANA_MODEL || "Qwen/Qwen3.5-27B-AWQ-4bit";
const NOSANA_API_KEY = process.env.NOSANA_API_KEY || "";

async function callNosanaJSON(system: string, user: string, fallback: any): Promise<any> {
  try {
    const res = await fetch(`${NOSANA_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(NOSANA_API_KEY ? { Authorization: `Bearer ${NOSANA_API_KEY}` } : {})
      },
      body: JSON.stringify({
        model: NOSANA_MODEL,
        temperature: 0.1,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ]
      })
    });
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content || "";
    const match = String(raw).match(/\{[\s\S]*\}/);
    if (!match) return fallback;
    return JSON.parse(match[0]);
  } catch {
    return fallback;
  }
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

Bun.serve({
  port: PORT,
  async fetch(req) {
    if (req.method === "GET" && new URL(req.url).pathname === "/") {
      return json({ status: "ok", service: "eliza-agent", action: EXECUTE_ON_DESKTOP.name });
    }

    if (req.method !== "POST") return new Response("Not found", { status: 404 });

    const payload = await req.json().catch(() => ({} as any));
    if (!payload || typeof payload.uid !== "string" || !payload.uid.trim()) {
      return json({ error: "Invalid payload" }, 400);
    }

    if (new URL(req.url).pathname === "/reason/plan") {
      const goal = payload.goal || "";
      const sys = "You are ElizaOS planner. Return strict JSON: {\"tasks\":[\"...\"]}. 1-8 actionable desktop steps.";
      const user = `Goal: ${goal}`;
      const out = await callNosanaJSON(sys, user, { tasks: [goal] });
      return json({ tasks: Array.isArray(out.tasks) ? out.tasks : [goal] });
    }

    if (new URL(req.url).pathname === "/reason/action") {
      const task = payload.task || "";
      const screenshotHint = payload.screenshot_data_url ? "A fresh screenshot is available." : "No screenshot available.";
      const sys = `You are ElizaOS action engine using ${EXECUTE_ON_DESKTOP.name}. Return strict JSON: {\"commands\":[{\"index\":1,\"instruction\":\"...\",\"tag\":\"ai\"}]}. Include a screenshot command at the end when visual verification is needed.`;
      const user = `Task: ${task}\n${screenshotHint}\nLast result: ${JSON.stringify(payload.last_agent_result || null)}`;
      const fallback = { commands: [{ index: 1, instruction: `type: ${task}`, tag: "ai" }, { index: 2, instruction: "screenshot now", tag: "ai" }] };
      const out = await callNosanaJSON(sys, user, fallback);
      return json({ commands: Array.isArray(out.commands) ? out.commands : fallback.commands });
    }

    if (new URL(req.url).pathname === "/reason/chat") {
      const text = payload.text || "";
      const sys = "You are Noogler, a desktop AI operator. Be concise. Return strict JSON: {\"text\":\"...\"} optionally with commands array.";
      const user = `User message: ${text}`;
      const out = await callNosanaJSON(sys, user, { text: "Understood." });
      return json({ text: String(out.text || "Understood."), commands: Array.isArray(out.commands) ? out.commands : [] });
    }

    return new Response("Not found", { status: 404 });
  }
});

console.log(`[eliza-agent] listening on http://0.0.0.0:${PORT}`);
