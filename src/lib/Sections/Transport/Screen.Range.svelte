<script lang="ts">
  import { commandID } from "~scripts/constants";
  import { project, addCommand } from "~scripts/requests";

  let prev;
  let curr;
  let next;
  let curPct = 0.5;
  let prevColor = "";
  let currColor = "";
  let nextColor = "";
  $: curSecond = $project.transport.seconds;

  function calcRangeMarker(range) {
    prev = range.findLast((x) => x.position < curSecond);
    curr = range.find((x) => x.position == curSecond);
    next = range.find((x) => x.position > curSecond);
    if (curr && !prev) {
      prev = curr;
      curr = null;
    } else if (curr && !next) {
      next = curr;
      curr = null;
    }
    curPct =
      curr || !next
        ? 0.5
        : !prev
        ? curSecond / next.position
        : (curSecond - prev.position) / (next.position - prev.position);
  }

  function calcRangeRegion(range) {}

  function updateRange(proj) {
    if (rangeName === "hide") return;
    let range = proj[rangeName];
    if (!range) {
      return;
    } else if (rangeName === "marker") {
      calcRangeMarker(range);
    } else if (rangeName === "range") {
      calcRangeRegion(range);
    }
  }
  $: {
    updateRange($project);
    prevColor = prev
      ? `--color: rgb(${prev.color.r}, ${prev.color.g}, ${prev.color.b});`
      : "";
    currColor = curr
      ? `--color: rgb(${curr.color.r}, ${curr.color.g}, ${curr.color.b});`
      : "";
    nextColor = next
      ? `--color: rgb(${next.color.r}, ${next.color.g}, ${next.color.b});`
      : "";
  }

  export let rangeName: string;
</script>

<template lang="pug">
  mixin cursor
    .cursor(
      style!="{`--position: ${curPct * 94}%`}"
    )
      svg.o-icon
        use(xlink:href="#o-icon-location")

  mixin markers
    .prev
      +if('prev')
        svg.o-icon(
          style!="{prevColor}"
        )
          use(xlink:href!="{`#o-icon-${rangeName}`}")
    .current
      +if('curr')
        svg.o-icon(
            style!="{currColor}"
          )
            use(xlink:href!="{`#o-icon-${rangeName}`}")
    .next
      +if('next')
        svg.o-icon(
            style!="{nextColor}"
          )
          use(xlink:href!="{`#o-icon-${rangeName}`}")
    +cursor()


  .c-screen__range
    +if("rangeName === 'marker'")
      +markers()
</template>

<style lang="postcss">
  .c-screen__range {
    position: absolute;
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    bottom: 5%;
    left: 0;
    font-size: 0.5em;
    font-weight: 100;
    overflow: hidden;

    & div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
    }
    & .next {
      justify-content: flex-end;
    }
    & .current {
      justify-content: center;
    }
    & .cursor {
      position: absolute;
      left: var(--position);
    }
    .o-icon {
      position: absolute;
      stroke: var(--color);
      margin: 0;
      width: 6%;
      height: 60%;
    }
    .cursor .o-icon {
      width: 4%;
      margin: 0 1%;
      height: 40%;
      fill: var(--color-play-button);
    }
  }
</style>
