<script lang="ts">
  import Button from "../../Components/Button.svelte";
  export let status = -1;
  export let position = "";
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
    Button(visual="screen", name="rewind")
    .c-screen__info {statusText(status) + position}
    Button(visual="screen", name="fforward")
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
      flex: 3;
      flex-direction: column;
      padding: 5% 0;
    }
  }
</style>
