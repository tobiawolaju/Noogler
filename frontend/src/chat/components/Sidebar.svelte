<script>
  import BrandCard from "./BrandCard.svelte";
  import ConnectionStatus from "./ConnectionStatus.svelte";
  import ChatList from "./ChatList.svelte";
  import SettingsPanel from "./SettingsPanel.svelte";

  export let connected = false;
  export let wsUrl = "";
  export let tag = "";
  export let lastError = "";
  export let onConnect = () => {};
  export let onDisconnect = () => {};
  export let onPing = () => {};
</script>

<aside class="wa-sidebar">
  <BrandCard title="logoout home" line1="Home" line2="Return to landing" />

  <ConnectionStatus connected={connected} />

  <ChatList />

  <SettingsPanel
    bind:wsUrl
    bind:tag
    {lastError}
    {onConnect}
    {onDisconnect}
    {onPing}
  />
</aside>
