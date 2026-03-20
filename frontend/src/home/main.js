import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
  signInWithPopup,
  onAuthStateChanged,
  signOut
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

const ctaTitle = document.getElementById("cta-title");
const ctaCopy = document.getElementById("cta-copy");
const userProfileSection = document.getElementById("user-profile-section");
const userProfileImg = document.getElementById("user-profile-img");
const btnLogout = document.getElementById("btn-logout");
const btnClearCache = document.getElementById("btn-clear-cache");

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || "");

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
  if (userProfileSection) userProfileSection.classList.add("hidden");
  if (btnClearCache) btnClearCache.classList.add("hidden");
  if (ctaTitle) ctaTitle.textContent = "Start With Google";
  if (ctaCopy) ctaCopy.textContent = "Sign in to create and manage your agents.";
  setLoading(false);
}

function showLoggedInState(user) {
  if (btnGoogle) btnGoogle.classList.add("hidden");
  if (userProfileSection) userProfileSection.classList.remove("hidden");
  if (btnClearCache) btnClearCache.classList.remove("hidden");
  if (userProfileImg) userProfileImg.src = user.photoURL || `https://api.dicebear.com/9.x/lorelei/svg?seed=${user.email || 'user'}`;
  if (ctaTitle) ctaTitle.textContent = "Ready to go";
  if (ctaCopy) ctaCopy.textContent = "Attempting to redirect you...";
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
    await getRedirectResult(auth);
  } catch (e) {
    console.error(e);
    setLoading(false);
    setStatus("Sign-in failed. Please try again.");
  }

  const initialUser = await waitForInitialAuthState();
  if (initialUser) {
    showLoggedInState(initialUser);
    redirectToAgents();
  } else {
    showSignedOut();
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      showLoggedInState(user);
      redirectToAgents();
    } else {
      showSignedOut();
    }
  });
}

if (btnGoogle) {
  btnGoogle.onclick = async () => {
    setStatus("");
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setStatus("Sign-in failed. Please try again.");
    }
  };
}

if (btnLogout) {
  btnLogout.onclick = async () => {
    setStatus("Signing out...");
    setLoading(true);
    try {
      await signOut(auth);
      setStatus("");
    } catch (e) {
      console.error(e);
      setStatus("Failed to sign out.");
      setLoading(false);
    }
  };
}

if (btnClearCache) {
  btnClearCache.onclick = async () => {
    const originalText = btnClearCache.textContent;
    btnClearCache.textContent = "Clearing Cache...";
    try {
      // Unregister Service Workers
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        for (const r of regs) await r.unregister();
      }
      // Clear Caches
      if ('caches' in window) {
        const keys = await caches.keys();
        for (const k of keys) await caches.delete(k);
      }
      // Clear Storage
      localStorage.clear();
      sessionStorage.clear();
      
      btnClearCache.textContent = "Done! Reloading...";
      setTimeout(() => {
        window.location.href = "/?clear=" + Date.now();
      }, 800);
    } catch (e) {
      console.error(e);
      btnClearCache.textContent = "Failed. Try Incognito.";
      setTimeout(() => btnClearCache.textContent = originalText, 3000);
    }
  };
}

initAuth().catch((e) => {
  console.error(e);
  setStatus("Sign-in setup failed. Refresh and try again.");
  showSignedOut();
});
