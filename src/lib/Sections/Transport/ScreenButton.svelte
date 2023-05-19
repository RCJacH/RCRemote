<script lang="ts">
  import Button from "../../Components/Button.svelte";
  export let name: string;
</script>

<template lang="pug">
  Button.c-button--screen({name})
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

    &:hover {
      opacity: 0.4;
    }
    &:active {
      opacity: 0.8;
    }
  }
</style>
