const axios = require('axios');
const config = require('config');
const apiUrl = config.get('api').url;
const { deletePictureFile } = require('./removePictureFile.js');

/**
 * Send picture as base64 string to API
 * @argument pictureBase64Encoded
 * @argument imageFileName
 */
// module.exports.sendPictureToApi = ( pictureBase64Encoded, imageFileName ) => {
module.exports.sendPictureToApi = ( pictureBase64Encoded, currentImageFilePath ) => {
  console.log('Sending picture to', apiUrl);

  const imageFileName = currentImageFilePath
    .split('/')
    .pop();

  return new Promise( async (resolve, reject) => {
    const imageModel = {
      dateCreated: new Date(),
      name: imageFileName,
      image: pictureBase64Encoded
    }
  
    const postRequest = await axios.post(
      `${apiUrl}/images`, 
      imageModel, 
      { timeout: 2000 }
    ).catch( error => {
      console.log('Error saving picture to database.');
      reject(error);
    });

    if (!postRequest) {
      await deletePictureFile(currentImageFilePath);
      return reject();
    }

    console.log('Saving picture to database successful.');
    return resolve();
  })
}
