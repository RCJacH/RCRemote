import type { Transport, Region, Marker, RGB, CommandState, Project } from '~scripts/project';

export default function parseResponse(project: Project, results: string) {
  let ar = results.split("\n");
  let markers: Marker[] = [];
  let regions: Region[] = [];
  for (var x = 0; x < ar.length; x++) {
    let tok = ar[x].split("\t");
    if (tok.length == 0) continue;
    switch (tok[0]) {
      case "BEATPOS":
        let transport = parseBeatpos(tok);
        if (transport) {
          project.transport = transport
        }
        break;
      case "CMDSTATE":
        let cmdstate = parseCmdState(tok);
        if (cmdstate) {
          project.cmdstate[cmdstate.id] = cmdstate.state;
        }
        break;
      case "SEND":
        break;
      case "NTRACK":
        break;
      case "TRACK":
        break;
      case "MARKER_LIST":
        break;
      case "MARKER":
        markers.push(parseMarker(tok));
        break;
      case "MARKER_LIST_END":
        project.marker = markers;
        break;
      case "REGION_LIST":
        break;
      case "REGION":
        regions.push(parseRegion(tok));
        break;
      case "REGION_LIST_END":
        project.region = regions;
        break;
    }
  }
}

function parseBeatpos(tok: string[]): Transport | null {
  if (tok.length != 8) { return null; }
  return {
    state: parseInt(tok[1]),
    seconds: parseFloat(tok[2]),
    fullBeat: parseFloat(tok[3]),
    measure: parseInt(tok[4]),
    beat: parseFloat(tok[5]),
    ts_num: parseInt(tok[6]),
    ts_denom: parseInt(tok[7]),
  }
}

function parseCmdState(tok: string[]): CommandState | null {
  if (tok.length != 3 || tok[2] == '-1') { return null; }
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
