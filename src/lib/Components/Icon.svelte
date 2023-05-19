<!-- Icon.svelte -->
<script>
  import Rewind from "./icons/Rewind.svelte";
  import FForward from "./icons/FForward.svelte";
  import Save from "./icons/Save.svelte";
  import Abort from "./icons/Abort.svelte";
  import Pause from "./icons/Pause.svelte";
  import Play from "./icons/Play.svelte";
  import Record from "./icons/Record.svelte";
  import Redo from "./icons/Redo.svelte";
  import Stop from "./icons/Stop.svelte";
  import Undo from "./icons/Undo.svelte";
</script>

<template lang="pug">
  svg(display="None")
    defs
      Abort
      FForward
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
