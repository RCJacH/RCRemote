<script lang="ts">
  import Button from "~components/Button.svelte";
</script>

<template lang="pug">
  Button(
    baseclass="-multi"
  )
    slot
</template>

<style lang="postcss" global>
  $transition-timing: 100ms cubic-bezier(0.3, 1.05, 0.6, 1.15);
  $radius-end: 6rem;
  $radius: 0.25em;

  .c-button.-base.-multi {
    flex: 1 1 auto;
    flex-direction: row;
    height: auto;

    & button {
      width: 100%;
      height: 90%;
      transition: all 150ms easeOutQuart;
      border: 0.0625em solid var(--color-button_dark-border);
      border-radius: $radius;
      background-color: var(--color-button_dark-bg);
      filter: brightness(101%);
      z-index: 100;

      &::before {
        content: "";
        transition: all 150ms easeOutQuart;
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: $radius;

        box-shadow: -0.09375em -0.09375em 0.375em rgba(255, 255, 255, 0.83),
          0 0.25em 0.25em hsla(217, 5%, 81%, 1),
          0.125em 0.25em 0.375em rgba(0, 0, 0, 0.3),
          0.46875em 0.625em 1.09375em rgba(0, 0, 0, 0.1),
          inset -0.0625em -0.0625em 0.0625em rgba(0, 0, 0, 0.1),
          inset 0.0625em 0.0625em 0.25em rgba(255, 255, 255, 0.2);

        top: 0%;
        left: 0%;
      }

      &:active,
      &.-active {
        transform: translate(0, 5%);
        filter: none;
        z-index: 99;
        border-color: rgba(0, 0, 0, 0);
        &::before {
          box-shadow: none;
        }
      }

      &:active {
        box-shadow: inset -0.0625em -0.0625em 0.3125em rgba(255, 255, 255, 0.1),
          inset 0.0625em 0.0625em 0.125em rgba(0, 0, 0, 0.5);
      }

      &.-active {
        box-shadow: inset -0.03125em -0.03125em 0.15625em
            rgba(255, 255, 255, 0.1),
          inset 0.0625em 0.0625em 0.125em rgba(0, 0, 0, 0.25);
      }

      &:first-child,
      &:first-child::before {
        border-radius: $radius-end $radius $radius $radius-end;
      }
      &:last-child,
      &:last-child::before {
        border-radius: $radius $radius-end $radius-end $radius;
      }
      & .o-icon {
        stroke: var(--color-button_dark-icon);
        fill: var(--color-button_dark-icon);
      }
    }
  }
</style>
