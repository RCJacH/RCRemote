<script lang="ts">
  import Button from "./Components/Button.svelte";
  export let page: string;

  const btn_setting_visual = "multi";
  const btn_playback_visual = "skeuomorphic";
</script>

<template lang="pug">
  div#transport
    .c-screen
      #position.c-screen__info Initializing...
    #settings
      .position
        Button(visual="{btn_setting_visual}", name="position_unit", content="Bar")
        Button(visual="{btn_setting_visual}", name="rewind")
        Button(visual="{btn_setting_visual}", name="fforward")
        Button(visual="{btn_setting_visual}", name="goto", content="GoTo")
      .options
        Button(visual="{btn_setting_visual}", name="loop", content="Loop")
        Button(visual="{btn_setting_visual}", name="menu", content="Menu")
        Button(visual="{btn_setting_visual}", name="preroll", content="Preroll")
    #playback
      Button(visual="{btn_playback_visual}", name="play")
      Button(visual="{btn_playback_visual}", name="pause")
      Button(visual="{btn_playback_visual}", name="record")
      Button(visual="{btn_playback_visual}", name="stop")
      Button(visual="{btn_playback_visual}", name="abort")
      Button(visual="{btn_playback_visual}", name="undo")
</template>
