interface CommandIDs {
  [key: string]: any;
}

export const commandID: CommandIDs = {
  toggle: {
    loop: 1068,
    preroll: 41819,
    metronome: 40364,
  },
  transport: {
    play: 1007,
    record: 1013,
    stop: 40667,
    abort: 40668,
    rewind: {
      beat: 41045,
      measure: 41043,
      marker: 40172,
    },
    fforward: {
      beat: 41044,
      measure: 41042,
      marker: 40173,
    },
  },
  project: {
    save: 40026,
    undo: 40029,
    redo: 40030,
  },
}
