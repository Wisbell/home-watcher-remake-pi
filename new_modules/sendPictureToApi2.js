const axios = require('axios');
const config = require('config');
const apiUrl = config.get('api').url;
const { deletePictureFile } = require('./deletePictureFile');
const { parseImageFileName } = require('./parseImageFileName');

/**
 * Send picture as base64 string to API
 * @argument pictureBase64Encoded
 * @argument pathToNewPicture
 */
module.exports.sendPictureToApi2 = async ( pictureBase64Encoded, pathToNewPicture ) => {
  try {
    console.log('Sending picture to', apiUrl);
    const imageFileName = parseImageFileName(pathToNewPicture);

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
    });

    if (postRequest)
      console.log('Saving picture to database successful.');

  } catch (error) {
    throw error;
  };
}

