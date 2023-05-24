<script lang="ts">
  import Icon from "./lib/Components/Icon.svelte";
  import Recording from "./lib/Recording.svelte";
  import { addRecur, update } from "./scripts/requests";
  import { onMount } from "svelte";
  import { commandID } from "./lib/constants";

  function getReply() {
    update();
  }

  onMount(() => {
    addRecur("TRANSPORT;BEATPOS", 10);
    addRecur(
      `GET/${commandID.toggle.preroll};GET/${commandID.toggle.metronome}`,
      10
    );
    getReply();
  });

  export let page = "recording";
</script>

<main>
  {#if page === "recording"}
    <Recording bind:page />
  {/if}
  <Icon />
</main>

<style global lang="postcss">
  body,
  main {
    height: 100vh;
    margin: 0;
  }
</style>
