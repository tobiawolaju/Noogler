import App from "./App.svelte";

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
