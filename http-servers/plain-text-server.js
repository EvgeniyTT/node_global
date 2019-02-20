const http = require('http');

const port = 8080;
http
  .createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'plain text'});
    res.write('Hello World');
    res.end();
  })
  .listen(port);

console.log('Server is listening on port: ', port);
