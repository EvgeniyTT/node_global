import config from './config/config.json';
import {
  DirWatcher,
  Importer,
  Product,
  User,
} from './models';

const dataFolder = './data/';

const user = new User();
const product = new Product();
const dirWatcher = new DirWatcher();
const importer = new Importer();

console.log(config);
console.log(user);
console.log(product);

dirWatcher.on('changed', filePaths=> {
  filePaths.forEach(filePath =>  {
    importer.import(filePath)
      .then(file => console.log(`ASYNC: ${filePath} - ${JSON.stringify(file)}`))
      .catch(err => console.error(`Error on importing file by path ${filePath}: ${err}`));

    console.log(`SYNC: ${filePath} - ${JSON.stringify(importer.importSync(filePath))}`);
  });
});

dirWatcher.on('error', err => {
  console.error('Error in dirWatcher: ', err);
});

dirWatcher.watch(dataFolder, 1000);
