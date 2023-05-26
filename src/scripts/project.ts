interface CommandState {
  id: string;
  state: boolean;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface Marker {
  id: number;
  name: string;
  position: number;
  color: RGB;
}

interface Region {
  id: number;
  name: string;
  start: number;
  end: number;
  color: RGB;
}

interface Transport {
  state: number;
  position?: Position;
}

interface Position {
  seconds: number;
  fullBeat: number;
  measure: number;
  beat: number;
  ts_num: number;
  ts_denom: number;
}

class Project {
  transport: Transport;
  cmdstate: CommandState[];
  marker?: Marker[];
  region?: Region[];

  constructor() {
    this.transport = { state: -1 };
    this.cmdstate = [];
  }
}

export { Project }
export type { Transport, Position, Region, Marker, RGB, CommandState }