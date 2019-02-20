import csvParser from 'csv-parse';
import csvParserSync from 'csv-parse/lib/sync';
import toReadableStream from 'to-readable-stream';
import getStream from 'get-stream';
import fs from 'fs';
// import csv from 'csvtojson';

const fsPromises = fs.promises;

export default class Importer {
  constructor(){
    this.readOptions = {
      encoding: 'utf8'
    };
    this.csvParseOptions = {
      delimiter: ',',
      columns: true,
      skip_empty_lines: true
    };
  }

  import(path) {
    // TODO: why do we need to return a promise with file data?
    // fs.createReadStream(path).pipe(csv()).pipe(process.stdout);
    // TODO: check if it's a file or directory
    return fsPromises.readFile(path).then(csvFile => {
      if (typeof csvFile === 'string' || Buffer.isBuffer(csvFile)) {
        csvFile = toReadableStream(csvFile);
      }
      return getStream.array(csvFile.pipe(csvParser(this.csvParseOptions)));
    });
  }

  importSync(path) {
    try {
      // TODO: check if it's a file or directory
      const contentCsv = fs.readFileSync(path, this.readOptions);
      const records = csvParserSync(contentCsv, this.csvParseOptions);
      return records;
    } catch(err) {
      console.error(`Error on reading file sync by path ${path}: ${err}`);
    }
  }
}
