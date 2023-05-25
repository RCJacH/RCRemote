import { Plugin } from 'vite';
import { commandID } from '../src/scripts/constants'

class MockServer {
  playstate: number = 0;
  measure: number = 18;
  beat: number = 2.5;
  toggle: { [k: string | number]: number } = {
    [commandID.toggle.loop]: 0,
    [commandID.toggle.preroll]: 0,
    [commandID.toggle.metronome]: 1,
  };
  getBeatStr() {
    return `${this.measure}.${this.beat}`;
  }
  getCurTime() {
    return (this.measure * 4 + this.beat) / 2;
  }
  setPositionByBeat(x) {
    let total = this.measure * 4 + this.beat;
    total += x;
    this.measure = Math.floor(total / 4);
    this.beat = total - this.measure * 4;
  }
  runCommand(command) {
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
      case commandID.transport.fforward.beat:
        this.setPositionByBeat(1);
        break;
      case commandID.transport.fforward.measure:
        this.setPositionByBeat(4);
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
              case (command == 'TRANSPORT'):
                result += `TRANSPORT\t${mockserver.playstate}\t${mockserver.getCurTime()}\t${mockserver.toggle[commandID.toggle.loop]}\t${mockserver.getBeatStr()}\t${mockserver.getBeatStr()}\n`;
                break;
              case (command.includes('GET/')):
                let id = command.split('/')[1];
                result += `CMDSTATE\t${id}\t${mockserver.toggle[id]}\n`
                break;
              case (!isNaN(command)):
                mockserver.runCommand(parseInt(command));
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
