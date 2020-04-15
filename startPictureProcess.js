const { takePicture } = require('./modules/takePicture');
const { readPictureFile } = require('./modules/readPictureFile');
const { sendPictureToApi } = require('./modules/sendPictureToApi');
const { deletePictureFile } = require('./modules/removePictureFile.js');

// Set flag variable to prevent overloading the Raspberry Pi
let processingImage = false;

module.exports.startPictureProcess = async () => {

  if (!processingImage) {

    processingImage = true;
    let currentImageFilePath;

    const pathToNewPicture = await takePicture();

    currentImageFilePath = pathToNewPicture;

    // Note: readPicture = { dataBuffer, filePath }
    const readPicture = await readPictureFile(pathToNewPicture);

    // Note: Storing picture as string in order to avoid storing to disk
    // const pictureAsBase64String = readPicture.dataBuffer.toString('base64');
    const pictureAsBase64String = readPicture.toString('base64');

    // const imageFileName = currentImageFilePath
    //   .split('/')
    //   .pop();

    // await sendPictureToApi(pictureAsBase64String, imageFileName);
    await sendPictureToApi(pictureAsBase64String, currentImageFilePath);

    await deletePictureFile(currentImageFilePath);

    processingImage = false;

  }
}
