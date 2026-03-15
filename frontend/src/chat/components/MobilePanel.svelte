<script>
  import Sidebar from "./Sidebar.svelte";

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
      <Sidebar
        {connected}
        bind:wsUrl
        bind:tag
        {lastError}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
        onPing={onPing}
      />
    </div>
  </div>
{/if}
