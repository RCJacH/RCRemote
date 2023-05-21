<template lang="pug">
  - var size = 128;
  - var length = 512 - size;
  - var center = length / 2;
  symbol#o-icon-moveedit(viewBox="0 0 512 512")
    use(xlink:href="#o-icon-triangle" x=length y=center width=size height=size transform="rotate(180 256 256)")
    use(xlink:href="#o-icon-triangle" x=length y=center width=size height=size)
</template>
