<template lang="pug">
  - var s = 32;
  - var hs = s/2;
  - var hw = 128;

  symbol#o-icon-marker(viewBox="0 0 512 512")
    - var x1 = 256-hw+hs;
    - var x2 = 256+hw-hs;
    - var y1 = hs;
    - var y2 = 256-4*8;
    - var y3 = 256+4*8;
    g
      line(x1=x1 x2=x2 y1=y1 y2=y1 stroke-width=s stroke-linecap="round")/
      line(x1=x2 x2=x2 y1=y1 y2=y2 stroke-width=s stroke-linecap="round")/
      line(x1=x1 x2=x1 y1=y1 y2=y2 stroke-width=s stroke-linecap="round")/
      line(x1=x1 x2="50%" y1=y2 y2=y3 stroke-width=s stroke-linecap="round")/
      line(x1=x2 x2="50%" y1=y2 y2=y3 stroke-width=s stroke-linecap="round")/
      line(x1="50%" x2="50%" y1=y3+hs y2=512-hs stroke-width=s stroke-linecap="round")/
    path(stroke-width=s fill="none"
      d="M208,194 v-112 h36 M256,80 v112 M304,192 v-112 h-36"
    )/
</template>

<style lang="postcss">
  #o-icon-marker {
    stroke: black;
  }
</style>
