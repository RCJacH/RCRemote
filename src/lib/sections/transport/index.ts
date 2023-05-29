import { commandID } from "~scripts/constants.js";
import { addClickListener } from "~scripts/utils";

import type { Project } from "~scripts/project";

const rangeUnits = ["hide", "marker", "region"];

function cycleUnit(i: number, options: string[]) {
  return (i + 1) % Object.keys(options).length;
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
  addScreenClickListeners(project);
  addSettingsClickListeners(project);
  addPlaybackClickListeners(project);
}
