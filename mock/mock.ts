
import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/_/:ids',
    method: 'get',
    rawResponse: async (req, res) => {
      let url = req.originalUrl.substring(3);
      let commands = url.split(';').slice(0, 2);
      let result = "";
      if (commands.indexOf('TRANSPORT') >= 0) {
        result = result + "TRANSPORT\t1\t32.500000\t0\t17.2.00\t17.2.00\n"
      }
      await new Promise((resolve) => {
        let reqbody = '';
        req.on('data', (chunk) => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 200;
      res.end(result);
    },
  }
] as MockMethod[]
