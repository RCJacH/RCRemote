<script lang="ts">
  import Button from "~components/Button.svelte";
  export let active: boolean = false;
  export let id: string;
</script>

<template lang="pug">
  Button.c-button--skeuomorphic(
    {id},
    {active},
    on:click
  )
</template>

<style lang="postcss" global>
  .c-button--skeuomorphic {
    $size: 80%;

    width: $size;
    height: $size;
    border-radius: 15%;
    background-color: var(--color-button_light-bg);
    filter: brightness(101%);
    border: 0 solid var(--color-button_light-border);
    transition: all 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: -0.375em -0.375em 1.625em rgba(255, 255, 255, 0.83),
      0.3125em 0.625em 0.9375em rgba(0, 0, 0, 0.05),
      0.9375em 1.25em 2.1875em rgba(0, 0, 0, 0.1),
      inset -0.125em -0.125em 0.125em rgba(0, 0, 0, 0.1),
      inset -0.0625em -0.0625em 0.1875em rgba(255, 255, 255, 0.6),
      inset 0.125em 0.125em 0.5em rgba(255, 255, 255, 0.2),
      inset 0.0625em 0.0625em 0.5em rgba(255, 255, 255, 0.2),
      -0.375em -0.375em 1.625em rgba(255, 255, 255, 0.8);
    &:active {
      box-shadow: none;
      border-width: 0.0625rem;
      transform: translate(0, 5%);
      filter: none;
    }
    & .o-icon {
      fill: var(--color-button_light-icon);
      stroke: var(--color-button_light-icon);
    }
  }
</style>
