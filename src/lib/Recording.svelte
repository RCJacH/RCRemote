<script lang="ts">
  import Settings from "./Sections/Transport/Settings.svelte";
  import Screen from "./Sections/Transport/Screen.svelte";
  import Button from "./Components/Button.svelte";
  import Playback from "./Sections/Transport/Playback.svelte";
  import { response } from "../scripts/requests";

  export let page: string;

  let state: number = -1;
  let position: string = "";

  response.subscribe((result) => {
    if ("transport" in result) {
      let transport = result.transport;
      state = transport.state;
      position = transport.position;
    }
  });
</script>

<template lang="pug">
  div#transport
    Screen({state} {position})
    Settings
    Playback({state})
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
