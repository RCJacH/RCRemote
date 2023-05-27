<script lang="ts">
  import Icon from "./lib/Components/Icon.svelte";
  import Recording from "./lib/Recording.svelte";
  import { onMount } from "svelte";
  import { addRecur, update } from "~scripts/requests";
  import { commandID } from "~scripts/constants";

  function getReply() {
    update();
  }

  onMount(() => {
    addRecur("TRANSPORT;BEATPOS", 10);
    addRecur(
      `GET/${commandID.toggle.preroll};GET/${commandID.toggle.metronome};GET/${commandID.toggle.loop}`,
      10
    );
    addRecur("MARKER;REGION", 500);
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
