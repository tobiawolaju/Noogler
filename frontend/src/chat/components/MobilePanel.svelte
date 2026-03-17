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
        <input id="agent-tag" bind:value={tag} placeholder="e.g. ws, dev, test" />
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
