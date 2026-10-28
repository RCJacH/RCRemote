import './styles/main.pcss'
import './lib/style.pcss'
import { commandID } from './scripts/constants';
import { createProject } from '~scripts/project';
import { addListeners } from './lib'

function updateViewportHeight() {
  document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
}

updateViewportHeight();
window.addEventListener('resize', updateViewportHeight);
window.addEventListener('orientationchange', updateViewportHeight);

let project = createProject();
project.request.addRecur("BEATPOS", 10);
project.request.addRecur(
  `GET/${commandID.toggle.preroll};GET/${commandID.toggle.metronome};GET/${commandID.toggle.loop}`,
  10
);
project.request.addRecur("MARKER;REGION", 500);
project.start();
addListeners(project);
