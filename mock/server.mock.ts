import { Plugin } from 'vite';
import { commandID } from '../src/scripts/constants'

class MockServer {
  playstate: number = 0;
  measure: number = 8;
  beat: number = 2.5;
  toggle: { [k: string | number]: number } = {
    [commandID.toggle.loop]: 0,
    [commandID.toggle.preroll]: 0,
    [commandID.toggle.metronome]: 1,
  };
  markers: [string, number, number, number][] = [
    ["markername", 1, 4.0, 0],
    ["", 7, 13.0, 26102272],
    ["", 3, 18.0, 25231359]
  ];
  regions: [string, number, number, number, number][] = [
    ["singleRegion", 3, 4.0, 8.0, 0],
    ["", 1, 2.0, 3.0, 18956130],
    ["", 56357, 2.0, 3.0, 22434674],
    ["overlap-l", 5, 10.0, 14.0, 28513852],
    ["overlap-r", 6, 12.0, 16.0, 33498103],
    ["enclose-o", 7, 18.0, 24.0, 0],
    ["enclose-i", 8, 20.0, 20.5, 33489024],
    ["multilap-1", 10, 26.0, 36.0, 23760307],
    ["multilap-2", 11, 28.0, 30.5, 27103620],
    ["multilap-3", 12, 32.0, 34.5, 25987012],
  ];
  getBeatStr() {
    return `${this.measure}.${this.beat}`;
  }
  getCurTime() {
    return (this.measure * 4 + this.beat) / 2;
  }
  getTotalBeat() {
    return this.measure * 4 + this.beat;
  }
  getMarkers() {
    let result = ""
    this.markers.map((x) => { result += `MARKER\t${x.join('\t')}\n` })
    return `MARKER_LIST\n${result}MARKER_LIST_END\n`
  }
  getRegions() {
    let result = ""
    this.regions.map((x) => { result += `REGION\t${x.join('\t')}\n` })
    return `REGION_LIST\n${result}REGION_LIST_END\n`
  }
  setPositionByBeat(x: number) {
    let total = this.getTotalBeat();
    total += x;
    this.measure = Math.floor(total / 4);
    this.beat = total - this.measure * 4;
  }
  setPositionByTime(x: number) {
    let total = x * 2;
    this.measure = Math.floor(total / 4);
    this.beat = total - this.measure * 4;
  }

  runCommand(command: number | string) {
    let result;
    switch (command) {
      case commandID.transport.play:
        this.playstate = 1;
        break;
      case commandID.transport.record:
        this.playstate = 5;
        break;
      case commandID.transport.stop:
      case commandID.transport.abort:
        this.playstate = 0;
        break;
      case commandID.transport.rewind.beat:
        this.setPositionByBeat(-1);
        break;
      case commandID.transport.rewind.measure:
        this.setPositionByBeat(-4);
        break;
      case commandID.transport.rewind.marker:
        result = this.markers.findLast((x: [string, number, number, number]) => (x[2] < this.getCurTime()));
        this.setPositionByTime(result ? result[2] : 0);
        break;
      case commandID.transport.fforward.beat:
        this.setPositionByBeat(1);
        break;
      case commandID.transport.fforward.measure:
        this.setPositionByBeat(4);
        break;
      case commandID.transport.fforward.marker:
        result = this.markers.find((x) => (x[2] > this.getCurTime()));
        if (result) this.setPositionByTime(result[2]);
        break;
      case commandID.project.save:
      case commandID.project.undo:
      case commandID.project.redo:
        let obj = commandID.project;
        let keys = Object.keys(obj);
        keys.map((i) => {
          if (obj[i] === command) {
            console.log(`Triggered ${i}.`);
          }
        });
        break;
      case commandID.toggle.loop:
      case commandID.toggle.preroll:
      case commandID.toggle.metronome:
        this.toggle[command] ^= 1;
        break;
    }
  }
}

let mockserver = new MockServer;

const mockPlugin: Plugin = {
  name: 'mock-server-plugin',
  configureServer(server) {
    return () => {
      server.middlewares.use((req, res, next) => {

        if (req.originalUrl?.startsWith('/_/')) {
          const url = req.originalUrl.substring(3); // This will give you the parts of the path after '/_/'
          let commands = url.split(';');
          let result = "";
          for (let command of commands) {
            switch (true) {
              case (command === 'TRANSPORT'):
                result += `TRANSPORT\t${mockserver.playstate}\t${mockserver.getCurTime()}\t${mockserver.toggle[commandID.toggle.loop]}\t${mockserver.getBeatStr()}\t${mockserver.getBeatStr()}\n`;
                break;
              case (command === 'BEATPOS'):
                result += `BEATPOS\t${mockserver.playstate}\t${mockserver.getCurTime()}\t${mockserver.getTotalBeat()}\t${mockserver.measure}\t${mockserver.beat}\t4\t4\n`;
                break;
              case (command.includes('GET/')):
                let id = command.split('/')[1];
                result += `CMDSTATE\t${id}\t${mockserver.toggle[id]}\n`
                break;
              case (!isNaN(parseInt(command))):
                mockserver.runCommand(parseInt(command));
                break;
              case (command === 'MARKER'):
                result += mockserver.getMarkers();
                break;
              case (command === 'REGION'):
                result += mockserver.getRegions();
                break;
            }
          }
          res.writeHead(200, {
            'Content-Type': 'text/plain',
          });
          res.end(result);
        } else {
          next();
        }
      });
    };
  },
};

export default mockPlugin;
