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
  <aside class="wa-sidebar">
      <div class="wa-brand">
        <a class="wa-home" href="/index.html" aria-label="Back to home">
          <span class="material-symbols-outlined">home</span>
        </a>
        <div>
          <h3>logoout home</h3>

          <p>Return to landing</p>
        </div>
      </div>

    <div class="wa-connection">
      <span class="dot" class:online={connected}></span>
      <div>
        <strong>{connected ? "Connected" : "Disconnected"}</strong>
        <small>{connected ? "Listening on 127.0.0.1:8765" : "Waiting for agent"}</small>
        <small>Auto-reconnect: {connected ? "on" : "waiting"}</small>
      </div>
    </div>

    <div class="wa-chatlist">
      <h4>Command Streams</h4>
      <div class="wa-chat-item active">
        <div>
          <strong>Local Agent</strong>
          <span>ws</span>
        </div>
        <p>Live execution events</p>
      </div>
      <div class="wa-chat-item">
        <div>
          <strong>System</strong>
          <span>ping</span>
        </div>
        <p>Health & latency checks</p>
      </div>
    </div>

    <div class="wa-settings">
      <label>
        WebSocket URL
        <input bind:value={wsUrl} placeholder="ws://127.0.0.1:8765" />
      </label>
      <label>
        Tag
        <input bind:value={tag} placeholder="ws" />
      </label>
      <div class="wa-actions">
        <button class="btn ghost" on:click={connect}>Connect</button>
        <button class="btn ghost" on:click={disconnect}>Disconnect</button>
        <button class="btn ghost" on:click={sendPing}>Ping</button>
      </div>
      {#if lastError}
        <p class="note">{lastError}</p>
      {/if}
    </div>
  </aside>

  <main class="wa-main">
    <header class="wa-header" on:click={handleHeaderClick}>
      <div class="wa-toolbar">
        <div>
          <button type="button" class="wa-title-btn" on:click|stopPropagation={openPanel} aria-label="Open agent details">
            <div>
              <h2>Local Agent</h2>
              <p class="wa-status-line">{statusLine}</p>
            </div>
          </button>
        </div>
      </div>
      <div class="wa-header-actions">
        <button
          type="button"
          class="wa-icon-btn call-toggle"
          class:call-active={callActive}
          on:click|stopPropagation={handleCallButtonClick}
          aria-label={callActive ? "End call" : "Start call"}
        >
          <span class="material-symbols-outlined">{callActive ? "call_end" : "call"}</span>
        </button>
      </div>
    </header>

    <section class="wa-feed" bind:this={feedEl}>
      {#if events.length === 0}
        <div class="wa-empty">
          <h3>No events yet</h3>
          <p>Send a command to see replies from the local body.</p>
        </div>
      {:else}
        {#each events as event, i}
          <div class="wa-bubble-wrap {event.type === 'outgoing' ? 'from-me' : 'from-body'}">
            {#if i === 0 || events[i - 1].type !== event.type}
              <div class="wa-bubble-tag">
                {event.type === "outgoing" ? "User" : "Agent"}
              </div>
            {/if}
            <div
              class="wa-bubble {event.type === 'outgoing' ? 'from-me' : 'from-body'} {event.status === 'error' ? 'error' : 'ok'}"
            >
            {#if event.type === "outgoing"}
              <strong>{event.text ?? event.instruction}</strong>
              <small>Tag: {event.tag}</small>
            {:else if event.type === "pong"}
              <strong>Pong</strong>
              <small>ts_ms: {event.ts_ms}</small>
            {:else if event.type === "error"}
              <strong>Error</strong>
              <small>{event.error}</small>
            {:else if event.type === "raw"}
              <strong>Raw</strong>
              <small>{event.payload}</small>
            {:else}
              <strong>{event.instruction}</strong>
              <small>Status: {event.status} · Tag: {event.tag}</small>
              <small>Detail: {event.detail}</small>
              {#if event.screenshot_path}
                <small>Path: {event.screenshot_path}</small>
              {/if}
              {#if event.screenshot_data_url}
                <img class="wa-bubble-image" src={event.screenshot_data_url} alt="Screenshot" loading="lazy" />
              {/if}
              <small>Duration: {event.duration_ms} ms</small>
            {/if}
            </div>
          </div>
        {/each}
      {/if}
    </section>

    <div class="wa-footer">
      {#if showSuggestions}
        <div class="wa-suggest">
          <div class="wa-suggest-header">
            <span>Command templates</span>
            <small>Type to filter, click to insert</small>
          </div>
          <div class="wa-suggest-list">
            {#if filteredTemplates.length === 0}
              <div class="wa-suggest-empty">No matches</div>
            {:else}
              {#each filteredTemplates as cmd}
                <button
                  class="wa-suggest-item"
                  type="button"
                  on:click={() => (instruction = cmd)}
                >
                  {cmd}
                </button>
              {/each}
            {/if}
          </div>
        </div>
      {/if}

      <form class="wa-input" on:submit|preventDefault={sendCommand}>
      <input
        bind:value={instruction}
        placeholder="Type a command... (e.g. move 400 400)"
      />
        <button type="submit" class="wa-send" disabled={!connected} aria-label="Send">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M3.4 20.6 21 12 3.4 3.4l-.6 6.7 10.1 1.9-10.1 1.9.6 6.7Z" />
          </svg>
        </button>
      </form>
    </div>
  </main>

  <OngoingCallOverlay
    visible={overlayVisible}
    elapsedLabel={callDurationLabel}
    onClose={handleOverlayClose}
    onEnd={handleOverlayEnd}
  />
</div>




{#if showMobilePanel}
  <div class="wa-overlay">
    <div class="wa-panel">
      <button type="button" class="wa-panel-close" on:click={closePanel} aria-label="Close panel">
        ×
      </button>
      <div class="wa-brand panel-brand">
        <a class="wa-home" href="/index.html" aria-label="Back to home">
          <span class="material-symbols-outlined">home</span>
        </a>
        <div>
          <h3>Home</h3>
          <p>Return to landing</p>
        </div>
      </div>

      <div class="wa-connection">
        <span class="dot" class:online={connected}></span>
        <div>
          <strong>{connected ? "Connected" : "Disconnected"}</strong>
          <small>{connected ? "Listening on 127.0.0.1:8765" : "Waiting for agent"}</small>
          <small>Auto-reconnect: {connected ? "on" : "waiting"}</small>
        </div>
      </div>




      <div class="wa-chatlist">
        <h4>Command Streams</h4>
        <div class="wa-chat-item active">
          <div>
            <strong>Local Agent</strong>
            <span>ws</span>
          </div>
          <p>Live execution events</p>
        </div>
        <div class="wa-chat-item">
          <div>
            <strong>System</strong>
            <span>ping</span>
          </div>
          <p>Health & latency checks</p>
        </div>
      </div>

    </div>
  </div>
{/if}

