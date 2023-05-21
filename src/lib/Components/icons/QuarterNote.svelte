<template lang="pug">
  - var sw = 48;
  - var hsw = sw / 2;
  - var scale = 0.45;
  - var mx = -512 - 512 * (1 - scale)
  - var my = 512 + scale * 256;
  symbol#o-icon-quarternote(viewBox="0 0 512 512")
    use(xlink:href="#o-icon-notehead-filled" transform="scale(-" + scale + ", " + scale +") translate(" + mx + ", " + my + ")")/
    path(d="M336,384 V0" stroke-width="48")/
</template>

<style lang="postcss">
  #o-icon-quarternote {
    stroke: black;
  }
</style>
