<script lang="ts">
  import Button from "./PlaybackButton.svelte";
  import { commandID } from "../../constants";
  import { response, addCommand } from "../../../scripts/requests";

  export let state = -1;

  let allowPause = false;
  let undostate = 0;
  $: activatePlay = state >= 0 && state&1;
  $: activatePause = state >= 0 && state&2;
  $: activateRecord = state >= 0 && state&4;

  function triggerPlay() {
    addCommand(commandID.transport.play);
  }
  function triggerPause() {
    addCommand(commandID.transport.pause);
  }
  function triggerRecord() {
    addCommand(commandID.transport.record);
  }
  function triggerStop() {
    addCommand(commandID.transport.stop);
  }
  function triggerSave() {
    addCommand(commandID.project.save);
  }
  function triggerUndo() {
    addCommand(commandID.project.undo);
    undostate = 1;
  }
  function triggerRedo() {
    addCommand(commandID.project.redo);
    undostate = 0;
  }
</script>

<template lang="pug">
  #playback
    +if('state <= 0 || !allowPause')
      Button#play(
        active="{activatePlay}"
        on:click!="{triggerPlay}"
      )
      +elseif('state > 0 && allowPause')
        Button#pause(
          active="{activatePause}"
          on:click!="{triggerPause}"
        )
    Button#record(
      active="{activateRecord}"
      on:click!="{triggerRecord}"
    )
    +if('state > 0')
      Button#stop(on:click!="{triggerStop}")
      +else()
        Button#save(on:click!="{triggerSave}")
    +if('activateRecord')
      Button#abort()
      +elseif('undostate == 1')
        Button#redo(on:click!="{triggerRedo}")
      +else()
        Button#undo(on:click!="{triggerUndo}")
</template>

<style lang="postcss">
  #playback {
    display: flex;
    flex-wrap: wrap;
    flex: 6;
    justify-content: stretch;
    align-items: stretch;

    :global(& .c-button) {
      flex-basis: 50%;
      height: 50%;

      @media screen and (orientation: landscape) {
        flex-basis: 25%;
      }
    }
  }
</style>
