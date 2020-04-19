const { unlinkSync, readdirSync } = require('fs');
const { deletePictureFile } = require('./deletePictureFile');
const path = require('path');

/**
 * Clears all pictures from the image folder to prevent using
 * up too much of the RPI storage
 */
module.exports.clearImageFolder = () => {
  try {
    console.log("Clearing Image folder");

    const imagesDir = path.join(__dirname, '..', 'images');

    // Get number of files in image directory
    let files = readdirSync(imagesDir);
    
    if(files.length > 1) {
      // Get all jpg files
      files = files.filter(file => {
        const fileType = file.split('.').pop();

        if (fileType === 'jpg')
          return true;
        return false;
      });
      
      // Delete all jpg files
      files.forEach(file => {
        const pathToImage = path.join(imagesDir, file);
        deletePictureFile(pathToImage);
      });
    }

    console.log("Image folder cleared successfully");
  } catch (error) {
    console.log("Error while clearing image folder");
    throw error;
  }
}
