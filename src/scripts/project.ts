import { writable } from 'svelte/store';
import { createProject } from '~scripts/project/constructor';
import type { Project } from '~scripts/project/constructor';

function createResponse(project: Project) {
  const { subscribe, set, update } = writable(project);

  function setNewValue(k: string, v: any) {
    project[k] = v;
    update(project => project);
  }

  return {
    subscribe,
    set transport(v) { setNewValue('transport', v); },
    get transport() { return project.transport; },
    set cmdstate(v) { setNewValue('cmdstate', v); },
    get cmdstate() { return project.cmdstate; },
    set marker(v) { setNewValue('marker', v); },
    get marker() { return project.marker; },
    set region(v) { setNewValue('region', v); },
    get region() { return project.region; },
    get request() { return project.request },
  }
}

const project = createResponse(createProject());

const addCommand = project.request.addCommand;
const addRecur = project.request.addRecur;
const removeRecur = project.request.removeRecur;
const update = project.request.update;

export { project, addCommand, addRecur, removeRecur, update }
