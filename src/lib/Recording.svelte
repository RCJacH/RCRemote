<script lang="ts">
  import Settings from "./Sections/Transport/Settings.svelte";
  import Screen from "./Sections/Transport/Screen.svelte";
  import Button from "./Components/Button.svelte";
  import Playback from "./Sections/Transport/Playback.svelte";
  export let page: string;
</script>

<template lang="pug">
  div#transport
    Screen
    Settings
    Playback
    .open-tracks
</template>

<style lang="postcss">
  #transport {
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    height: 100%;
  }
</style>
