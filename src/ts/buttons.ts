///<reference path="main.ts">///
import {wwr_req} from "./main.js";
import {pinfo} from "./project";


function button_trigger(
  id: string,
  fn: () => void,
  evt: string = "click"
): void {
  document.getElementById(id.concat("-button"))?.addEventListener(
    evt, fn
  );
}

button_trigger("play", () => wwr_req(1007));
button_trigger("pause", () => wwr_req(40073));
button_trigger("record", () => wwr_req(1013));
button_trigger("stop", () => wwr_req(40667));
button_trigger("abort", () => wwr_req(40668));
button_trigger("undo", () => wwr_req(40029));
button_trigger("redo", () => wwr_req(40030));
button_trigger("loop", () => wwr_req(1068));
button_trigger("preroll", () => wwr_req(41819));
button_trigger("metronome", () => wwr_req(40364));


function set_unit(content: string) {
  var dom = document.getElementById("unit-button");
  if (dom) {
    dom.innerHTML = content;
  }
}
window.addEventListener("load", () => set_unit(pinfo.positionUnit));
button_trigger("unit", () => set_unit(pinfo.cyclePositionUnit()));


function position_change(action_id: {[key: string]: number}): void {
  wwr_req(action_id[pinfo.positionUnit]);
}
button_trigger("backward", () => position_change({
    "Beat": 41045,
    "Bar": 41043,
    "Marker": 40172
  })
)
button_trigger("forward", () => position_change({
    "Beat": 41044,
    "Bar": 41042,
    "Marker": 40173
  })
)
