import {pinfo} from "./project";


function wwr_onreply(results: string) {
  var ar = results.split("\n");
  for (var x = 0; x < ar.length; x++) {
    var tok = ar[x].split("\t");
    if (tok.length > 0) parse_tokens(tok);
  }
}


function parse_tokens(tok: string[]) {
  switch (tok[0]) {
    case "TRANSPORT":
      parse_transport_tokens(tok);
      break;
    case "CMDSTATE":
      // parse_cmdstate_tokens(tok);
      break;
    case "SEND":
      break;
    case "NTRACK":
      break;
    case "TRACK":
      break;
  }
}


function parse_transport_tokens(tok: string[]) {
  if (tok.length > 4) {
    var transportState = parseInt(tok[1]);
    if (transportState != pinfo.transportState) {
      pinfo.transportState = transportState;
      toggle_button("play-button", !!(pinfo.transportState & 1));
      toggle_button("pause-button", !!(pinfo.transportState & 2));
      toggle_button("record-button", !!(pinfo.transportState & 4));
      toggle_button("abort-button", !!(pinfo.transportState & 4));
    }
    // if (tok[3] != last_repeat) {
    //   last_repeat = tok[3];
    //   toggle_button("loop-button", last_repeat>0);
    // }
    set_transport_status(tok[4]);
    set_transport_buttons(pinfo.transportState);
  }
}


function get_status_string(index: number): string {
  switch (index) {
    case -1: return "initializing...";
    case 0: return "stopped: ";
    case 1: return "playing: ";
    case 2: return "paused: ";
    case 5: return "recording: ";
    case 6: return "recpaused: ";
    default: return "";
  }
}
function set_transport_status(position: string) {
  var statusDom = document.getElementById("status");
  if (statusDom) {
    var tmp = get_status_string(pinfo.transportState).toUpperCase();
    statusDom.innerHTML = tmp;
  }
  var posDom = document.getElementById("position");
  if (posDom) {
    posDom.innerHTML = (pinfo.lastPosition = position);
  }
}

window.addEventListener("load", () => set_transport_buttons(0));
function set_transport_buttons(transportState: number) {
  switch (transportState) {
    default:
    case 0:
      toggle_button_hidden("play-button", false);
      toggle_button_hidden("pause-button", true);
      toggle_button_hidden("abort-button", true);
      toggle_button_hidden("undo-button", false);
    break;
    case 1:
    case 2:
      toggle_button_hidden("play-button", true);
      toggle_button_hidden("pause-button", false);
      toggle_button_hidden("abort-button", true);
      toggle_button_hidden("undo-button", false);
    break;
    case 5:
    case 6:
      toggle_button_hidden("play-button", true);
      toggle_button_hidden("pause-button", false);
      toggle_button_hidden("abort-button", false);
      toggle_button_hidden("undo-button", true);
    break;
  }
}

function toggle_button(
  id: string,
  state: boolean,
  classname: string = "-active",
) {
  document.getElementById(id)?.classList.toggle(classname, state);
}

function toggle_button_hidden(id: string, state: boolean) {
  toggle_button(id, state, "-hidden");
}


export {wwr_onreply};