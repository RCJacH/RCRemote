import {wwr_req_recur, wwr_start} from "./main.js";


class ProjectInfo {
  static posUnits = ["Beat", "Bar", "Marker"];

  playstate: number = -1;
  posUnitInt: number = 1;
  transportRecurTime: number = 10;
  trackRecurTime: number = 1000;

  start() {
    wwr_req_recur("TRANSPORT", this.transportRecurTime);
    wwr_req_recur(
      "GET/TRACK/0/SEND/0;GET/TRACK/0/SEND/1;NTRACK;TRACK;GET/40364",
      this.trackRecurTime
    );
    wwr_start();
  }

  cyclePositionUnit() {
    this.posUnitInt = (this.posUnitInt + 1) % ProjectInfo.posUnits.length;
    return this.positionUnit;
  }

  get positionUnit() {
    return ProjectInfo.posUnits[this.posUnitInt]
  }
}

var pinfo = new ProjectInfo();
export {pinfo};
