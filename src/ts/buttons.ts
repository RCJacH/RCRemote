///<reference path="main.ts">///
import {wwr_req} from "./main.js";


function button_trigger(id: string, fn: () => void): void {
  document.getElementById(id.concat("-button"))?.addEventListener(
    "click", fn
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


var positionUnits = ["Beat", "Bar", "Marker"];
function next_position_unit(s: string) {
  return positionUnits[(positionUnits.indexOf(s) + 1) % positionUnits.length];
}
button_trigger("unit", () => {
  var s = document.getElementById("unit-button")?.innerHTML;
  if (s == null) return;
  s = next_position_unit(s);
});


function position_change(action_id: {[key: string]: number}): void {
  var s = document.getElementById("unit-button")?.innerHTML;
  if (s == null) return;
  wwr_req(action_id[s]);
  console.log(action_id[s]);
}
button_trigger("backward", () => position_change({
    "Beat": 41045,
    "Bar": 41043,
    "Marker": 40173
  })
)
button_trigger("forward", () => position_change({
    "Beat": 41044,
    "Bar": 41042,
    "Marker": 40172
  })
)
