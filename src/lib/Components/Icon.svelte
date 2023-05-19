<!-- Icon.svelte -->
<script>
  import Abort from "./icons/Abort.svelte";
  import Beat from "./icons/Beat.svelte";
  import FForward from "./icons/FForward.svelte";
  import Loop from "./icons/Loop.svelte";
  import Measure from "./icons/Measure.svelte";
  import Menu from "./icons/Menu.svelte";
  import Pause from "./icons/Pause.svelte";
  import Play from "./icons/Play.svelte";
  import Record from "./icons/Record.svelte";
  import Redo from "./icons/Redo.svelte";
  import Rewind from "./icons/Rewind.svelte";
  import Save from "./icons/Save.svelte";
  import Stop from "./icons/Stop.svelte";
  import Undo from "./icons/Undo.svelte";
</script>

<template lang="pug">
  svg(display="None")
    defs
      Abort
      FForward
      Loop
      Measure
      Menu
      Pause
      Play
      Record
      Redo
      Rewind
      Save
      Stop
      Undo
</template>

<style lang="postcss" global>
  .o-icon {
    z-index: 1;
    margin: auto;
    width: 40%;
    height: 40%;
  }
</style>
