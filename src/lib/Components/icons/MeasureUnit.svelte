<template lang="pug">
  - var size = 50;
  - var margin = (100 - size) / 2 + "%";
  symbol#o-icon-measureunit(viewBox="0 0 512 512")
    use(xlink:href="#o-icon-moveedit")
    use(xlink:href="#o-icon-notehead-whole" x=margin y=margin width=size+"%" height=size + "%")
</template>
