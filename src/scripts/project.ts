import createRequest from "./project/requests";
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
  [id: string]: UIState | string | number | boolean;
}

export interface Project {
  transport: Transport;
  cmdstate: CommandStates;
  marker: Marker[];
  region: Region[];
  callback: Function[];
  uistate: UIState;
  request: any;
}

export const createProject = () => {
  const callback: Function[] = [];

  const project = {
    transport: {
      state: -1,
      seconds: 0.0,
      fullBeat: 0.0,
      measure: 0,
      beat: 0.0,
      ts_num: 4,
      ts_denom: 4,
    },
    cmdstate: {},
    marker: [],
    region: [],
    callback: callback,
    uistate: {},
    request: createRequest((s: string) => {
      parseResponse(project, s);
      for (let fn of callback) {
        fn(project);
      }
    })
  }

  return project
};
