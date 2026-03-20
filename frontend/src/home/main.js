import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
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
const landingFlow = document.getElementById("landing-flow");

function showSignedOut() {
  if (btnGoogle) btnGoogle.classList.remove("hidden");
}

function redirectToAgents() {
  window.location.replace("/agents.html");
}

if (landingFlow) {
  window.addEventListener("pageshow", () => {
    landingFlow.scrollTo({ top: 0, behavior: "auto" });
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    redirectToAgents();
    return;
  }
  showSignedOut();
});

if (btnGoogle) {
  btnGoogle.onclick = async () => {
    const original = btnGoogle.innerHTML;
    btnGoogle.disabled = true;
    btnGoogle.innerHTML = "<span class='spinner'></span>";
    try {
      await signInWithPopup(auth, provider);
      redirectToAgents();
    } catch (e) {
      console.error(e);
      btnGoogle.disabled = false;
      btnGoogle.innerHTML = original;
    }
  };
}
