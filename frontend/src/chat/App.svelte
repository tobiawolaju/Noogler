<script>
  import { onMount, onDestroy } from "svelte";
  import { auth } from "../../firebase.js";
  import { onAuthStateChanged } from "firebase/auth";
  import OngoingCallOverlay from "./OngoingCallOverlay.svelte";
  import HeaderBar from "./components/HeaderBar.svelte";
  import Feed from "./components/Feed.svelte";
  import FooterInput from "./components/FooterInput.svelte";
  import MobilePanel from "./components/MobilePanel.svelte";

  let currentUser = null;
  $: userFirstName = currentUser?.displayName
    ? currentUser.displayName.split(" ")[0]
    : "User";

  let ws;
  let wsUrl = "https://noogler-265815053881.europe-west1.run.app";
  let connected = false;
  let lastError = "";
  let reconnectTimer;
  let reconnectAttempts = 0;
  let shouldReconnect = true;
  let soulSaveTimer = null;

  let instruction = "";
  let tag = "Agent 1";
  let agentSoul = "";
  let apiKey = "";
  let hasApiKey = false;
  let index = 1;

  let events = [];
  let replyingTo = null;
  let feedEl;
  let inputEl;
  let showMobilePanel = false;

  let callActive = false;
  let overlayVisible = false;
  let callStartTime = 0;
  let elapsedMs = 0;
  let micVolume = 0;
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
  $: statusLine = callActive ? `${callDurationLabel}` : connected ? "online" : "offline";

  const connect = () => {
    if (!currentUser) return; // Wait for auth
    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    shouldReconnect = true;
    lastError = "";
    ws = new WebSocket(wsUrl);

    ws.addEventListener("open", () => {
      connected = true;
      reconnectAttempts = 0;
      // Send handshake exactly as backend expects
      ws.send(JSON.stringify({ type: "frontend_handshake", user_uid: currentUser.uid }));
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
        if (data.type === "history_sync") {
          events = [...data.events, ...events].slice(-200);
        } else if (data.type === "user_settings") {
          hasApiKey = Boolean(data.has_gemini_api_key);
          tag = typeof data.agent_tag === "string" && data.agent_tag.trim() ? data.agent_tag.trim() : "Agent 1";
          agentSoul = typeof data.agent_soul === "string" ? data.agent_soul : "";
          if (!hasApiKey) apiKey = "";
        } else if (data.type === "settings_updated") {
          hasApiKey = Boolean(data.has_gemini_api_key);
          tag = typeof data.agent_tag === "string" && data.agent_tag.trim() ? data.agent_tag.trim() : "Agent 1";
          agentSoul = typeof data.agent_soul === "string" ? data.agent_soul : "";
          if (hasApiKey) {
            apiKey = "";
          }
        } else {
          events = [...events, data].slice(-200);
        }
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
      tag: tag.trim() || "Agent 1"
    };

    if (replyingTo) {
      payload.reply_to = replyingTo.text || replyingTo.instruction || "Image/Command";
    }

    events = [
      ...events,
      {
        type: "outgoing",
        text: payload.text,
        tag: payload.tag,
        reply_to: payload.reply_to,
        ts_ms: Date.now()
      }
    ].slice(-200);
    tickScroll();

    ws.send(JSON.stringify(payload));
    index += 1;
    instruction = "";
    replyingTo = null;
  };

  const sendPing = () => {
    if (!connected || !ws) return;
    ws.send(JSON.stringify({ type: "ping" }));
  };

  const commitApiKey = (value) => {
    if (!connected || !ws) {
      lastError = "Connect first to save API key";
      return;
    }
    const nextKey = typeof value === "string" ? value.trim() : "";
    ws.send(JSON.stringify({
      type: "update_settings",
      gemini_api_key: nextKey
    }));
  };

  const commitTag = (value) => {
    if (!connected || !ws) {
      lastError = "Connect first to save agent tag";
      return;
    }
    const nextTag = typeof value === "string" && value.trim() ? value.trim() : "Agent 1";
    tag = nextTag;
    ws.send(JSON.stringify({
      type: "update_settings",
      agent_tag: nextTag
    }));
  };

  const commitSoul = (value) => {
    if (!connected || !ws) {
      lastError = "Connect first to save agent soul";
      return;
    }
    const nextSoul = typeof value === "string" ? value : "";
    agentSoul = nextSoul;
    ws.send(JSON.stringify({
      type: "update_settings",
      agent_soul: nextSoul
    }));
  };

  const queueSoulCommit = (value) => {
    if (soulSaveTimer) {
      clearTimeout(soulSaveTimer);
      soulSaveTimer = null;
    }
    soulSaveTimer = setTimeout(() => {
      soulSaveTimer = null;
      commitSoul(value);
    }, 700);
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



  const openPanel = () => {
    showMobilePanel = true;
  };

  const handleReply = (ev) => {
    replyingTo = ev;
    // Focus the input when replying
    if (inputEl) {
      inputEl.focus();
    }
  };

  const closePanel = () => {
    showMobilePanel = false;
  };

  let authUnsubscribe;

  onMount(() => {
    authUnsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        currentUser = user;
        connect();
      } else {
        currentUser = null;
        disconnect();
      }
    });
  });

  onDestroy(() => {
    if (authUnsubscribe) authUnsubscribe();
    if (soulSaveTimer) clearTimeout(soulSaveTimer);
    disconnect();
    stopTimer();
  });
</script>
<div class="wa-shell">
  <main class="wa-main">
    <HeaderBar
      {statusLine}
      {callActive}
      {micVolume}
      onOpenPanel={openPanel}
      onToggleCall={handleCallButtonClick}
      onHeaderClick={handleHeaderClick}
    />

    <Feed 
      {events} 
      bind:feedEl 
      userName={userFirstName} 
      onReply={handleReply} 
    />

    <FooterInput
      bind:instruction
      bind:inputEl
      {connected}
      {replyingTo}
      onSubmit={sendCommand}
      onCancelReply={() => replyingTo = null}
    />
  </main>

  <OngoingCallOverlay
    {ws}
    bind:micVolume
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
    bind:agentSoul
    bind:apiKey
    {hasApiKey}
    {lastError}
    onClose={closePanel}
    onConnect={connect}
    onDisconnect={disconnect}
    onPing={sendPing}
    onApiKeyCommit={commitApiKey}
    onTagCommit={commitTag}
    onSoulCommit={commitSoul}
    onSoulInput={queueSoulCommit}
  />
</div>
