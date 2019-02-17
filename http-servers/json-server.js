var http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'plain text'});
  res.write('Hello World!');
  res.end();
}).listen(8080);
