<script lang="ts">
  import { commandID } from "~scripts/constants";
  import { project, addCommand } from "~scripts/project";
  import type { Project, Marker, Region } from "~scripts/project/constructor";

  let prev: Marker | Region | undefined;
  let curr: Marker | Region | undefined;
  let next: Marker | Region | undefined;
  let curSecond: number;
  let curPct = 0.5;
  let prevColor = "";
  let currColor = "";
  let nextColor = "";

  function calcRangeMarker(range: Marker[]): void {
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

  function calcRangeRegion(range: Region[]): void {
    let region = range.findLast(
      (x) => x.start < curSecond && x.end > curSecond
    );
    if (region) {
      prev = curr = next = region;
      curPct = (curSecond - curr.start) / (curr.end - curr.start);
    } else {
      prev = range.findLast((x) => x.end <= curSecond);
      next = range.find((x) => x.start >= curSecond);
      if (!next) {
        curPct = 0.5;
        return;
      }
      if (!prev) {
        curPct = curSecond / next.start;
        return;
      }
      curPct = (curSecond - prev.end) / (next.start - prev.end);
    }
  }

  function updateRange(proj: Project): void {
    if (rangeName === "hide") return;
    curSecond = proj.transport.seconds;
    let range = proj[rangeName];
    if (!range) {
      return;
    } else if (rangeName === "marker") {
      calcRangeMarker(range);
    } else if (rangeName === "region") {
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

  mixin regions
    +if('prev == next')
      .current(
        style!="{currColor}"
      ) {curr.name}
      +else
        +if('prev')
          .prev(
            style!="{prevColor}"
          )
        .placeholder
        +if('next')
          .next(
            style!="{nextColor}"
          )
    +cursor()

  .c-screen__range(class!="{rangeName ? `-${rangeName}` : ''}")
    +if("rangeName === 'marker'")
      +markers()
    +if("rangeName === 'region'")
      +regions()
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
    }

    .o-icon {
      position: absolute;
      stroke: var(--color);
      margin: 0;
    }

    &.-marker .o-icon {
      width: 6%;
      height: 60%;
    }

    &.-region {
      font-size: 0.4em;
      & .current {
        width: 100%;
        height: 36%;
        border: 0.1em solid var(--color-screen-text);
        border-radius: 2em;
        background-color: var(--color);
        color: var(--color-screen-text);
      }
      & .prev {
        width: 4%;
        height: 36%;
        border: 0.1em solid var(--color-screen-text);
        border-radius: 0 2em 2em 0;
        border-left: transparent;
        background-color: var(--color);
        color: var(--color-screen-text);
      }
      & .next {
        width: 4%;
        height: 36%;
        border: 0.1em solid var(--color-screen-text);
        border-radius: 2em 0 0 2em;
        border-right: transparent;
        background-color: var(--color);
        color: var(--color-screen-text);
      }
    }
    .cursor .o-icon {
      left: var(--position);
      width: 4%;
      margin: 0 1%;
      height: 40%;
      fill: var(--color-play-button);
    }
  }
</style>
