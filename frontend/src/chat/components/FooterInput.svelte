<script>
  export let instruction = "";
  export let connected = false;
  export let showSuggestions = false;
  export let filteredTemplates = [];
  export let onSelectTemplate = () => {};
  export let onSubmit = () => {};
</script>

<div class="wa-footer">
  {#if showSuggestions}
    <div class="wa-suggest">
      <div class="wa-suggest-header">
        <span>Command templates</span>
        <small>Type to filter, click to insert</small>
      </div>
      <div class="wa-suggest-list">
        {#if filteredTemplates.length === 0}
          <div class="wa-suggest-empty">No matches</div>
        {:else}
          {#each filteredTemplates as cmd}
            <button
              class="wa-suggest-item"
              type="button"
              on:click={() => onSelectTemplate(cmd)}
            >
              {cmd}
            </button>
          {/each}
        {/if}
      </div>
    </div>
  {/if}

  <form class="wa-input" on:submit|preventDefault={onSubmit}>
    <input
      bind:value={instruction}
      placeholder="Type a command... (e.g. move 400 400)"
    />
    <button type="submit" class="wa-send" disabled={!connected} aria-label="Send">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M3.4 20.6 21 12 3.4 3.4l-.6 6.7 10.1 1.9-10.1 1.9.6 6.7Z" />
      </svg>
    </button>
  </form>
</div>
