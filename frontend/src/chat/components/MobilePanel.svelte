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
    <h1>Hello, I am your inten and this is the intern dashboard</h1>


    </div>
  </div>
{/if}
