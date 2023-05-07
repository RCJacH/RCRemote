<script lang="ts">
  import Button from "../Components/Button.svelte";
  import { commandID } from "../constants";
  const visual_style = "skeuomorphic";

  export let playstate = -1;
  let undostate = 0;
</script>

<template lang="pug">
  #playback
    +if('playstate <= 0')
      Button(visual="{visual_style}", name="play")
    +if('playstate > 0')
      Button(visual="{visual_style}", name="pause")
    Button(visual="{visual_style}", name="record")
    +if('playstate > 0')
      Button(visual="{visual_style}", name="stop")
      +else()
        Button(visual="{visual_style}", name="save")
    +if('undostate == -1')
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
    flex-direction: row;
    :global(.c-button) {
      max-width: 50%;
      min-width: 35%;
    }
  }
</style>
