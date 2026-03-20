<script>
  export let events = [];
  export let feedEl;
  export let userName = "User";
  export let onReply = () => {};
  export let showAgentTyping = false;

  const isOutgoing = (event) => event?.type === "outgoing";
  const isMessageEvent = (event) => event?.type === "outgoing" || event?.type === "chat_reply";
  const isSystemEvent = (event) => !isMessageEvent(event);
</script>

<section class="wa-feed" bind:this={feedEl}>
  {#if events.length === 0}
    <div class="wa-empty">
      <h3>No events yet</h3>
      <p>Send a command to see replies from the local body.</p>
    </div>
  {:else}
    {#each events as event, i}
      {#if isSystemEvent(event)}
        <div class="wa-system-row">
          <div class="wa-system-card {event.status === 'error' || event.type === 'error' ? 'error' : ''}">
            <strong>{event.instruction || event.type || "event"}</strong>
            {#if event.detail}<small>{event.detail}</small>{/if}
            {#if event.error}<small>{event.error}</small>{/if}
            {#if event.type === "raw"}<small>{event.payload}</small>{/if}
            {#if event.screenshot_data_url}
              <img class="wa-bubble-image" src={event.screenshot_data_url} alt="Screenshot" loading="lazy" />
            {/if}
          </div>
        </div>
      {:else}
        <div class="wa-bubble-wrap {isOutgoing(event) ? 'from-me' : 'from-body'}">
          {#if i === 0 || !isMessageEvent(events[i - 1]) || isOutgoing(events[i - 1]) !== isOutgoing(event)}
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
                <span class="wa-chat-text">{event.text ?? event.instruction}</span>
              {:else}
                <span class="wa-chat-text">{event.text}</span>
              {/if}
            </div>

            <div class="wa-bubble-actions">
              <button class="wa-action-btn" title="Reply" on:click={() => onReply(event)}>
                <span class="material-symbols-outlined">reply</span>
              </button>
            </div>
          </div>
        </div>
      {/if}
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
