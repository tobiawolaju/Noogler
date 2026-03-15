<script>
  export let statusLine = "";
  export let callActive = false;
  export let onOpenPanel = () => {};
  export let onToggleCall = () => {};
  export let onHeaderClick = () => {};
</script>

<header class="wa-header" on:click={onHeaderClick}>
  <div class="wa-toolbar">
    <div>
      <button
        type="button"
        class="wa-title-btn"
        on:click|stopPropagation={onOpenPanel}
        aria-label="Open agent details"
      >
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
      on:click|stopPropagation={onToggleCall}
      aria-label={callActive ? "End call" : "Start call"}
    >
      <span class="material-symbols-outlined">{callActive ? "call_end" : "call"}</span>
    </button>
  </div>
</header>
