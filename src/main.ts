import './styles/main.pcss'
import { commandID } from './scripts/constants';
import { createProject } from '~scripts/project';
import { addListeners } from './lib'

let project = createProject();
project.request.addRecur("BEATPOS", 10);
project.request.addRecur(
  `GET/${commandID.toggle.preroll};GET/${commandID.toggle.metronome};GET/${commandID.toggle.loop}`,
  10
);
project.request.addRecur("MARKER;REGION", 500);
project.start();
addListeners(project);
