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
          project.update('transport', transport);
        }
        break;
      case "CMDSTATE":
        let cmdstate = parseCmdState(tok);
        if (cmdstate) {
          let cmdstates = project.cmdstates;
          cmdstates[cmdstate.id] = cmdstate.state;
          project.update('cmdstates', cmdstates);
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
        project.update("markers", markers);
        break;
      case "REGION_LIST":
        break;
      case "REGION":
        regions.push(parseRegion(tok));
        break;
      case "REGION_LIST_END":
        project.update("regions", regions);
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
  let color = tok[4] === "0" ? { r: 160, g: 0, b: 0 } : parseColor(tok[4]);
  return {
    name: tok[1],
    id: parseInt(tok[2]),
    position: parseFloat(tok[3]),
    color: color
  }
}

function parseRegion(tok: string[]): Region {
  let color = tok[5] === "0" ? { r: 86, g: 114, b: 114} : parseColor(tok[5]) ;
  return {
    name: tok[1],
    id: parseInt(tok[2]),
    start: parseFloat(tok[3]),
    end: parseFloat(tok[4]),
    color: color
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
