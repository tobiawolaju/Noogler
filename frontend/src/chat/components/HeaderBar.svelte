<script>
  export let statusLine = "";
  export let agentName = "Agent 1";
  export let avatarUrl = "";
  export let callActive = false;
  export let onOpenPanel = () => {};
  export let onToggleCall = () => {};
  export let onHeaderClick = () => {};
  export let micVolume = 0;
</script>

<header class="wa-header" on:click={onHeaderClick}>
  <div class="wa-toolbar" style="display: flex; align-items: center; gap: 8px;">
    <a href="/agents.html" class="wa-back-btn" aria-label="Back to agents" on:click|stopPropagation>
      <span class="material-symbols-outlined">&#xE5C4;</span>
    </a>
    <div>
      <button
        type="button"
        class="wa-title-btn"
        on:click|stopPropagation={onOpenPanel}
        aria-label="Open agent details"
      >
        <div class="wa-title-wrap">
          <div class="wa-name-row">
             {#if avatarUrl}
               <img class="wa-agent-avatar" src={avatarUrl} alt={`${agentName} avatar`} />
             {/if}
             <h2>{agentName}</h2>
          </div>
          <p class="wa-status-line">{statusLine}</p>
        </div>
      </button>
    </div>
  </div>
  <div class="wa-header-actions" style="position: relative; display: grid; place-items: center;">
    {#if callActive}
      <div 
        class="call-pulse-wrapper"
        style="
          transform: scale({1 + micVolume * 1.2});
          opacity: {0.8 + micVolume * 0.2};
        "
      >
        <div class="call-pulse-bg"></div>
      </div>
    {/if}
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

<style>
  .wa-back-btn {
    width: 38px;
    height: 38px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: var(--text-primary);
    transition: background-color 0.2s;
    flex-shrink: 0;
  }
  .wa-back-btn:active {
    background-color: var(--bg-tertiary);
  }
  .wa-back-btn .material-symbols-outlined {
    font-size: 24px;
    font-variation-settings: "FILL" 1, "wght" 500, "GRAD" 0, "opsz" 24;
  }
</style>
