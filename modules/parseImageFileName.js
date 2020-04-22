/**
 * Parse image file name from path to image
 * @argument pathToImage
 */
module.exports.parseImageFileName = ( pathToImage ) => {
  try {
    return pathToImage.split('/').pop();
  } catch (error) {
    console.log('Error parsing image file name from file path');
    throw error;
  }
}