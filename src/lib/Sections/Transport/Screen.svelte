<script lang="ts">
  import Button from "./ScreenButton.svelte";
  import { commandID } from "~scripts/constants";
  import { addCommand } from "~scripts/requests";

  export let state: number;
  export let position: string;
  export let posName: string;
  export let rangeName: string;

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

  function triggerRewind() {
    addCommand(commandID.transport.rewind[posName]);
  }

  function triggerFForward() {
    addCommand(commandID.transport.fforward[posName]);
  }
</script>

<template lang="pug">
  .c-screen
    Button#rewind(on:click="{triggerRewind}")
    .c-screen__info
      #status {statusText(state)}
      #position {position}
    Button#fforward(on:click="{triggerFForward}")
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
    font-family: Inconsolata, monospace;
    text-transform: uppercase;
    position: relative;
    text-shadow: 0 0 0.25em rgba(255, 255, 255, 0.5);
    background: var(--color-screen);
    color: var(--color-screen-text);
    border: 0.3vw solid var(--color-button_dark-bg);
    border-bottom: none;
    border-radius: 0.25em;
    box-shadow: inset -0.0625em -0.0625em 0.0625em rgba(255, 255, 255, 0.1),
      inset 0.0625em 0.0625em 0.25em rgba(255, 255, 255, 0.2);
    z-index: 100;

    &__info {
      display: flex;
      flex: 5;
      flex-direction: column;
      align-items: center;
      padding: 5% 0;
    }
  }
</style>
