<script lang="ts">
  import Button from "../Components/Button.svelte";
  import { commandID } from "../constants";
  const visual_style = "skeuomorphic";

  export let playstate = -1;
  let undostate = 0;
  let allowPause = false;
</script>

<template lang="pug">
  #playback
    +if('playstate <= 0 || !allowPause')
      Button(visual="{visual_style}", name="play")
      +elseif('playstate > 0 && allowPause')
        Button(visual="{visual_style}", name="pause")
    Button(visual="{visual_style}", name="record")
    +if('playstate > 0')
      Button(visual="{visual_style}", name="stop")
      +else()
        Button(visual="{visual_style}", name="save")
    +if('playstate==3')
      Button(visual="{visual_style}", name="abort")
      +elseif('undostate == 1')
        Button(visual="{visual_style}", name="redo")
      +else()
        Button(visual="{visual_style}", name="undo")
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
