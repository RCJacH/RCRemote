<script lang="ts">
  import Screen from "./Sections/Transport/Screen.svelte";
  import Button from "./Components/Button.svelte";
  import Playback from "./Sections/Transport/Playback.svelte";
  export let page: string;

  const btn_setting_visual = "multi";
  const btn_playback_visual = "skeuomorphic";
</script>

<template lang="pug">
  div#transport
    Screen
    #settings
      .position
        Button(visual="{btn_setting_visual}", name="position_unit", content="Bar")
        Button(visual="{btn_setting_visual}", name="rewind")
        Button(visual="{btn_setting_visual}", name="fforward")
        Button(visual="{btn_setting_visual}", name="goto", content="GoTo")
      .options
        Button(visual="{btn_setting_visual}", name="loop", content="Loop")
        Button(visual="{btn_setting_visual}", name="menu", content="Menu")
        Button(visual="{btn_setting_visual}", name="preroll", content="Preroll")
    Playback
</template>

<style lang="postcss">
  #transport {
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    height: 100%;
    }

  #settings {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex: 2;
    justify-content: space-around;
    div {
      display: flex;
      flex: 1 0 auto;
    }
  }
</style>
