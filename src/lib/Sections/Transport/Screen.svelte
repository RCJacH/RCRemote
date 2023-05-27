<script lang="ts">
  import Button from "./ScreenButton.svelte";
  import Range from "./Screen.Range.svelte";
  import { commandID } from "~scripts/constants";
  import { project, addCommand } from "~scripts/requests";

  $: position = `${$project.transport.measure}.${(
    Math.round($project.transport.beat * 100) * 0.01 +
    1
  ).toFixed(2)}`;

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

  export let posName: string;
  export let rangeName: string;
</script>

<template lang="pug">
  .c-screen
    Button#rewind(on:click="{triggerRewind}")
    .c-screen__info
      #status {statusText($project.transport.state)}
      #position {position}
      Range({rangeName})
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
      flex: 3;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      height: 100%;
    }
  }
</style>
