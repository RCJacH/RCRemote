<template lang="pug">
  - var psize = 128;
  - var px = (512 - psize) / 2;
  symbol#o-icon-regionrange(viewBox="0 0 512 512")
    use(xlink:href="#o-icon-region" y="-25%")
    text(x="50%" y="25%") Region
    use(xlink:href="#o-icon-play" x=px y="25%" width=psize fill="black")/
</template>

<style lang="postcss">
  #o-icon-regionrange {
    & text {
      text-anchor: middle;
      dominant-baseline: middle;
      font: bold 128px sans-serif;
      fill: lightgray;
    }
  }
</style>
