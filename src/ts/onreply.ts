function setTextForObject(obj, text) {
  if (obj.lastChild)
      obj.lastChild.nodeValue = text;
  else
      obj.appendChild(document.createTextNode(text));
}
function toggle_button(id, state, classname) {
  if (typeof (classname) === "undefined")
      classname = "active";
  var elm = document.getElementById(id);
  elm.classList.toggle(classname, state);
  // element.setAttribute('active', state);
}
function ProjectInfo() {
  this.playstate = -1;
}
var pinfo = new ProjectInfo();
function parse_transport_tokens(tok) {
  if (tok.length > 4) {
      if (tok[1] != pinfo.playstate) {
          pinfo.playstate = tok[1];
          if (pinfo.playstate == 1) {

          }
          toggle_button("play-button", pinfo.playstate & 1);
          // toggle_button("pause-button", pinfo.playstate & 2);
          toggle_button("record-button", pinfo.playstate & 4);
          // toggle_button("abort-button", pinfo.playstate & 4);
      }
      // if (tok[3] != last_repeat) {
      //   last_repeat = tok[3];
      //   toggle_button("loop-button", last_repeat>0);
      // }
      var obj = document.getElementById("status");
      if (obj) {
          var tmp = "";
            switch (parseInt(pinfo.playstate)) {
              case 0: tmp += "stopped: "; break;
              case 1: tmp += "playing: "; break;
              case 2: tmp += "paused: "; break;
              case 5: tmp += "recording: "; break;
              case 6: tmp += "recpaused: "; break;
            }
          tmp += (last_time_str = tok[4]);
          obj.innerHTML = tmp;
      }
  }
}
function parse_cmdstate_tokens(tok) {
  if (tok[1] == 40364) {
      if ((tok[2] > 0) != last_metronome) {
          last_metronome = tok[2] > 0;
          if (g_inspect_tridx == 0)
              document.getElementById("trackinspect_clone").style.background = last_metronome ? "#8f8" : "#777";
      }
  }
}
function wwr_onreply(results) {
  var ar = results.split("\n");
  for (var x = 0; x < ar.length; x++) {
      var tok = ar[x].split("\t");
      if (tok.length > 0)
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
}

export default wwr_onreply;