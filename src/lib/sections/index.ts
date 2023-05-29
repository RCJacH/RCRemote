import { addTransportListeners } from "./transport";
import type { Project } from "~scripts/project";

export function addSectionListeners(project: Project) {
  addTransportListeners(project);
}
