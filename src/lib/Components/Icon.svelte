<!-- Icon.svelte -->
<script>
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
      Pause
      Play
      Record
      Redo
      Save
      Stop
      Undo
</template>
