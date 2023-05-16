<script lang="ts">
  import Screen from "./Sections/Transport/Screen.svelte";
  import Button from "./Components/Button.svelte";
  import Playback from "./Sections/Transport/Playback.svelte";
  export let page: string;

  const btn_setting_visual = "multi";

  let posUnits = ["Beat", "Bar", "Marker"];
  let posUnitIndex = 0;
  function cyclePositionUnit() {
    posUnitIndex = (posUnitIndex + 1) % posUnits.length;
  }
</script>

<template lang="pug">
  div#transport
    Screen
    #settings
      .position
        Button(
          visual="{btn_setting_visual}",
          name="position_unit",
          content!="{posUnits[posUnitIndex]}",
          on:click!="{(e) => cyclePositionUnit()}"
        )
        Button(visual="{btn_setting_visual}", name="menu", content="Menu")
        Button(visual="{btn_setting_visual}", name="position_range", content="Range")
      .options
        Button(visual="{btn_setting_visual}", name="preroll", content="Preroll")
        Button(visual="{btn_setting_visual}", name="metronome")
        Button(visual="{btn_setting_visual}", name="loop", content="Loop")
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
