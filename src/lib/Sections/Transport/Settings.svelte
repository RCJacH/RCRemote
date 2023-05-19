<script lang="ts">
  import Button from "./SettingsButton.svelte";
  let posUnits = ["beat", "measure", "marker"];
  let posUnitIndex = 0;
  function cyclePositionUnit() {
    posUnitIndex = (posUnitIndex + 1) % posUnits.length;
  }
</script>

<template lang="pug">
  #settings
    .position
      Button(
        name!="{posUnits[posUnitIndex]}",
        on:click!="{(e) => cyclePositionUnit()}"
      )
      Button(name="menu", content="Menu")
      Button(name="position_range", content="Range")
    .options
      Button(name="preroll", content="Preroll")
      Button(name="metronome")
      Button(name="loop", content="Loop")
</template>

<style lang="postcss">
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
