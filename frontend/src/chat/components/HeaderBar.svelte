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
  <div class="wa-toolbar">
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
