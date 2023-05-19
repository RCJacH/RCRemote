<script lang="ts">
  import Button from "../../Components/Button.svelte";
  let name;
  export { name as id };
  let clazz = "";
  export { clazz as class };
</script>

<template lang="pug">
  Button(
    id="{name}",
    class!="{'c-button--screen' + (clazz ? ' ' + clazz : '')}",
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

    &:hover {
      opacity: 0.4;
    }
    &:active {
      opacity: 0.8;
    }
  }
</style>
