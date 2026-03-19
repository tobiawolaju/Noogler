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
