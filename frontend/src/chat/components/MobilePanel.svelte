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

  let editingApiKey = false;

  $: apiKeyDisplay = editingApiKey ? apiKey : (hasApiKey ? "xxxxxxxxxxx" : "");
  $: if (hasApiKey && !apiKey) editingApiKey = false;
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
        <label for="agent-tag">Agent Tag</label>
        <input
          id="agent-tag"
          bind:value={tag}
          placeholder="Agent 1"
          on:blur={() => onTagCommit(tag)}
        />
      </div>

      <div class="wa-settings-group">
        <label for="agent-soul">Agent Soul</label>
        <input
          id="agent-soul"
          bind:value={agentSoul}
          placeholder="Add your agent's persona..."
          on:blur={() => onSoulCommit(agentSoul)}
        />
      </div>

      <div class="wa-settings-group">
        <label for="gemini-api-key">API Key (Gemini)</label>
        <input
          id="gemini-api-key"
          type="text"
          value={apiKeyDisplay}
          placeholder="Paste Gemini API key"
          on:focus={() => {
            if (!editingApiKey) editingApiKey = true;
          }}
          on:input={(e) => {
            apiKey = e.currentTarget.value;
            editingApiKey = true;
          }}
          on:paste={(e) => {
            setTimeout(() => {
              apiKey = e.currentTarget.value;
              editingApiKey = true;
              onApiKeyCommit(apiKey);
              e.currentTarget.blur();
            }, 0);
          }}
          on:blur={() => {
            if (editingApiKey) onApiKeyCommit(apiKey);
          }}
        />
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
