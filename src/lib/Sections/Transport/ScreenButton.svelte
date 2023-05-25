<script lang="ts">
  import Button from "~components/Button.svelte";
  let name;
  export { name as id };
</script>

<template lang="pug">
  Button.c-button--screen(
    id="{name}",
    on:click
  )
</template>

<style lang="postcss" global>
  .c-button--screen {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: transparent;
    flex: 1;
    opacity: 0;
    transition: opacity 50ms ease-out;
    border: none;

    &:hover {
      opacity: 0.4;
    }
    &:active {
      opacity: 0.8;
    }
  }
</style>
