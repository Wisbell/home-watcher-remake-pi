const fs = require('fs');

/**
 * Read contents of picture file
 * @returns {Buffer} of image data
 */
module.exports.readPictureFile = (filePath) => {
  // return new Promise( (resolve, reject) => {
  //   fs.readFile(filePath, (err, dataBuffer) => {
  //     if(err) reject(err);
  //     else {
  //       console.log('Done reading picture');
  //       // resolve( { dataBuffer, filePath });
  //       resolve( dataBuffer );
  //     }
  //   });
  // });

  fs.readFileSync(filePath, (err, dataBuffer) => {
    if(err) throw err;
    else {
      console.log('Done reading picture');
      return dataBuffer;
      }
  });
}
