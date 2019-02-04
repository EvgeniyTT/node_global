import EventEmitter from 'events';
import fs from 'fs';
const fsPromises = fs.promises;

export default class DirWatcher extends EventEmitter {
  filesInDir = new Set();

  async getNewFilesByPath(path) {
    const pathWithEndingSlash = path[-1] === '/' ? path : path + '/';
    const newFiles = [];
    try {
      const files = await fsPromises.readdir(path);
      await Promise.all(files.map(async file => {
        const filePath = `${pathWithEndingSlash}${file}`;
        const stats = await fsPromises.lstat(filePath);
        if(stats.isFile && !this.filesInDir.has(filePath)) {
          this.filesInDir.add(filePath);
          newFiles.push(filePath);
        }
      }));

      return newFiles;
    } catch(err) {
      console.error(`Error in reading directory ${path}: ${err}`);
    }
  }
  
  watch(path, delay) {
    setInterval(async () => {
      const newFiles = await this.getNewFilesByPath(path);
      if (newFiles && newFiles.length) {
        this.emit('changed', newFiles);
      }
    }, delay);
  }
}
