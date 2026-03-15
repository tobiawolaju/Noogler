<script>
  export let wsUrl = "";
  export let tag = "";
  export let lastError = "";
  export let onConnect = () => {};
  export let onDisconnect = () => {};
  export let onPing = () => {};
</script>

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
    <button class="btn ghost" on:click={onConnect}>Connect</button>
    <button class="btn ghost" on:click={onDisconnect}>Disconnect</button>
    <button class="btn ghost" on:click={onPing}>Ping</button>
  </div>
  {#if lastError}
    <p class="note">{lastError}</p>
  {/if}
</div>
