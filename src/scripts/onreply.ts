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

interface Response {
  transport?: {
    position: string;
    isRepeatOn: boolean;
    state: number;
  };
  cmdstate?: CommandState[];
  marker?: Marker[];
}

function wwr_onreply(results: string) {
  let ar = results.split("\n");
  let result: Response = {};
  let markers: Marker[];
  let regions: Region[];
  for (var x = 0; x < ar.length; x++) {
    let tok = ar[x].split("\t");
    if (tok.length == 0) continue;
    switch (tok[0]) {
      case "TRANSPORT":
        let transport = parseTransport(tok);
        if (transport) {
          result["transport"] = transport;
        }
        break;
      case "CMDSTATE":
        let cmdstate: CommandState = parseCmdState(tok);
        if (cmdstate) {
          if (!("cmdstate" in result)) {
            result["cmdstate"] = [];
          }
          result["cmdstate"].push(cmdstate);
        }
        break;
      case "SEND":
        break;
      case "NTRACK":
        break;
      case "TRACK":
        break;
      case "MARKER_LIST":
        markers = [];
        break;
      case "MARKER":
        markers.push(parseMarker(tok));
        break;
      case "MARKER_LIST_END":
        result["marker"] = markers;
        break;
      case "REGION_LIST":
        regions = [];
        break;
      case "REGION":
        regions.push(parseRegion(tok));
        break;
      case "REGION_LIST_END":
        result["region"] = regions;
        break;
    }
  }
  return result;
}

function parseTransport(tok: string[]) {
  if (tok.length > 4) {
    let transportState = parseInt(tok[1]);
    let isRepeatOn = parseInt(tok[3]) == 1;
    let position = tok[4];
    if (transportState >= 0 && position)
      return {
        state: transportState,
        isRepeatOn: isRepeatOn,
        position: position,
      }
  }
}

function parseCmdState(tok: string[]): CommandState {
  if (tok.length != 3 || tok[2] == '-1') { return; }
  return {
    id: tok[1],
    state: tok[2] == "1"
  }
}

function parseMarker(tok: string[]): Marker {
  return {
    name: tok[1],
    id: parseInt(tok[2]),
    position: parseFloat(tok[3]),
    color: parseColor(tok[4])
  }
}

function parseRegion(tok: string[]): Region {
  return {
    name: tok[1],
    id: parseInt(tok[2]),
    start: parseFloat(tok[3]),
    end: parseFloat(tok[4]),
    color: parseColor(tok[5])
  }
}

function parseColor(rgbStr: string): RGB {
  let rgb: number = parseInt(rgbStr);
  return {
    r: (rgb >> 16) & 0xFF,
    g: (rgb >> 8) & 0xFF,
    b: rgb & 0xFF
  }

}

export { wwr_onreply };