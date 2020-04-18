const { takePicture2 } = require('./takePicture2');
const { readPictureFile2 } = require('./readPictureFile2');
const { sendPictureToApi2 } = require('./sendPictureToApi2');
const { deletePictureFile } = require('./deletePictureFile');

// Set flag variable to prevent overloading the Raspberry Pi
let processingImage = false;

module.exports.startPictureProcess = async () => {
  try {
    if (!processingImage) {
      console.log('Starting picture process');

      processingImage = true;

      var pathToNewPicture = takePicture2();

      const readPicture = readPictureFile2(pathToNewPicture);

      // Note: Storing picture as string in order to avoid storing to disk
      const pictureAsBase64String = readPicture.toString('base64');

      await sendPictureToApi2(pictureAsBase64String, pathToNewPicture);
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
