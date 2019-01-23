import EventEmitter from 'events';
import fs from 'fs';
const fsPromises = fs.promises;

export default class DirWatcher extends EventEmitter {
  filesInDir = new Set();

  async _getNewFilesByPath(path) {
    const newFiles = [];
    try {
      const files = await fsPromises.readdir(path);
      await Promise.all(files.map(async file => {
        const filePath = `${path}${file}`;
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
      const newFiles = await this._getNewFilesByPath(path);
      if (newFiles && newFiles.length) {
        this.emit('changed', newFiles);
      }
    }, delay);
  }
}
