<script lang="ts">
  export let name: string;
  export let visual: string;
  export let content: string = "";
  let id = name + "-button";
  let fn_name = "pressed_" + id + "()";
  let visual_classname = "c-button--" + visual;
  let rcon_id = "#o-rcon-" + name;
</script>

<template lang="pug">
  .c-button.-base
    button(class = "{visual_classname}", {id}) {content}
      +if('!content')
        .o-rcon
          svg(viewBox="0 0 100 100")
            use(xlink:href = "{rcon_id}")
</template>

<style lang="postcss">
  .c-button {
    $self: &;
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & button {
      border: 0;
    }

    & .o-rcon {
      z-index: 1;
      margin: auto;
      position: relative;
      top: 30%;
      width: 40%;
      height: 40%;
    }

    &--skeuomorphic {
      $size: 80%;
      $margin: (100% - 80%) / 2;
      $color: black;

      width: $size;
      height: $size;
      border-radius: 15%;
      /* background: $color-screen-display; */
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
  }
</style>
