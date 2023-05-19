<script lang="ts">
  export let name: string;
  export let content: string = "";
  let clazz = "";
  export { clazz as class };
</script>

<template lang="pug">
  .c-button.-base
    slot
      button(class="{clazz}", id!="{name+'-button'}", on:click) {content}
        +if('!content')
          svg.o-icon(viewBox="0 0 100 100")
            use(xlink:href!="{'#o-icon-'+name}")
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
      border: 0;
    }

    & .o-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      margin: auto;
      /* top: 30%; */
      width: 40%;
      height: 40%;
    }
  }
</style>
