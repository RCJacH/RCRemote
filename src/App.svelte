<script lang="ts">
  import Recording from "./lib/Recording.svelte";
  export let page = "recording";
</script>

<main>
  {#if page === "recording"}
    <Recording bind:page />
  {/if}
</main>

<style>
</style>
