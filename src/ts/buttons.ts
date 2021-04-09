///<reference path="main.ts">///


function next_position_unit(s) {
  var a = ['Beat', 'Bar', 'Marker'];
  return a[(a.indexOf(s) + 1) % a.length];
}


function pressed_unit() {
  var dom = document.getElementById("unit-button");
  var s = dom.innerHTML;
  dom.innerHTML = next_position_unit(s);
}

function pressed_backward() {
  var s = document.getElementById("unit-button").innerHTML;
  switch (s) {
    case "Beat":
      wwr_req(41045);
      break;
    case "Bar":
      wwr_req(41043);
      break;
    case "Marker":
      wwr_req(40173);
      break;
  }
  wwr_req(41043);
}

function pressed_forward() {
  var s = document.getElementById("unit-button").innerHTML;
  switch (s) {
    case "Beat":
      wwr_req(41044);
      break;
    case "Bar":
      wwr_req(41042);
      break;
    case "Marker":
      wwr_req(40172);
      break;
  }
}

function pressed_loop() {wwr_req(1068); }
function pressed_preroll() { wwr_req(41819); }
function pressed_play() { wwr_req(1007); }
function pressed_pause() { wwr_req(40073); }
function pressed_record() { wwr_req(1013); }
function pressed_stop() { wwr_req(40667); }
function pressed_abort() { wwr_req(40668); }
function pressed_undo() { wwr_req(40029); }
function pressed_redo() { wwr_req(40030); }
function pressed_click() { wwr_req(40364); }
