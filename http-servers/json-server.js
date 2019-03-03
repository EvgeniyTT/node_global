const http = require('http');
import { cityModel } from '../db/models';
import connectToDb from '../db/connect';
import { fillUpMongoDb } from '../db/utils';

const port = 8082;
connectToDb();
fillUpMongoDb();

http.createServer(async (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});

  try {
    const count = await cityModel.count();
    const randomIndex = Math.floor(Math.random() * count);
    const randomCity = await cityModel.findOne().skip(randomIndex);
    res.end(JSON.stringify(randomCity));
  } catch (err) {
    console.error(`Error serving random city: ${err}`);
    res.end(`Error serving random city: ${err}`);
  }

}).listen(port);

console.log('Server is listening on port: ', port);
