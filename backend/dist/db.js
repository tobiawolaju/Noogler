import "dotenv/config";
import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Initialize Firebase Admin
const serviceAccountPath = path.resolve(__dirname, "../../ServiceAccountsJson.json");
const localServiceAccountPath = path.resolve(__dirname, "../ServiceAccountsJson.json");
let serviceAccountInfo = null;
if (fs.existsSync(localServiceAccountPath)) {
    serviceAccountInfo = JSON.parse(fs.readFileSync(localServiceAccountPath, "utf-8"));
}
else if (fs.existsSync(serviceAccountPath)) {
    serviceAccountInfo = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
}
if (!admin.apps.length) {
    if (serviceAccountInfo) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccountInfo),
            databaseURL: "https://noogler-fc7d1-default-rtdb.firebaseio.com"
        });
        console.log("[DB] Firebase Admin initialized with service account.");
    }
    else {
        console.warn("[DB] WARNING: ServiceAccountsJson.json not found. Firebase Realtime DB will fail.");
        admin.initializeApp({
            databaseURL: "https://noogler-fc7d1-default-rtdb.firebaseio.com"
        });
    }
}
const db = admin.database();
export async function getHistory(uid) {
    try {
        const snapshot = await db.ref(`users/${uid}/history`).once("value");
        const val = snapshot.val();
        if (Array.isArray(val)) {
            return val;
        }
        if (typeof val === "object" && val !== null) {
            return Object.values(val);
        }
    }
    catch (err) {
        console.error(`[DB] Failed to get history for UID=${uid}`, err);
    }
    return [];
}
export async function appendHistory(uid, role, text) {
    try {
        if (!text.trim())
            return;
        const historyRef = db.ref(`users/${uid}/history`);
        const snapshot = await historyRef.once("value");
        let currentHistory = snapshot.val() || [];
        if (!Array.isArray(currentHistory) && typeof currentHistory === "object") {
            currentHistory = Object.values(currentHistory);
        }
        currentHistory.push({ role, parts: [{ text }] });
        // Keep last 40 items to avoid payload bloating
        if (currentHistory.length > 40) {
            currentHistory = currentHistory.slice(currentHistory.length - 40);
        }
        await historyRef.set(currentHistory);
    }
    catch (err) {
        console.error(`[DB] Failed to append history for UID=${uid}`, err);
    }
}
