<template lang="pug">
  symbol#o-icon-rewind(viewBox="0 0 512 512")
    use(xlink:href="#o-icon-fforward" transform="rotate(180 256 256)")/
</template>

<style lang="postcss" global>
  #rewind-button {
    fill: var(--color-positional);
  }
</style>
