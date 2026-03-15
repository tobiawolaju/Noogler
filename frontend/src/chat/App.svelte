<script>
  import { onMount, onDestroy } from "svelte";
  import OngoingCallOverlay from "./OngoingCallOverlay.svelte";
  import HeaderBar from "./components/HeaderBar.svelte";
  import Feed from "./components/Feed.svelte";
  import FooterInput from "./components/FooterInput.svelte";
  import MobilePanel from "./components/MobilePanel.svelte";

  let ws;
  let wsUrl = "ws://127.0.0.1:8787";
  let connected = false;
  let lastError = "";
  let reconnectTimer;
  let reconnectAttempts = 0;
  let shouldReconnect = true;

  let instruction = "";
  let tag = "ws";
  let index = 1;

  let events = [];
  let feedEl;
  let showMobilePanel = false;

  let callActive = false;
  let overlayVisible = false;
  let callStartTime = 0;
  let elapsedMs = 0;
  let callTimer;

  const updateElapsed = () => {
    elapsedMs = Date.now() - callStartTime;
  };

  const startTimer = () => {
    stopTimer();
    updateElapsed();
    callTimer = setInterval(updateElapsed, 1000);
  };

  const stopTimer = () => {
    if (callTimer) {
      clearInterval(callTimer);
      callTimer = undefined;
    }
  };

  const formatDuration = (ms) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const startCall = () => {
    callActive = true;
    overlayVisible = true;
    callStartTime = Date.now();
    elapsedMs = 0;
    startTimer();
  };

  const endCall = () => {
    callActive = false;
    overlayVisible = false;
    stopTimer();
    elapsedMs = 0;
  };

  const handleCallButtonClick = (event) => {
    event.stopPropagation();
    if (!callActive) {
      startCall();
      return;
    }
    endCall();
  };

  const handleHeaderClick = () => {
    if (callActive) {
      overlayVisible = true;
    }
  };

  const handleOverlayClose = () => {
    overlayVisible = false;
  };

  const handleOverlayEnd = () => {
    endCall();
  };

  $: callDurationLabel = formatDuration(elapsedMs);
  $: statusLine = callActive ? `ongoing call - ${callDurationLabel}` : connected ? "online" : "offline";

  const connect = () => {
    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    shouldReconnect = true;
    lastError = "";
    ws = new WebSocket(wsUrl);

    ws.addEventListener("open", () => {
      connected = true;
      reconnectAttempts = 0;
    });

    ws.addEventListener("close", () => {
      connected = false;
      scheduleReconnect();
    });

    ws.addEventListener("error", () => {
      lastError = "WebSocket connection failed";
      scheduleReconnect();
    });

    ws.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        events = [...events, data].slice(-200);
        tickScroll();
      } catch (err) {
        events = [...events, { type: "raw", payload: event.data }].slice(-200);
        tickScroll();
      }
    });
  };

  const disconnect = () => {
    shouldReconnect = false;
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (ws) {
      ws.close();
      ws = null;
    }
  };

  const sendCommand = () => {
    if (!connected || !ws) return;
    if (!instruction.trim()) return;

    const payload = {
      type: "user",
      index,
      text: instruction.trim(),
      tag: tag.trim() || "ws"
    };

    events = [
      ...events,
      {
        type: "outgoing",
        text: payload.text,
        tag: payload.tag,
        ts_ms: Date.now()
      }
    ].slice(-200);
    tickScroll();

    ws.send(JSON.stringify(payload));
    index += 1;
    instruction = "";
  };

  const sendPing = () => {
    if (!connected || !ws) return;
    ws.send(JSON.stringify({ type: "ping" }));
  };

  const scheduleReconnect = () => {
    if (!shouldReconnect) return;
    if (reconnectTimer) return;
    const delay = Math.min(10000, 500 * (reconnectAttempts + 1));
    reconnectAttempts += 1;
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      connect();
    }, delay);
  };

  const tickScroll = () => {
    requestAnimationFrame(() => {
      if (feedEl) {
        feedEl.scrollTop = feedEl.scrollHeight;
      }
    });
  };


  const commandTemplates = [
    "move <x> <y>",
    "click <x> <y>",
    "doubleclick <x> <y>",
    "mousedown <x> <y>",
    "mouseup <x> <y>",
    "drag <x1> <y1> <x2> <y2>",
    "scroll <delta>",
    "type: <text>",
    "key: <NAME>",
    "hotkey: CTRL+SHIFT+S",
    "wait <ms>",
    "screenshot <path>",
    "noop"
  ];

  $: showSuggestions = instruction.trim().startsWith("/");
  $: suggestionQuery = showSuggestions ? instruction.trim().slice(1).toLowerCase() : "";
  $: filteredTemplates = showSuggestions
    ? commandTemplates.filter((cmd) => cmd.toLowerCase().includes(suggestionQuery))
    : [];
  const openPanel = () => {
    showMobilePanel = true;
  };

  const closePanel = () => {
    showMobilePanel = false;
  };

  onMount(() => {
    connect();
  });

  onDestroy(() => {
    disconnect();
    stopTimer();
  });
</script>
<div class="wa-shell">
  <main class="wa-main">
    <HeaderBar
      {statusLine}
      {callActive}
      onOpenPanel={openPanel}
      onToggleCall={handleCallButtonClick}
      onHeaderClick={handleHeaderClick}
    />

    <Feed {events} bind:feedEl />

    <FooterInput
      bind:instruction
      {connected}
      {showSuggestions}
      {filteredTemplates}
      onSelectTemplate={(cmd) => (instruction = cmd)}
      onSubmit={sendCommand}
    />
  </main>

  <OngoingCallOverlay
    visible={overlayVisible}
    elapsedLabel={callDurationLabel}
    onClose={handleOverlayClose}
    onEnd={handleOverlayEnd}
  />

  <MobilePanel
    visible={showMobilePanel}
    {connected}
    bind:wsUrl
    bind:tag
    {lastError}
    onClose={closePanel}
    onConnect={connect}
    onDisconnect={disconnect}
    onPing={sendPing}
  />
</div>
