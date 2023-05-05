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
