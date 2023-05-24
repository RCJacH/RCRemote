<script lang="ts">
  import Settings from "./Sections/Transport/Settings.svelte";
  import Screen from "./Sections/Transport/Screen.svelte";
  import Button from "./Components/Button.svelte";
  import Playback from "./Sections/Transport/Playback.svelte";
  import { response } from "../scripts/requests";
  import { commandID } from "./constants";

  export let page: string;

  let state: number = -1;
  let position: string = "";
  let isPrerollOn: boolean;
  let isMetronomeOn: boolean;
  let isRepeatOn: boolean;

  response.subscribe((result) => {
    if ("transport" in result) {
      let transport = result.transport;
      state = transport.state;
      isRepeatOn = transport.isRepeatOn;
      position = transport.position;
    }
    if ("cmdstate" in result) {
      for (let t in result.cmdstate) {
        switch (t.id) {
          case commandID.toggle.metronome.toString():
            isMetronomeOn = t.state;
          case commandID.toggle.preroll.toString():
            isPrerollOn = t.state;
        }
      }
    }
  });
</script>

<template lang="pug">
  div#transport
    Screen({state} {position})
    Settings({isPrerollOn} {isMetronomeOn} {isRepeatOn})
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
