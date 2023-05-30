import { commandID } from "~scripts/constants.js";
import { addClickListener, setActive } from "~scripts/utils";

import type { Project } from "~scripts/project";

const rangeUnits = ["hide", "marker", "region"];

function cycleUnit(i: number, options: string[]) {
  return (i + 1) % Object.keys(options).length;
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

function addScreenTextListener(project: Project) {
  project.callback.push(updateScreenStatus);
  project.callback.push(updateScreenPosition);
}

function addScreenClickListeners(project: Project) {
  addClickListener('#rewind-button', () => {
    let options = commandID.transport.rewind;
    project.request.addCommand(
      options[
        Object.keys(options)[project.uistate.transport.posUnit]
      ]
    );
  });
  addClickListener('#fforward-button', () => {
    let options = commandID.transport.fforward;
    project.request.addCommand(
      options[
        Object.keys(options)[project.uistate.transport.posUnit]
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

function addSettingsListeners(project: Project) {
  addToggleListener(project, '#preroll-button', commandID.toggle.preroll);
  addToggleListener(project, '#metronome-button', commandID.toggle.metronome);
  addToggleListener(project, '#loop-button', commandID.toggle.loop);
}

function addSettingsClickListeners(project: Project) {
  addClickListener('#position-unit-button', () => {
    let t = project.uistate.transport;
    t.posUnit = cycleUnit(t.posUnit, commandID.transport.rewind);
  });
  addClickListener('#menu-button', () => {
    console.log('menu pressed');
  });
  addClickListener('#display-range-button', () => {
    let t = project.uistate.transport;
    t.rangeUnit = cycleUnit(t.rangeUnit, rangeUnits);
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
  });
  addClickListener('#undo-button', () => {
    project.request.addCommand(commandID.project.undo);
  });
}

export function addTransportListeners(project: Project) {
  updateScreenStatus(project);
  updateScreenPosition(project);
  addScreenTextListener(project);
  addSettingsListeners(project);
  addScreenClickListeners(project);
  addSettingsClickListeners(project);
  addPlaybackClickListeners(project);
}
