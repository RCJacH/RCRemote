<!-- Icon.svelte -->
<script>
  import Abort from "./icons/Abort.svelte";
  import BeatUnit from "./icons/BeatUnit.svelte";
  import FForward from "./icons/FForward.svelte";
  import Frame from "./icons/Frame.svelte";
  import Grid from "./icons/Grid.svelte";
  import HideRange from "./icons/HideRange.svelte";
  import Loop from "./icons/Loop.svelte";
  import Marker from "./icons/Marker.svelte";
  import MarkerUnit from "./icons/MarkerUnit.svelte";
  import MarkerRange from "./icons/MarkerRange.svelte";
  import MeasureUnit from "./icons/MeasureUnit.svelte";
  import Menu from "./icons/Menu.svelte";
  import Metronome from "./icons/Metronome.svelte";
  import MoveEdit from "./icons/MoveEdit.svelte";
  import NoteHeads from "./icons/NoteHeads.svelte";
  import Pause from "./icons/Pause.svelte";
  import Play from "./icons/Play.svelte";
  import Preroll from "./icons/Preroll.svelte";
  import QuarterNote from "./icons/QuarterNote.svelte";
  import Record from "./icons/Record.svelte";
  import Redo from "./icons/Redo.svelte";
  import Region from "./icons/Region.svelte";
  import RegionRange from "./icons/RegionRange.svelte";
  import Rewind from "./icons/Rewind.svelte";
  import Save from "./icons/Save.svelte";
  import Stop from "./icons/Stop.svelte";
  import Triangle from "./icons/Triangle.svelte";
  import Undo from "./icons/Undo.svelte";
  import WholeNote from "./icons/WholeNote.svelte";
</script>

<template lang="pug">
  svg(display="None")
    defs
      Abort
      BeatUnit
      FForward
      Frame
      Grid
      HideRange
      Loop
      Marker
      MarkerUnit
      MarkerRange
      MeasureUnit
      Menu
      Metronome
      MoveEdit
      NoteHeads
      Pause
      Play
      Preroll
      QuarterNote
      Record
      Redo
      Region
      RegionRange
      Rewind
      Save
      Stop
      Triangle
      Undo
      WholeNote
</template>

<style lang="postcss" global>
  .o-icon {
    z-index: 1;
    margin: auto;
    width: 40%;
    height: 40%;
  }
</style>
