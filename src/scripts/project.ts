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
  cmdstate: CommandStates;
  marker: Marker[];
  region: Region[];
  callback: Function[];
  uistate: UIState;
  request: Request;
}

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
  const cmdstate: CommandStates = {};
  const marker: Marker[] = [];
  const region: Region[] = [];
  const callback: Function[] = [];
  const uistate: UIState = {
    transport: {
      posUnit: 1,
      rangeUnit: 1,
      undostate: -1,
    }
  };

  const project = {
    transport: transport,
    cmdstate: cmdstate,
    marker: marker,
    region: region,
    callback: callback,
    uistate: uistate,
    request: createRequest((s: string) => {
      parseResponse(project, s);
      for (let fn of callback) {
        fn(project);
      }
    }),
    start: () => { project.request.update(); }
  }

  return project
};
