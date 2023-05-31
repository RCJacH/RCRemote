import createRequest from "./project/requests";
import type { Request } from "./project/requests";
import parseResponse from "./project/response";

export interface CommandState {
  id: string | number;
  state: boolean;
}

export interface CommandStates {
  [id: string]: boolean;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface Marker {
  id: number;
  name: string;
  position: number;
  color: RGB;
}

export interface Region {
  id: number;
  name: string;
  start: number;
  end: number;
  color: RGB;
}

export interface Transport {
  state: number;
  seconds: number;
  fullBeat: number;
  measure: number;
  beat: number;
  ts_num: number;
  ts_denom: number;
}

export interface UIState {
  [key: string]: any;
}

export interface Project {
  transport: Transport;
  cmdstates: CommandStates;
  markers: Marker[];
  regions: Region[];
  callbacks: Callback;
  uistate: UIState;
  request: Request;
  update: Function;
  addCallback: Function;
}

type Callback = {[K in keyof Project]?: Function[];};

export const createProject = () => {
  const transport: Transport = {
    state: -1,
    seconds: 0.0,
    fullBeat: 0.0,
    measure: 0,
    beat: 0.0,
    ts_num: 4,
    ts_denom: 4,
  };
  const cmdstates: CommandStates = {};
  const marker: Marker[] = [];
  const region: Region[] = [];
  const callback: Callback = {
    transport: [],
    cmdstates: [],
    markers: [],
    regions: [],
  }
  const uistate: UIState = {
    transport: {
      posUnit: 1,
      rangeUnit: 2,
      undostate: -1,
      allowPause: false,
    }
  };

  const project = {
    transport: transport,
    cmdstates: cmdstates,
    markers: marker,
    regions: region,
    callbacks: callback,
    uistate: uistate,
    request: createRequest((s: string) => {
      parseResponse(project, s);
    }),
    start: () => { project.request.update(); },
    update: <T,>(section: keyof Project, result: T extends Project ? T : CommandState) => {
      Object.assign(project[section], result);

      for (let fn of project.callbacks[section]!) {
        fn(project);
      }
    },
    addCallback: (key: (keyof Project)[], fn: Function) => {
      for (let k of key) {
        project.callbacks[k]?.push(fn);
      }
    }
  }

  return project
};
