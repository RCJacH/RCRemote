<template lang="pug">
  - var psize = 256;
  - var px = (512 - psize) / 2;
  - var py = 512 - psize * 1.5;
  - var sw = 32;
  - var h = sw*3;
  - var hsw = sw * 0.5;
  - var edge = 512 - hsw;
  symbol#o-icon-hiderange(viewBox="0 0 512 512")
    polyline(
      points=`${hsw},${(edge-h)} ${hsw},${edge} ${edge},${edge} ${edge},${(edge-h)}`
      fill="none"
      stroke="black"
      stroke-width=sw
      stroke-dasharray=24
      stroke-dashoffset=12
    )
    use(xlink:href="#o-icon-play" x=px y=py width=psize height=psize)
</template>
