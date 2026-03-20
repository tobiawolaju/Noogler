import "dotenv/config";
import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
const serviceAccountPath = path.resolve(__dirname, "../serviceaccount.json");

let serviceAccountInfo: any = null;

// Try loading from specified service account file first
if (fs.existsSync(serviceAccountPath)) {
  serviceAccountInfo = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
  console.log("[DB] Using Firebase config from serviceaccount.json.");
} else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
  serviceAccountInfo = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  };
  console.log("[DB] Using Firebase config from environment variables.");
}

if (!admin.apps.length) {
  if (serviceAccountInfo) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountInfo),
      databaseURL: "https://noogler-490414-default-rtdb.firebaseio.com"
    });
    console.log("[DB] Firebase Admin initialized.");
  } else {
    console.warn("[DB] WARNING: No Firebase credentials found. Firebase Realtime DB will fail.");
    admin.initializeApp({
      databaseURL: "https://noogler-490414-default-rtdb.firebaseio.com"
    });
  }
}

const db = admin.database();
const userRef = (uid: string) => db.ref(`users/${uid}`);
const agentRef = (uid: string, agentId: string) => userRef(uid).child("agents").child(agentId);
const DEFAULT_AGENT_TAG = "Agent 1";
const DEFAULT_AGENT_ID = "default";

export type UserSettings = {
  gemini_api_key: string;
  agent_tag: string;
  agent_soul: string;
};

export type AgentRecord = UserSettings & {
  id: string;
  created_at: number;
  updated_at: number;
};

async function getLegacyRootSettings(uid: string): Promise<UserSettings> {
  try {
    const snapshot = await userRef(uid).once("value");
    const val = snapshot.val() || {};
    return {
      gemini_api_key: typeof val.gemini_api_key === "string" ? val.gemini_api_key.trim() : "",
      agent_tag: typeof val.agent_tag === "string" && val.agent_tag.trim() ? val.agent_tag.trim() : DEFAULT_AGENT_TAG,
      agent_soul: typeof val.agent_soul === "string" ? val.agent_soul.trim() : ""
    };
  } catch {
    return { gemini_api_key: "", agent_tag: DEFAULT_AGENT_TAG, agent_soul: "" };
  }
}

export async function getHistory(uid: string): Promise<any[]> {
  try {
    const agentId = await getActiveAgentId(uid);
    const snapshot = await agentRef(uid, agentId).child("history").once("value");
    const val = snapshot.val();
    if (Array.isArray(val)) {
      return val;
    }
    if (typeof val === "object" && val !== null) {
      return Object.values(val);
    }
  } catch (err) {
    console.error(`[DB] Failed to get history for UID=${uid}`, err);
  }
  return [];
}

export async function appendHistory(uid: string, role: "user" | "model", text: string) {
  try {
    if (!text.trim()) return;
    const agentId = await getActiveAgentId(uid);
    const historyRef = agentRef(uid, agentId).child("history");
    
    const snapshot = await historyRef.once("value");
    let currentHistory: any[] = snapshot.val() || [];
    if (!Array.isArray(currentHistory) && typeof currentHistory === "object") {
        currentHistory = Object.values(currentHistory);
    }
    
    currentHistory.push({ role, parts: [{ text }] });
    
    // Keep last 40 items to avoid payload bloating
    if (currentHistory.length > 40) {
      currentHistory = currentHistory.slice(currentHistory.length - 40);
    }
    
    await historyRef.set(currentHistory);
  } catch (err) {
    console.error(`[DB] Failed to append history for UID=${uid}`, err);
  }
}

export async function getChatEvents(uid: string): Promise<any[]> {
  try {
    const agentId = await getActiveAgentId(uid);
    const snapshot = await agentRef(uid, agentId).child("chat_events").once("value");
    const val = snapshot.val();
    if (Array.isArray(val)) return val;
    if (typeof val === "object" && val !== null) return Object.values(val);
  } catch (err) {
    console.error(`[DB] Failed to get chat events for UID=${uid}`, err);
  }
  return [];
}

export async function appendChatEvent(uid: string, event: Record<string, any>) {
  try {
    const agentId = await getActiveAgentId(uid);
    const eventsRef = agentRef(uid, agentId).child("chat_events");

    const snapshot = await eventsRef.once("value");
    let current: any[] = snapshot.val() || [];
    if (!Array.isArray(current) && typeof current === "object") {
      current = Object.values(current);
    }

    current.push(event);

    // Keep last 200 UI events
    if (current.length > 200) {
      current = current.slice(current.length - 200);
    }

    await eventsRef.set(current);
  } catch (err) {
    console.error(`[DB] Failed to append chat event for UID=${uid}`, err);
  }
}

export async function getUserGeminiApiKey(uid: string): Promise<string> {
  try {
    const agentId = await getActiveAgentId(uid);
    const snapshot = await agentRef(uid, agentId).child("gemini_api_key").once("value");
    const value = snapshot.val();
    return typeof value === "string" ? value.trim() : "";
  } catch (err) {
    console.error(`[DB] Failed to get Gemini API key for UID=${uid}`, err);
    return "";
  }
}

export async function setUserGeminiApiKey(uid: string, apiKey: string): Promise<void> {
  try {
    const agentId = await getActiveAgentId(uid);
    await agentRef(uid, agentId).child("gemini_api_key").set(apiKey.trim());
  } catch (err) {
    console.error(`[DB] Failed to set Gemini API key for UID=${uid}`, err);
    throw err;
  }
}

export async function getUserSettings(uid: string): Promise<UserSettings> {
  try {
    const agentId = await getActiveAgentId(uid);
    const snapshot = await agentRef(uid, agentId).once("value");
    const val = snapshot.val() || {};
    return {
      gemini_api_key: typeof val.gemini_api_key === "string" ? val.gemini_api_key.trim() : "",
      agent_tag: typeof val.agent_tag === "string" && val.agent_tag.trim() ? val.agent_tag.trim() : DEFAULT_AGENT_TAG,
      agent_soul: typeof val.agent_soul === "string" ? val.agent_soul.trim() : ""
    };
  } catch (err) {
    console.error(`[DB] Failed to get settings for UID=${uid}`, err);
    return { gemini_api_key: "", agent_tag: DEFAULT_AGENT_TAG, agent_soul: "" };
  }
}

export async function updateUserSettings(
  uid: string,
  patch: Partial<Pick<UserSettings, "gemini_api_key" | "agent_tag" | "agent_soul">>
): Promise<UserSettings> {
  const next: Record<string, string | number> = {};
  if (typeof patch.gemini_api_key === "string") next.gemini_api_key = patch.gemini_api_key.trim();
  if (typeof patch.agent_tag === "string") next.agent_tag = patch.agent_tag.trim() || DEFAULT_AGENT_TAG;
  if (typeof patch.agent_soul === "string") next.agent_soul = patch.agent_soul.trim();

  if (Object.keys(next).length > 0) {
    try {
      const agentId = await getActiveAgentId(uid);
      next.updated_at = Date.now().toString();
      await agentRef(uid, agentId).update(next);
    } catch (err) {
      console.error(`[DB] Failed to update settings for UID=${uid}`, err);
      throw err;
    }
  }

  return getUserSettings(uid);
}

export async function getActiveAgentId(uid: string): Promise<string> {
  try {
    const snapshot = await userRef(uid).child("active_agent_id").once("value");
    const value = snapshot.val();
    if (typeof value === "string" && value.trim()) return value.trim();
  } catch (err) {
    console.error(`[DB] Failed to get active agent id for UID=${uid}`, err);
  }
  return DEFAULT_AGENT_ID;
}

export async function setActiveAgentId(uid: string, agentId: string): Promise<void> {
  const nextId = (agentId || DEFAULT_AGENT_ID).trim() || DEFAULT_AGENT_ID;
  try {
    await userRef(uid).child("active_agent_id").set(nextId);
    const exists = await agentRef(uid, nextId).once("value");
    if (!exists.exists()) {
      const legacy = await getLegacyRootSettings(uid);
      const now = Date.now();
      await agentRef(uid, nextId).set({
        gemini_api_key: legacy.gemini_api_key,
        agent_tag: legacy.agent_tag,
        agent_soul: legacy.agent_soul,
        created_at: now,
        updated_at: now
      });
    }
  } catch (err) {
    console.error(`[DB] Failed to set active agent id for UID=${uid}`, err);
    throw err;
  }
}

export async function listAgents(uid: string): Promise<AgentRecord[]> {
  try {
    const snapshot = await userRef(uid).child("agents").once("value");
    const raw = snapshot.val() || {};
    const now = Date.now();
    const entries = Object.entries(raw).map(([id, val]: any) => {
      const v = val || {};
      return {
        id,
        gemini_api_key: typeof v.gemini_api_key === "string" ? v.gemini_api_key.trim() : "",
        agent_tag: typeof v.agent_tag === "string" && v.agent_tag.trim() ? v.agent_tag.trim() : DEFAULT_AGENT_TAG,
        agent_soul: typeof v.agent_soul === "string" ? v.agent_soul : "",
        created_at: typeof v.created_at === "number" ? v.created_at : now,
        updated_at: typeof v.updated_at === "number" ? v.updated_at : now
      } as AgentRecord;
    });
    if (entries.length > 0) return entries;
  } catch (err) {
    console.error(`[DB] Failed to list agents for UID=${uid}`, err);
  }
  return [{
    id: DEFAULT_AGENT_ID,
    gemini_api_key: "",
    agent_tag: DEFAULT_AGENT_TAG,
    agent_soul: "",
    created_at: Date.now(),
    updated_at: Date.now()
  }];
}

export async function createAgent(uid: string, payload: UserSettings): Promise<AgentRecord> {
  try {
    const agentsNode = userRef(uid).child("agents").push();
    const id = agentsNode.key || `${Date.now()}`;
    const now = Date.now();
    const record: AgentRecord = {
      id,
      gemini_api_key: payload.gemini_api_key.trim(),
      agent_tag: payload.agent_tag.trim() || DEFAULT_AGENT_TAG,
      agent_soul: payload.agent_soul.trim(),
      created_at: now,
      updated_at: now
    };
    await agentRef(uid, id).set(record);
    await userRef(uid).child("active_agent_id").set(id);
    return record;
  } catch (err) {
    console.error(`[DB] Failed to create agent for UID=${uid}`, err);
    throw err;
  }
}

export async function deleteActiveAgent(uid: string): Promise<{ deleted_agent_id: string; active_agent_id: string }> {
  const activeId = await getActiveAgentId(uid);
  try {
    await agentRef(uid, activeId).remove();
    const remaining = await listAgents(uid);
    if (remaining.length > 0) {
      const nextActive = remaining[0].id;
      await userRef(uid).child("active_agent_id").set(nextActive);
      return { deleted_agent_id: activeId, active_agent_id: nextActive };
    }
    await setActiveAgentId(uid, DEFAULT_AGENT_ID);
    return { deleted_agent_id: activeId, active_agent_id: DEFAULT_AGENT_ID };
  } catch (err) {
    console.error(`[DB] Failed to delete active agent for UID=${uid}`, err);
    throw err;
  }
}
