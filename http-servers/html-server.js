const http = require('http');
const fs = require('fs');
const replace = require('stream-replace');

const port = 8081;
const htmlPath = 'http-servers/index.html';
const message = 'Some real message';

http
  .createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    const fileStream = fs.createReadStream(htmlPath);
    fileStream.on('error', err => {
      res.writeHead(500, {'Content-Type': 'text'});
      res.end(`Something went wrong reading html file: ${err}`);
    });
    fileStream
      .pipe(replace(/{message}/g, message))
      .pipe(res);
  })
  .listen(port);

console.log('Server is listening on port: ', port);
