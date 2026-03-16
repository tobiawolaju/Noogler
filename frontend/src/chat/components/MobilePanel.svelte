<script>

  export let visible = false;
  export let connected = false;
  export let wsUrl = "";
  export let tag = "";
  export let lastError = "";
  export let onClose = () => {};
  export let onConnect = () => {};
  export let onDisconnect = () => {};
  export let onPing = () => {};
</script>

{#if visible}
  <div class="wa-overlay">
    <div class="wa-panel">
      <button type="button" class="wa-panel-close" on:click={onClose} aria-label="Close panel">
        ×
      </button>

      <div class="panel-header">
        <h1>Intern Dashboard</h1>
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
        <input id="agent-tag" bind:value={tag} placeholder="e.g. ws, dev, test" />
      </div>

      {#if lastError}
        <div class="wa-bubble error" style="width: 100%; max-width: 100%; margin: 0;">
          {lastError}
        </div>
      {/if}

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: auto;">
        {#if !connected}
          <button class="btn primary" on:click={onConnect} style="padding: 10px;">Connect</button>
        {:else}
          <button class="btn secondary" on:click={onDisconnect} style="padding: 10px; background: rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.1);">Disconnect</button>
        {/if}
        <button class="btn secondary" on:click={onPing} disabled={!connected} style="padding: 10px; background: rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.1);">Test Ping</button>
      </div>
    </div>
  </div>
{/if}
