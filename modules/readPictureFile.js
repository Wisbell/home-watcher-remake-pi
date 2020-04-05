const fs = require('fs');

module.exports.readPictureFile = (filePath) => {
  return new Promise( (resolve, reject) => {
    fs.readFile(filePath, (err, dataBuffer) => {
      if(err) reject(err);
      else {
        console.log('Done reading picture');
        resolve( { dataBuffer, filePath });
      }
    });
  });
}
