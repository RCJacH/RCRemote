<script lang="ts">
  import ButtonBase from "./SettingsButton.svelte";
  import Button from "../../Components/Button.svelte";
  let posUnits = ["beat", "measure", "marker"];
  let posUnitIndex = 0;
  function cyclePositionUnit() {
    posUnitIndex = (posUnitIndex + 1) % posUnits.length;
  }
</script>

<template lang="pug">
  #settings
    ButtonBase
      Button#position-unit(
        iconname!="{posUnits[posUnitIndex]+'unit'}",
        on:click!="{(e) => cyclePositionUnit()}"
        baseless
      )
      Button#menu(baseless)
      Button#range(content="Range", baseless)
    ButtonBase
      Button#preroll(content="Preroll", baseless)
      Button#metronome(baseless)
      Button#loop(baseless)
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
