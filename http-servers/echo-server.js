const http = require('http');

const port = 8084;

http.createServer((req,res) => {
  res.writeHead(200);
  req.pipe(res);
}).listen(port);

console.log('Server is listening on port: ', port);
