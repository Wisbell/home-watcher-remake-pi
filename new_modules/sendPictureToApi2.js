const axios = require('axios');
const CancelToken = axios.CancelToken;
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

    // If connection is valid the Timeout Logic block will get executed.
    let source = CancelToken.source();
    setTimeout(() => {
      source.cancel();
      // Timeout Logic
      console.log('Server is offline');
    }, 3000);


    const postRequest = await axios.post(
      `${apiUrl}/images`, 
      imageModel, 
      { 
        timeout: 3000,
        cancelToken: source.token
      }
    ).catch( error => {
      console.log('Error saving picture to database.');
    });

    if (postRequest)
      console.log('Saving picture to database successful.');

  } catch (error) {
    throw error;
  };
}

