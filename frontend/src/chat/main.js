import App from "./App.svelte";

const setAppVh = () => {
  const h = window.visualViewport?.height || window.innerHeight;
  document.documentElement.style.setProperty("--app-vh", `${h * 0.01}px`);
};

setAppVh();
window.addEventListener("resize", setAppVh);
window.addEventListener("orientationchange", setAppVh);
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", setAppVh);
}

const app = new App({
  target: document.getElementById("app")
});

const sk = document.getElementById("chat-skeleton");
if (sk) {
  requestAnimationFrame(() => {
    sk.classList.add("hide");
    setTimeout(() => sk.remove(), 260);
  });
}

export default app;
