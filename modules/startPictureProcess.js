const { takePicture } = require('./takePicture');
const { readPictureFile } = require('./readPictureFile');
const { sendPictureToApi } = require('./sendPictureToApi');
const { deletePictureFile } = require('./deletePictureFile');
const { clearImageFolder } = require('./clearImageFolder');

// Set flag variable to prevent overloading the Raspberry Pi
let processingImage = false;

module.exports.startPictureProcess = async () => {
  try {
    if (!processingImage) {
      console.log('Starting picture process');

      clearImageFolder();

      processingImage = true;

      var pathToNewPicture = takePicture();

      const readPicture = readPictureFile(pathToNewPicture);

      // Note: Storing picture as string in order to avoid storing to disk
      const pictureAsBase64String = readPicture.toString('base64');

      await sendPictureToApi(pictureAsBase64String, pathToNewPicture);
    }
  } catch (error) {
    throw error;
  } finally {
    if (processingImage && pathToNewPicture) {
      deletePictureFile(pathToNewPicture);
      processingImage = false;
      console.log('Ending picture process');
    }
  }
}
