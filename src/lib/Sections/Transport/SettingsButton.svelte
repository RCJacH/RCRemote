<script lang="ts">
  import Button from "../../Components/Button.svelte";
  export let name: string;
  export let content: string;
</script>

<template lang="pug">
  Button.c-button--multi({name}, {content})
</template>

<style lang="postcss" global>
  $transition-timing: 100ms cubic-bezier(0.3, 1.05, 0.6, 1.15);

  .c-button--multi {
    width: 100%;
    height: 100%;
    cursor: pointer;

    &:first-child {
      border-radius: var(--button-border-radius) 0 0 var(--button-border-radius);
    }
    &:last-child {
      border-radius: 0 var(--button-border-radius) var(--button-border-radius) 0;
    }

    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: auto;
      transform: translateZ(-1px);
      border-radius: inherit;
      transition: opacity $transition-timing;
      background-color: var(--color-panel);
    }

    &:before {
      background: linear-gradient(
        135deg,
        var(--color-panel),
        rgba(0, 0, 0, 0.1)
      );
      box-shadow: -0.375rem -0.375rem 0.625rem white,
        0.25rem 0.25rem 0.938rem rgba(0, 0, 0, 0.5);
      opacity: 0.8;
    }

    &:after {
      background: linear-gradient(
        135deg,
        var(--color-panel),
        rgba(0, 0, 0, 0.05)
      );
      box-shadow: inset 0.125rem 0.125rem 0.313rem rgba(0, 0, 0, 0.15),
        inset -0.125rem -0.125rem 0.313rem rgba(255, 255, 255, 0.2);
      opacity: 0;
    }
    &:active {
      transform: translate(0, 0.15rem);
      transition: transform $transition-timing;
      &:before {
        opacity: 0;
      }
      &:after {
        opacity: 0.3;
      }
    }
  }
</style>
