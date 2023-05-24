import { Plugin } from 'vite';

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
                result += "TRANSPORT\t1\t32.500000\t0\t17.2.00\t17.2.00\n";
                break;
              case (command.includes('GET/')):
                let id = command.split('/')[1];
                result += `CMDSTATE\t${id}\t1\n`
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
