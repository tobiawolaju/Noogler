<script>
  export let events = [];
  export let feedEl;
  export let userName = "User";
  export let onReply = () => {};
  export let showAgentTyping = false;

  const isOutgoing = (event) => event?.type === "outgoing";
</script>

<section class="wa-feed" bind:this={feedEl}>
  {#if events.length === 0}
    <div class="wa-empty">
      <h3>No events yet</h3>
      <p>Send a command to see replies from the local body.</p>
    </div>
  {:else}
    {#each events as event, i}
      <div class="wa-bubble-wrap {isOutgoing(event) ? 'from-me' : 'from-body'}">
        {#if i === 0 || isOutgoing(events[i - 1]) !== isOutgoing(event)}
          <div class="wa-name-bubble">
            {isOutgoing(event) ? userName : "Agent"}
          </div>
        {/if}
        
        <div class="wa-bubble-container">
          <div
            class="wa-bubble {isOutgoing(event) ? 'from-me' : 'from-body'} {event.status === 'error' ? 'error' : 'ok'}"
          >
            {#if event.reply_to}
              <div class="wa-replied-msg">
                {event.reply_to}
              </div>
            {/if}

            {#if event.type === "outgoing"}
              <strong>{event.text ?? event.instruction}</strong>
            {:else if event.type === "chat_reply"}
              <span class="wa-chat-text">{event.text}</span>
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

          <div class="wa-bubble-actions">
            <button class="wa-action-btn" title="Reply" on:click={() => onReply(event)}>
              <span class="material-symbols-outlined">reply</span>
            </button>
          </div>
        </div>
      </div>
    {/each}

    {#if showAgentTyping}
      <div class="wa-bubble-wrap from-body">
        <div class="wa-name-bubble">Agent</div>
        <div class="wa-bubble-container">
          <div class="wa-bubble from-body">
            <div class="wa-typing-dots" aria-label="Agent is typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/if}
</section>
