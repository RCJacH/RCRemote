<template lang="pug">
  - var stroke = 32;
  - var r = 256 - stroke * 2;
  - var pi = 3.1415926;
  symbol#o-icon-preroll(viewBox="0 0 512 512")
    circle(cx="256" cy="256" r=r stroke-width=stroke fill="none")/
    - var innerr = r * 0.75;
    - var circumference = 2 * pi * innerr;
    - var dash = circumference * 0.01;
    - var gap = circumference / 12 - dash;
    circle(cx="256" cy="256" r=innerr fill="none"
      stroke-width=stroke
      stroke-dasharray=dash + " " + gap
      stroke-dashoffset=dash / 2
      )/
    - var s = r - stroke / 2;
    - var r = s / 2;
    circle.play(cx="256" cy="256" r=r fill="none"
      stroke-width=s
      stroke-dasharray="96 630"
      stroke-dashoffset="408"
      )/
    - var recrOuter = 112;
    - var recrInner = 48;
    - var recx = 512 - recrOuter;
    - var recy = 512 - recrOuter - stroke;
    g.record
      circle(cx=recx cy=recy r=recrOuter stroke-width=8)/
      circle(cx=recx cy=recy r=recrInner stroke-width=24)/
</template>

<style lang="postcss">
  #o-icon-preroll {
    stroke: black;
    & .play {
      stroke: var(--color-play-button);
    }
    & .record {
      stroke: white;
      fill: var(--color-record-button);
    }
  }
</style>
