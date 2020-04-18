const fs = require('fs');

/**
 * Read contents of picture file
 * @returns {Buffer} of image data
 */
module.exports.readPictureFile = (filePath) => {
  try {
    console.log('Reading picture');
    return fs.readFileSync(filePath);
  } catch (error) {
    console.log('Error reading picture');
    throw error;
  }
}
