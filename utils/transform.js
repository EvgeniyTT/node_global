const { Transform } = require('stream');

export const toUpper = new Transform({
  transform(chunk, encoding, callback) {
    var upperChunk = chunk.toString().toUpperCase();
    this.push(upperChunk);
    callback();
  }
});

export const reverse = new Transform({
  transform(chunk, encoding, callback) {
    var reverseChunk = [...chunk.toString()].reverse().join('');
    this.push(reverseChunk);
    callback();
  }
});

