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
const DEFAULT_AGENT_TAG = "Agent 1";

export type UserSettings = {
  gemini_api_key: string;
  agent_tag: string;
  agent_soul: string;
};

export async function getHistory(uid: string): Promise<any[]> {
  try {
    const snapshot = await userRef(uid).child("history").once("value");
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
    const historyRef = userRef(uid).child("history");
    
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

export async function getUserGeminiApiKey(uid: string): Promise<string> {
  try {
    const snapshot = await userRef(uid).child("gemini_api_key").once("value");
    const value = snapshot.val();
    return typeof value === "string" ? value.trim() : "";
  } catch (err) {
    console.error(`[DB] Failed to get Gemini API key for UID=${uid}`, err);
    return "";
  }
}

export async function setUserGeminiApiKey(uid: string, apiKey: string): Promise<void> {
  try {
    await userRef(uid).child("gemini_api_key").set(apiKey.trim());
  } catch (err) {
    console.error(`[DB] Failed to set Gemini API key for UID=${uid}`, err);
    throw err;
  }
}

export async function getUserSettings(uid: string): Promise<UserSettings> {
  try {
    const snapshot = await userRef(uid).once("value");
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
  const next: Record<string, string> = {};
  if (typeof patch.gemini_api_key === "string") next.gemini_api_key = patch.gemini_api_key.trim();
  if (typeof patch.agent_tag === "string") next.agent_tag = patch.agent_tag.trim() || DEFAULT_AGENT_TAG;
  if (typeof patch.agent_soul === "string") next.agent_soul = patch.agent_soul.trim();

  if (Object.keys(next).length > 0) {
    try {
      await userRef(uid).update(next);
    } catch (err) {
      console.error(`[DB] Failed to update settings for UID=${uid}`, err);
      throw err;
    }
  }

  return getUserSettings(uid);
}
