
const { unlinkSync } = require('fs');

/**
 * Removes picture from file system at specified file path
 */
module.exports.deletePictureFile = (pathToPicture) => {
  try {
    console.log("Deleting picture");
    unlinkSync(pathToPicture);
    console.log("Picture deleted successfully");
  } catch (error) {
    console.log("Error while deleting picture");
    throw error;
  }
}
