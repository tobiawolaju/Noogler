import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
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

const signoutChip = document.getElementById("signout-chip");
const heroLoading = document.getElementById("hero-loading");
const heroContent = document.getElementById("hero-content");
const chipAvatar = document.getElementById("chip-avatar");
const chipName = document.getElementById("chip-name");
const stateLoading = document.getElementById("state-loading");
const btnGoogle = document.getElementById("btn-google");
const navPane = document.getElementById("nav-pane");
const btnDownload = document.getElementById("btn-download");

let currentUser = null;

function normalizeLandingViewport() {
  // Returning from agents/chat can restore old scroll position on mobile.
  window.scrollTo(0, 0);
}

function showLoggedOut() {
  if (heroLoading) heroLoading.classList.add("hidden");
  if (heroContent) heroContent.classList.remove("hidden");
  stateLoading.classList.add("hidden");
  btnGoogle.classList.remove("hidden");
  navPane.classList.add("hidden");
  signoutChip.classList.add("hidden");
}

function showLoggedIn(user) {
  currentUser = user;
  chipAvatar.src = user.photoURL || "";
  chipName.textContent = (user.displayName || user.email || "You").split(" ")[0];

  if (heroLoading) heroLoading.classList.add("hidden");
  if (heroContent) heroContent.classList.remove("hidden");
  stateLoading.classList.add("hidden");
  btnGoogle.classList.add("hidden");
  navPane.classList.remove("hidden");
  signoutChip.classList.remove("hidden");
}

onAuthStateChanged(auth, (user) => {
  normalizeLandingViewport();
  user ? showLoggedIn(user) : showLoggedOut();
});

window.addEventListener("pageshow", () => {
  normalizeLandingViewport();
});

btnGoogle.onclick = async () => {
  btnGoogle.disabled = true;
  btnGoogle.innerHTML = "<span class='spinner'></span>";
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    console.error(e);
    btnGoogle.disabled = false;
    btnGoogle.innerHTML = "Sign in with Google";
  }
};

btnDownload.onclick = async () => {
  if (!currentUser) return;
  const originalText = btnDownload.textContent;
  btnDownload.disabled = true;
  btnDownload.innerHTML = "<span class='spinner'></span> Building...";

  try {
    const exeRes = await fetch("/intern-local.exe");
    if (!exeRes.ok) throw new Error("EXE not found");
    const exeBlob = await exeRes.blob();

    const config = {
      user_uid: currentUser.uid,
      user_email: currentUser.email || "",
      backend_url: "wss://noogler-265815053881.europe-west1.run.app"
    };

    const zip = new window.JSZip();
    zip.file("agent.exe", exeBlob);
    zip.file("config.json", JSON.stringify(config, null, 2));

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Noogler.zip";
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    alert("Failed: " + err.message);
  } finally {
    btnDownload.disabled = false;
    btnDownload.textContent = originalText;
  }
};

signoutChip.onclick = () => signOut(auth);
