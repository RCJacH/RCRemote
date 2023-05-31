import { commandID } from "~scripts/constants.js";
import { addClickListener, setActive, setDisplay } from "~scripts/utils";

import type { Project, Marker, Region } from "~scripts/project";

const posUnits = Object.keys(commandID.transport.rewind);

function cycleUnit(i: number, options: string[]) {
  return (i + 1) % Object.keys(options).length;
}

function updateMarkers(curPos: number, range: number, markers: Marker[]) {
  let ele = document.querySelector('#transport-screen-range-markers');
  if (!ele) return;
  let result = "";
  let halfRange = range / 2;
  for (let marker of markers) {
    let pos = marker.position;
    if (Math.abs(curPos - pos) > halfRange) continue;
    let start = curPos - halfRange;
    let pct = (pos - start) / range;
    let rgb = `rgb(${marker.color.r}, ${marker.color.g}, ${marker.color.b})`;
    result += `<div class="marker" style="--position: ${pct * 96}%;--text-color: black;">
      <svg class="o-icon" style="--color-marker: ${rgb}">
        <use xlink:href="#o-icon-marker"/>
      </svg>
    </div>`
  }
  ele.innerHTML = result;
}


function updateRange(project: Project) {
  let ele = document.querySelector('#transport-screen-range');
  if (!ele) return;
  let range = 1 << project.uistate.transport.rangeUnit;
  setDisplay('#transport-screen-range', range != 1);
  if (range == 1) return;
  range = range * project.transport.ts_num / project.transport.ts_denom * 120 / 60,
  updateMarkers(project.transport.seconds, range, project.marker);
}

function updateScreenRange(project: Project) {
  updateRange(project);
  project.callback.push(updateRange);
}

function statusText(index: number): string {
  switch (index) {
    case -1:
      return "initializing...";
    case 0:
      return "stopped: ";
    case 1:
      return "playing: ";
    case 2:
      return "paused: ";
    case 5:
      return "recording: ";
    case 6:
      return "recpaused: ";
    default:
      return "";
  }
}

function updateScreenStatus(project: Project) {
  let ele = document.querySelector('#transport-screen-status');
  if (!ele) { return; }
  let text = statusText(project.transport.state);
  ele.innerHTML = text;
}

function updateScreenPosition(project: Project) {
  let ele = document.querySelector('#transport-screen-position');
  if (!ele) { return; }
  let text = `${project.transport.measure}.${(
    Math.round(project.transport.beat * 100) * 0.01 +
    1
  ).toFixed(2)}`;
  ele.innerHTML = text;
}

function addScreenTextCallback(project: Project) {
  project.callback.push(updateScreenStatus);
  project.callback.push(updateScreenPosition);
}

function addScreenClickListeners(project: Project) {
  addClickListener('#rewind-button', () => {
    let options = commandID.transport.rewind;
    project.request.addCommand(
      options[
        posUnits[project.uistate.transport.posUnit]
      ]
    );
  });
  addClickListener('#fforward-button', () => {
    let options = commandID.transport.fforward;
    project.request.addCommand(
      options[
        posUnits[project.uistate.transport.posUnit]
      ]
    );
  });
}

function addToggleListener(project: Project, id: string, cmdstate: number | string) {
  project.callback.push((p: Project) => {
    let state;
    try {
      state = p.cmdstate[cmdstate];
    }
    catch(err) {
      state = false;
    }
    setActive(id, state);
  });
}

function addSettingsCallback(project: Project) {
  addToggleListener(project, '#preroll-button', commandID.toggle.preroll);
  addToggleListener(project, '#metronome-button', commandID.toggle.metronome);
  addToggleListener(project, '#loop-button', commandID.toggle.loop);
}

function setPosUnit(project: Project) {
  let ele = document.querySelector('#position-unit-button svg > use');
  if (!ele) return;
  ele.setAttribute('xlink:href', `#o-icon-${posUnits[project.uistate.transport.posUnit]}unit`);
}

function setRangeUnit(project:Project) {
  let ele = document.querySelector('#display-range-button svg > use');
  if (!ele) return;
  let length = project.uistate.transport.rangeUnit;
  let id = `#o-icon-${length ? `displayrange${1<<length}` : 'hiderange'}`;
  ele.setAttribute('xlink:href', id);
  updateRange(project);
}

function addSettingsClickListeners(project: Project) {
  addClickListener('#position-unit-button', () => {
    let t = project.uistate.transport;
    t.posUnit = cycleUnit(t.posUnit, commandID.transport.rewind);
    setPosUnit(project);
  });
  addClickListener('#menu-button', () => {
    console.log('menu pressed');
  });
  addClickListener('#display-range-button', () => {
    let t = project.uistate.transport;
    t.rangeUnit = (t.rangeUnit + 1) % 4;
    setRangeUnit(project);
  });
  addClickListener('#preroll-button', () => {
    project.request.addCommand(commandID.toggle.preroll);
  });
  addClickListener('#metronome-button', () => {
    project.request.addCommand(commandID.toggle.metronome);
  });
  addClickListener('#loop-button', () => {
    project.request.addCommand(commandID.toggle.loop);
  });
}

function updatePlayback(project: Project) {
  let state = project.transport.state;
  let isPlaying = (state >= 0) && (state&1) == 1;
  let isRecording = (state >= 0) && (state&4) == 4;
  setDisplay('#play-button', state <= 0 || !project.uistate.transport.allowPause);
  setActive('#play-button', isPlaying);
  setDisplay('#pause-button', state > 0 && project.uistate.transport.allowPause);
  setActive('#pause-button', (state >= 0) && (state&2) == 2);
  setActive('#record-button', isRecording);
  setDisplay('#stop-button', state > 0);
  setDisplay('#save-button', state <= 0);
  setDisplay('#abort-button', isRecording);
  setDisplay('#redo-button', !isRecording && project.uistate.transport.undostate == 1);
  setDisplay('#undo-button', !isRecording && project.uistate.transport.undostate != 1);
}

function addPlaybackCallback(project: Project) {
  project.callback.push(updatePlayback);
}

function addPlaybackClickListeners(project: Project) {
  addClickListener('#play-button', () => {
    project.request.addCommand(commandID.transport.play);
  });
  addClickListener('#record-button', () => {
    project.request.addCommand(commandID.transport.record);
  });
  addClickListener('#stop-button', () => {
    project.request.addCommand(commandID.transport.stop);
  });
  addClickListener('#save-button', () => {
    project.request.addCommand(commandID.project.save);
  });
  addClickListener('#abort-button', () => {
    project.request.addCommand(commandID.transport.abort);
  });
  addClickListener('#redo-button', () => {
    project.request.addCommand(commandID.project.redo);
    project.uistate.transport.undostate = 0;
  });
  addClickListener('#undo-button', () => {
    project.request.addCommand(commandID.project.undo);
    project.uistate.transport.undostate = 1;
  });
}

export function addTransportListeners(project: Project) {
  updateScreenStatus(project);
  updateScreenPosition(project);
  updateScreenRange(project);
  updatePlayback(project);
  addScreenTextCallback(project);
  addSettingsCallback(project);
  setPosUnit(project);
  setRangeUnit(project);
  addPlaybackCallback(project);
  addScreenClickListeners(project);
  addSettingsClickListeners(project);
  addPlaybackClickListeners(project);
}
