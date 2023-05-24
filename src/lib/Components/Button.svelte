<script lang="ts">
  let name: string;
  export { name as id };
  export let content: string = "";
  export let iconname = "";
  let clazz = "";
  export { clazz as class };
  export let active = false;
  export let baseless = false;
</script>

<template lang="pug">
  mixin clickable
    button(
      class!="{clazz + (active ? ' -active' : '')}",
      id!="{name+'-button'}",
      on:click
    ) {content}
        +if('!content')
          svg.o-icon(viewBox="0 0 100 100")
            use(xlink:href!="{'#o-icon-'+(iconname? iconname : name)}")

  +if('baseless')
    +clickable
    +else
      .c-button.-base
        slot
          +clickable
</template>

<style lang="postcss">
  .c-button {
    $self: &;
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;

    & button {
      cursor: pointer;
    }

    &.-base {
      background-color: transparent;
    }
  }
</style>
