import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  getRedirectResult,
  setPersistence,
  signInWithRedirect,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    const isLocalDev = import.meta.env.DEV || ["localhost", "127.0.0.1"].includes(window.location.hostname);
    if (isLocalDev) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
      return;
    }
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

const firebaseConfig = {
  apiKey: "AIzaSyC0lb9VsaR09vuhPI1tVpmi_vtP9IMGwVM",
  authDomain: "noogler-490414.firebaseapp.com",
  databaseURL: "https://noogler-490414-default-rtdb.firebaseio.com",
  projectId: "noogler-490414",
  storageBucket: "noogler-490414.firebasestorage.app",
  messagingSenderId: "265815053881",
  appId: "1:265815053881:web:0bfa8a367670f4b04a1fe8",
  measurementId: "G-BR5XWXZRVK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const btnGoogle = document.getElementById("btn-google");
const btnGoogleLabel = document.getElementById("btn-google-label");
const btnGoogleSpinner = document.getElementById("btn-google-spinner");
const signinStatus = document.getElementById("signin-status");
const landingFlow = document.getElementById("landing-flow");
const isAndroid = /Android/i.test(navigator.userAgent || "");

function setStatus(message) {
  if (!signinStatus) return;
  signinStatus.textContent = message;
}

function setLoading(isLoading) {
  if (!btnGoogle) return;
  btnGoogle.disabled = isLoading;
  btnGoogle.classList.toggle("is-loading", isLoading);
  if (btnGoogleLabel) btnGoogleLabel.textContent = isLoading ? "Connecting..." : "Sign in with Google";
  if (btnGoogleSpinner) btnGoogleSpinner.classList.toggle("hidden", !isLoading);
}

function showSignedOut() {
  if (btnGoogle) btnGoogle.classList.remove("hidden");
  setLoading(false);
}

function redirectToAgents() {
  window.location.replace("/agents.html");
}

if (landingFlow) {
  window.addEventListener("pageshow", () => {
    landingFlow.scrollTo({ top: 0, behavior: "auto" });
  });
}

function waitForInitialAuthState(timeoutMs = 5000) {
  if (auth.currentUser) return Promise.resolve(auth.currentUser);
  return new Promise((resolve) => {
    let settled = false;
    const settle = (user) => {
      if (settled) return;
      settled = true;
      resolve(user || null);
    };
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      settle(user);
    });
    setTimeout(() => {
      unsub();
      settle(auth.currentUser || null);
    }, timeoutMs);
  });
}

async function initAuth() {
  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch {
    await setPersistence(auth, browserSessionPersistence);
  }

  try {
    await getRedirectResult(auth);
  } catch (e) {
    console.error(e);
    setLoading(false);
    setStatus("Sign-in failed. Please try again.");
  }

  const initialUser = await waitForInitialAuthState();
  if (initialUser) {
    redirectToAgents();
  } else {
    showSignedOut();
  }

  onAuthStateChanged(auth, (user) => {
    if (user) redirectToAgents();
  });
}

if (btnGoogle) {
  btnGoogle.onclick = async () => {
    setStatus("");
    setLoading(true);
    try {
      if (isAndroid) {
        setStatus("Opening Google sign-in...");
        await signInWithRedirect(auth, provider);
        return;
      }
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setStatus("Sign-in failed. Please try again.");
    }
  };
}

initAuth().catch((e) => {
  console.error(e);
  setStatus("Sign-in setup failed. Refresh and try again.");
  showSignedOut();
});
