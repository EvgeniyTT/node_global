import csvParser from 'csv-parser';
import csvParserSync from 'csv-parse/lib/sync';
import toReadableStream from 'to-readable-stream';
import getStream from 'get-stream';
import fs from 'fs';
const fsPromises = fs.promises;

export default class Importer {

  readOptions = {
    encoding: 'utf8'
  };
  csvParseOptions = {
    columns: true,
    skip_empty_lines: true
  };

  import(path) {
    return fsPromises.readFile(path).then(csvFile => {
      if (typeof csvFile === 'string' || Buffer.isBuffer(csvFile)) {
        csvFile = toReadableStream(csvFile);
      }
      return getStream.array(csvFile.pipe(csvParser(this.csvParseOptions)));
    });
  }

  importSync(path) {
    try {
      const contentCsv = fs.readFileSync(path, this.readOptions);
      const records = csvParserSync(contentCsv, this.csvParseOptions);
      return records;
    } catch(err) {
      console.error(`Error on reading file sync by path ${path}: ${err}`);
    }
  }
}
