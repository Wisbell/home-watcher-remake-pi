
const { unlink } = require('fs');

/**
 * Removes picture from file system at specified file path
 */
module.exports.deletePictureFile = (pathToPicture) => {
  console.log("Deleting picture");

  return new Promise ((resolve, reject) => {
    unlink(pathToPicture, (err) => {
      if (err) return console.log(err);
      console.log("Picture deleted successfully");
      resolve();
    });
  });
}
