<!-- Icon.svelte -->
<script>
  import Abort from "./icons/Abort.svelte";
  import Pause from "./icons/Pause.svelte";
  import Play from "./icons/Play.svelte";
  import Record from "./icons/Record.svelte";
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
      Stop
      Undo
</template>
