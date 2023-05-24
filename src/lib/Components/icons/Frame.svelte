<template lang="pug">
  - var headsize = 48;
  - var double = headsize * 2;
  - var length = 512 - double;
  symbol#o-icon-frame(viewBox="0 0 512 512")
    path(
      d="M" + headsize + "," + double + "h" + length + "M" + headsize + "," + length + "h" + length + "M" + double + "," + headsize + "v" + length + "M" + length + "," + headsize + "v" + length
      stroke-width="32"
      stroke-linecap="round"
      stroke="black"
    )
</template>
