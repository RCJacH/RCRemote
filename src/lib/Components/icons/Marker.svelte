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
    path(
      stroke-width=s
      fill="None"
      d=`M${x1},${y1} H${x2} V${y2} L256,${y3} L${x1},${y2}z M256,${(y3+hs)} V${(512-hs)}`
    )
    //- path(stroke-width=s fill="none"
    //-   d="M208,194 v-112 h36 M256,80 v112 M304,192 v-112 h-36"
    //- )/
</template>

<style lang="postcss">
  #o-icon-marker {
    stroke: black;
  }
</style>
