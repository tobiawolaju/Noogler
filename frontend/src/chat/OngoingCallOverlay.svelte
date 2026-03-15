<script>
  export let visible = false;
  export let elapsedLabel = "0:00";
  export let onClose = () => {};
  export let onEnd = () => {};
</script>

{#if visible}
  <div class="call-overlay" role="dialog" aria-label="Ongoing call">
    <div class="call-overlay-brand">
    </div>
    <div class="call-overlay-header">
      <h2>Local Agent</h2>
      <p class="call-overlay-status">ongoing call - {elapsedLabel}</p>
    </div>
    <div class="call-overlay-content">
      <!-- center content intentionally left empty -->
    </div>
    <div class="call-overlay-actions">
      <button type="button" class="call-overlay-action" aria-label="Close overlay" on:click={onClose}>
        <span class="material-symbols-outlined">close</span>
      </button>
      <button type="button" class="call-overlay-action call-overlay-end" aria-label="End call" on:click={onEnd}>
        <span class="material-symbols-outlined">call_end</span>
      </button>
    </div>
  </div>
{/if}

