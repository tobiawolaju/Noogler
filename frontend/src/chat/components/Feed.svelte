<script>
  export let events = [];
  export let feedEl;
</script>

<section class="wa-feed" bind:this={feedEl}>
  {#if events.length === 0}
    <div class="wa-empty">
      <h3>No events yet</h3>
      <p>Send a command to see replies from the local body.</p>
    </div>
  {:else}
    {#each events as event, i}
      <div class="wa-bubble-wrap {event.type === 'outgoing' ? 'from-me' : 'from-body'}">
        {#if i === 0 || events[i - 1].type !== event.type}
          <div class="wa-bubble-tag">
            {event.type === "outgoing" ? "User" : "Agent"}
          </div>
        {/if}
        <div
          class="wa-bubble {event.type === 'outgoing' ? 'from-me' : 'from-body'} {event.status === 'error' ? 'error' : 'ok'}"
        >
          {#if event.type === "outgoing"}
            <strong>{event.text ?? event.instruction}</strong>
            <small>Tag: {event.tag}</small>
          {:else if event.type === "pong"}
            <strong>Pong</strong>
            <small>ts_ms: {event.ts_ms}</small>
          {:else if event.type === "error"}
            <strong>Error</strong>
            <small>{event.error}</small>
          {:else if event.type === "raw"}
            <strong>Raw</strong>
            <small>{event.payload}</small>
          {:else}
            <strong>{event.instruction}</strong>
            <small>Status: {event.status} - Tag: {event.tag}</small>
            <small>Detail: {event.detail}</small>
            {#if event.screenshot_path}
              <small>Path: {event.screenshot_path}</small>
            {/if}
            {#if event.screenshot_data_url}
              <img class="wa-bubble-image" src={event.screenshot_data_url} alt="Screenshot" loading="lazy" />
            {/if}
            <small>Duration: {event.duration_ms} ms</small>
          {/if}
        </div>
      </div>
    {/each}
  {/if}
</section>
