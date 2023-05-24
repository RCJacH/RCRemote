<script lang="ts">
  import ButtonBase from "./SettingsButton.svelte";
  import Button from "@components/Button.svelte";
  import { response, addCommand } from "@scripts/requests";
  import { commandID } from "@scripts/constants";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  let posUnits = ["beat", "measure", "marker"];
  let posUnitIndex = 0;
  $: posName = posUnits[posUnitIndex];
  $: dispatch("posNameChange", posName);
  function cyclePositionUnit(i?: number) {
    i ||= posUnitIndex;
    posUnitIndex = (i + 1) % posUnits.length;
  }

  let rangeUnits = ["hide", "marker", "region"];
  let rangeUnitIndex = 0;
  $: rangeName = rangeUnits[rangeUnitIndex];
  $: dispatch("rangeNameChange", rangeName);
  function cycleRangeUnit(i?: number) {
    i ||= rangeUnitIndex;
    rangeUnitIndex = (i + 1) % rangeUnits.length;
  }
  onMount(() => {
    cyclePositionUnit();
    cycleRangeUnit();
  });

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
        iconname!="{posName+'unit'}",
        on:click!="{() => cyclePositionUnit()}"
        baseless
      )
      Button#menu(baseless)
      Button#display-range(
        iconname!="{rangeName+'range'}",
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
