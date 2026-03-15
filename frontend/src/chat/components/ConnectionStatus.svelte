<script>
  export let connected = false;
  export let address = "127.0.0.1:8765";
</script>

<div class="wa-connection">
  <span class="dot" class:online={connected}></span>
  <div>
    <strong>{connected ? "Connected" : "Disconnected"}</strong>
    <small>{connected ? `Listening on ${address}` : "Waiting for agent"}</small>
    <small>Auto-reconnect: {connected ? "on" : "waiting"}</small>
  </div>
</div>
