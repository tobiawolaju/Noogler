<script>
  export let instruction = "";
  export let connected = false;
  export let onSubmit = () => {};
</script>

<div class="wa-footer">


  <form class="wa-input" on:submit|preventDefault={onSubmit}>
    <input
      id="noogler-input"
      name="noogler-input"
      bind:value={instruction}
      placeholder="Message Noogler..."
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
    />
    <button type="submit" class="wa-send" disabled={!connected} aria-label="Send">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M3.4 20.6 21 12 3.4 3.4l-.6 6.7 10.1 1.9-10.1 1.9.6 6.7Z" />
      </svg>
    </button>
  </form>
</div>
