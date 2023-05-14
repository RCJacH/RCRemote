<script lang="ts">
  import Icon from "./lib/Components/Icon.svelte";
  import Recording from "./lib/Recording.svelte";
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
