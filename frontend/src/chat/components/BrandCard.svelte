<script>
  export let title = "Home";
  export let line1 = "Home";
  export let line2 = "Return to landing";
  export let showHome = true;
  export let homeHref = "/index.html";
  export let panel = false;
</script>

<div class={`wa-brand${panel ? " panel-brand" : ""}`}>
  {#if showHome}
    <a class="wa-home" href={homeHref} aria-label="Back to home">
      <span class="material-symbols-outlined">home</span>
    </a>
  {/if}
  <div>
    <h3>{title}</h3>
    <p>{line1}</p>
    <p>{line2}</p>
  </div>
</div>
