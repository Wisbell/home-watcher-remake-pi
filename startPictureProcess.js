const { takePicture } = require('./modules/takePicture');
const { readPictureFile } = require('./modules/readPictureFile');
const { sendPictureToApi } = require('./modules/api');
const { deletePictureFile } = require('./modules/removePictureFile.js');

const fs = require('fs');

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

    // Note: Storing picture as string in order to avoid storing in disk
    const pictureAsString = readPicture.dataBuffer.toString('base64');

    fs.writeFileSync('./test.txt', pictureAsString);


    const imageFileName = currentImageFilePath
      .split('/')
      .pop();

    // Send picture to API endpoint
    // await sendPictureToApi(readPicture, imageFileName);

    // Delete Picture
    // await deletePictureFile(currentImageFilePath);

    // processingImage = false;

  } // Closes if statement for proccessing image
}
