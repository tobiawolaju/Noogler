<script>

  export let visible = false;
  export let connected = false;
  export let wsUrl = "";
  export let tag = "";
  export let agentSoul = "";
  export let apiKey = "";
  export let hasApiKey = false;
  export let lastError = "";
  export let onClose = () => {};
  export let onConnect = () => {};
  export let onDisconnect = () => {};
  export let onPing = () => {};
  export let onApiKeyCommit = (_value) => {};
  export let onTagCommit = (_value) => {};
  export let onSoulCommit = (_value) => {};
  export let onSoulInput = (_value) => {};

  let editingApiKey = false;

  $: if (hasApiKey && !apiKey) editingApiKey = false;
  $: apiKeyPlaceholder = hasApiKey ? "***********************" : "Paste Gemini API key";
</script>

{#if visible}
  <div class="wa-overlay">
    <div class="wa-panel">
      <button type="button" class="wa-panel-close" on:click={onClose} aria-label="Close panel">
        ×
      </button>

      <div class="panel-header">
        <h1>Noogler Dashboard</h1>
        <p style="opacity: 0.6; font-size: 0.9rem;">Configure your connection and monitor status</p>
      </div>

      <div class="wa-status-row">
        <div class="wa-status-dot {connected ? 'online' : 'offline'}"></div>
        <span>{connected ? 'Connected' : 'Disconnected'}</span>
      </div>

      <div class="wa-settings-group">
        <label for="ws-url">Server WebSocket URL</label>
        <input id="ws-url" bind:value={wsUrl} placeholder="ws://..." />
      </div>

      <div class="wa-settings-group">
        <label for="gemini-api-key">API Key (Gemini)</label>
        <div class="wa-inline-field">
          <input
            id="gemini-api-key"
            type="text"
            bind:value={apiKey}
            placeholder={apiKeyPlaceholder}
            on:focus={() => {
              if (!editingApiKey) editingApiKey = true;
            }}
          />
          <button
            type="button"
            class="wa-save-icon"
            aria-label="Save API key"
            title="Save API key"
            disabled={!apiKey.trim()}
            on:click={() => onApiKeyCommit(apiKey)}
          >
            <span class="material-symbols-outlined" aria-hidden="true">&#xE161;</span>
          </button>
        </div>
      </div>

      <div class="wa-settings-group">
        <label for="agent-tag">Agent Tag</label>
        <input
          id="agent-tag"
          bind:value={tag}
          placeholder="Agent 1"
          on:blur={(e) => onTagCommit(e.currentTarget.value)}
        />
      </div>

      <div class="wa-settings-group">
        <label for="agent-soul">Agent Soul</label>
        <textarea
          id="agent-soul"
          bind:value={agentSoul}
          rows="3"
          style="min-height: 84px;"
          placeholder="Add your agent's persona..."
          on:input={(e) => onSoulInput(e.currentTarget.value)}
          on:blur={(e) => onSoulCommit(e.currentTarget.value)}
        ></textarea>
        <a class="btn secondary wa-soul-help" href="/souls.html">
          Don’t know what to put in souls? Go to Souls
        </a>
      </div>

      {#if lastError}
        <div class="wa-bubble error" style="width: 100%; max-width: 100%; margin: 0;">
          {lastError}
        </div>
      {/if}

      <div class="wa-panel-actions">
        {#if !connected}
          <button class="btn primary" on:click={onConnect}>Connect</button>
        {:else}
          <button class="btn secondary" on:click={onDisconnect}>Disconnect</button>
        {/if}
        <button class="btn secondary" on:click={onPing} disabled={!connected}>Test Ping</button>
      </div>
    </div>
  </div>
{/if}
