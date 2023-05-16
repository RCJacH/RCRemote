<script lang="ts">
  import Button from "../../Components/Button.svelte";
  import { commandID } from "../../constants";
  const visual_style = "skeuomorphic";

  export let playstate = -1;
  let undostate = 0;
  let allowPause = false;
  let activatePlay = playstate >= 0 && playstate&1;
  let activatePause = playstate >= 0 && playstate&2;
  let activateRecord = playstate >= 0 && playstate&4;

  function triggerUndo() {
    console.log('triggered undo');
    undostate = 1;
  }
  function triggerRedo() {
    console.log('triggered redo');
    undostate = 0;
  }
</script>

<template lang="pug">
  #playback
    +if('playstate <= 0 || !allowPause')
      Button(visual="{visual_style}", name="play", active="{activatePlay}")
      +elseif('playstate > 0 && allowPause')
        Button(visual="{visual_style}", name="pause", active="{activatePause}")
    Button(visual="{visual_style}", name="record", active="{activateRecord}")
    +if('playstate > 0')
      Button(visual="{visual_style}", name="stop")
      +else()
        Button(visual="{visual_style}", name="save")
    +if('activateRecord')
      Button(visual="{visual_style}", name="abort")
      +elseif('undostate == 1')
        Button(visual="{visual_style}", name="redo", on:click!="{(e) => triggerRedo()}")
      +else()
        Button(visual="{visual_style}", name="undo", on:click!="{(e) => triggerUndo()}")
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
