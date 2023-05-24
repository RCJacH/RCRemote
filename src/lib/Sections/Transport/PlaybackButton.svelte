<script lang="ts">
  import Button from "@components/Button.svelte";
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
    $margin: (100% - 80%) / 2;
    $color: black;

    width: $size;
    height: $size;
    border-radius: 15%;
    fill: $color;
    transition: all 100ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0px -0.375rem 0.625rem white,
      0px 0.25rem 0.938rem rgba(0, 0, 0, 0.15);
    cursor: pointer;
    &:active {
      box-shadow: 0 0.938rem 1.25rem rgba(0, 0, 0, 0.02);
      transform: translate(0, 5%);
      &:after {
        content: "";
        box-shadow: inset 0px -0.125rem 0.313rem white,
          inset 0px 0.125rem 0.313rem rgba(0, 0, 0, 0.15);
      }
    }
  }
</style>
