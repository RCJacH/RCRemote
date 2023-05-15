<template lang="pug">
  symbol#o-icon-record(viewBox="0 0 512 512")
    circle(cx="256" cy="256" r="168" stroke-width="164" fill="none")/
</template>

<style lang="postcss" global>
  #record-button {
    $color: #dc143c;
    & .o-icon {
      stroke: $color;
    }
    &:active .o-icon {
      filter: brightness(105%);
    }
    &.-active .o-icon {
      filter: brightness(115%);
    }
  }
</style>
