import dotenv from 'dotenv';
dotenv.config();
import program from 'commander';
import fs from 'fs';
import Importer from '../models/importer';
import DirWatcher from '../models/dirwatcher';
import toReadableStream from 'to-readable-stream';
import https from 'https';

const importer = new Importer();
const dirWatcher = new DirWatcher();

const convertPathExtensionToJson = filePath => {
  const newFilePath = filePath.split('.');
  newFilePath.pop();
  newFilePath.push('json');
  return newFilePath.join('.');
}

const exit = msg => {
  console.error(msg);
  process.exit(1);
};

const actions = {
  convertFromFile: {
    fn: filePath => {
      importer
        .import(filePath)
        .then(data => {
          toReadableStream(JSON.stringify(data)).pipe(process.stdout);
        });
    },
    isFileRequired: true
  },
  convertToFile: {
    fn: filePath => {
      const jsonFilePath = convertPathExtensionToJson(filePath);
      importer
        .import(filePath)
        .then(data => {
          toReadableStream(JSON.stringify(data)).pipe(fs.createWriteStream(jsonFilePath));
        });
    },
    isFileRequired: true
  },
  cssBundler: {
    fn: async path => {
      const filePathList = await dirWatcher.getNewFilesByPath(path);

      // TODO: why it doesn't work using assignment ?
      // const bundleStream = fs.createWriteStream(`${path}/bundle.css`);
      filePathList.forEach(filePath => {
        fs.createReadStream(filePath).pipe(fs.createWriteStream(`${path}/bundle.css`));
      });

      // https.get('https://epa.ms/nodejs18-hw3-css', res => { 
      //   console.log(res);
      //   res.pipe(fs.createWriteStream(`${path}/bundle.css`));
      // });
    },
    isPathRequired: true
  },
  reverse: {
    fn: str =>  { console.log([...str].reverse().join('')); }
  },
  transform: {
    fn: str => { console.log(str.toUpperCase()); }
  },
  outputFile: {
    fn: filePath => { fs.createReadStream(filePath).pipe(process.stdout); },
    isFileRequired: true
  },
};

program
  .version('2.19.0')
  .usage('<action> <file/string>')
  .option('-a, --action <reverse|transform|outputFile|convertFromFile|convertToFile>', 'Action')
  .option('-f, --file <filePath>', 'Path to file')
  .option('-p, --path <dirPath>', 'Path to directory with css files')
  .option('-h, --help', 'Help')
  .parse(process.argv);

if (!(program.action in actions)) exit('No such action. Please use help to see available options');

if (actions[program.action].isFileRequired) {
  console.log(1);
  if (!program.file) exit('This action requires file path to be provided with --file option');
  actions[program.action].fn(program.file);
} else if((actions[program.action].isPathRequired)) {
  console.log(2);
  if (!program.path) exit('This action requires directory path to be provided with --path option');
  actions[program.action].fn(program.path);
} else {
  actions[program.action].fn(program.args[0]);
}
