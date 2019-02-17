var http = require('http');
var fs = require('fs');

const port = 8081;
const htmlPath = './index.html';
http
  .createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    try {
      fs
        .createReadStream(htmlPath)
        .pipe(res);
    } catch(err) {
      res.writeHead(500, {'Content-Type': 'text'});
      res.send(`Something went wrong reading html file: ${err}`);
    }
  })
  .listen(port);

console.log('Server is listening on port: ', port);
