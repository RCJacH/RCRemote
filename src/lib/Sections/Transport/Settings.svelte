<script lang="ts">
  import ButtonBase from "./SettingsButton.svelte";
  import Button from "../../Components/Button.svelte";
  import { response, addCommand } from "../../../scripts/requests";
  import { commandID } from "../../constants";

  let posUnits = ["beat", "measure", "marker"];
  let posUnitIndex = 0;
  function cyclePositionUnit() {
    posUnitIndex = (posUnitIndex + 1) % posUnits.length;
  }
  let rangeUnits = ["hide", "marker", "region"];
  let rangeUnitIndex = 0;
  function cycleRangeUnit() {
    rangeUnitIndex = (rangeUnitIndex + 1) % rangeUnits.length;
  }

  function triggerPreroll() {
    addCommand(commandID.toggle.preroll);
  }

  function triggerMetronome() {
    addCommand(commandID.toggle.metronome);
  }

  function triggerLoop() {
    addCommand(commandID.toggle.loop);
  }

  export let isPrerollOn;
  export let isMetronomeOn;
  export let isRepeatOn;
</script>

<template lang="pug">
  #settings
    ButtonBase
      Button#position-unit(
        iconname!="{posUnits[posUnitIndex]+'unit'}",
        on:click!="{() => cyclePositionUnit()}"
        baseless
      )
      Button#menu(baseless)
      Button#display-range(
        iconname!="{rangeUnits[rangeUnitIndex]+'range'}",
        on:click!="{() => cycleRangeUnit()}"
        baseless
      )
    ButtonBase
      Button#preroll(
        active!="{isPrerollOn}"
        on:click!="{triggerPreroll}"
        baseless
      )
      Button#metronome(
        active!="{isMetronomeOn}"
        on:click!="{triggerMetronome}"
        baseless
      )
      Button#loop(
        active!="{isRepeatOn}"
        on:click!="{triggerLoop}"
        baseless
      )
</template>

<style lang="postcss">
  #settings {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex: 2;
    justify-content: space-around;
  }
</style>
