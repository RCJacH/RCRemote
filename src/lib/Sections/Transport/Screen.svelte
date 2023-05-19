<script lang="ts">
  import Button from "./ScreenButton.svelte";
  export let status = 1;
  export let position = "12.2";
  function statusText(index: number): string {
    switch (index) {
      case -1:
        return "initializing...";
      case 0:
        return "stopped: ";
      case 1:
        return "playing: ";
      case 2:
        return "paused: ";
      case 5:
        return "recording: ";
      case 6:
        return "recpaused: ";
      default:
        return "";
    }
  }
</script>

<template lang="pug">
  .c-screen
    Button#rewind
    .c-screen__info
      #status {statusText(status)}
      #position {position}
    Button#fforward
</template>

<style lang="postcss">
  .c-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 15%;
    min-height: 75px;
    max-height: 150px;
    font-size: 4vh;
    font-weight: 600;
    text-transform: uppercase;
    background: var(--color-screen);
    color: var(--color-screen-text);
    z-index: 100;

    &__info {
      display: flex;
      flex: 3;
      flex-direction: column;
      align-items: center;
      padding: 5% 0;
    }
  }
</style>
