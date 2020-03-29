let { takePicture } = require('./modules/takePicture');
let { readPictureFile } = require('./modules/readPictureFile');
// let { sendPictureToAWS, checkStorageAmount } = require('./modules/awsS3')
// let { postData } = require('./modules/postDataToMongoDB')
// let { deletePictureFile } = require('./modules/removePictureFile.js')

// Set flag variable to prevent overloading the Raspberry Pi
let processingImage = false;

module.exports.startPictureProcess = async () => {

  // Check to see if an image is currently being processed
  if (!processingImage) {

    processingImage = true;
    let currentImageFile;

    // Take Picture

    const pathToNewPicture = await takePicture();

    // currentImageFile = pathToNewPicture;

    console.log('pathToNewPicture', pathToNewPicture);

    // const readPicture = await readPictureFile(pathToNewPicture);

    // console.log('readPicture', readPicture);

    // processingImage = false; // un comment this

    // Send picture to API endpoint


    // Delete Picture




    // takePicture()
    //   // Read picture file
    //   .then( (filePath) => {
    //     currentImageFile = filePath
    //     return readPictureFile(filePath)
    //   })
    //   // Send picture to AWS S3
    //   .then( (dataObject) => {
    //     return sendPictureToAWS(dataObject)
    //   })
    //   // Send returned URL and data to MongoDB
    //   .then( (data) => {
    //     return postData(data)
    //   })
    //   // Delete picture file on RPI -- Switch readFile to readStream to avoid this step?
    //   .then( () => {
    //     return deletePictureFile(currentImageFile)
    //   })
    //   // reset processingImage flag variable
    //   .then( () => {
    //     processingImage = checkStorageAmount()
    //   })

  } // Closes if statement for proccessing image
}
