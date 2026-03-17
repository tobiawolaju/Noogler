import "dotenv/config";
import admin from "firebase-admin";

// Build service account from env
const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
};

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://noogler-490414-default-rtdb.firebaseio.com"
    });

    console.log("[DB] Firebase Admin initialized using ENV.");
}

const db = admin.database();

export async function getHistory(uid) {
    try {
        const snapshot = await db.ref(`users/${uid}/history`).once("value");
        const val = snapshot.val();

        if (Array.isArray(val)) return val;

        if (typeof val === "object" && val !== null) {
            return Object.values(val);
        }
    } catch (err) {
        console.error(`[DB] Failed to get history for UID=${uid}`, err);
    }

    return [];
}

export async function appendHistory(uid, role, text) {
    try {
        if (!text.trim()) return;

        const historyRef = db.ref(`users/${uid}/history`);
        const snapshot = await historyRef.once("value");

        let currentHistory = snapshot.val() || [];

        if (!Array.isArray(currentHistory) && typeof currentHistory === "object") {
            currentHistory = Object.values(currentHistory);
        }

        currentHistory.push({
            role,
            parts: [{ text }]
        });

        // limit history
        if (currentHistory.length > 40) {
            currentHistory = currentHistory.slice(-40);
        }

        await historyRef.set(currentHistory);
    } catch (err) {
        console.error(`[DB] Failed to append history for UID=${uid}`, err);
    }
}