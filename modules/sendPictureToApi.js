const axios = require('axios');
const CancelToken = axios.CancelToken;
const config = require('config');
const apiUrl = config.get('homeWatcherApi').url;
const { parseImageFileName } = require('./parseImageFileName');

/**
 * Send picture as base64 string to API
 * @argument pictureBase64Encoded
 * @argument pathToNewPicture
 */
module.exports.sendPictureToApi = async ( pictureBase64Encoded, pathToNewPicture ) => {
  try {
    console.log('Sending picture to', apiUrl);
    const imageFileName = parseImageFileName(pathToNewPicture);

    const imageModel = {
      dateCreated: new Date(),
      name: imageFileName,
      image: pictureBase64Encoded
    }

    // Note: Axios timeout does not work with connection timeouts hence the cancel token
    // If connection is valid the Timeout Logic block will get executed.
    let source = CancelToken.source();
    setTimeout(() => {
      source.cancel();
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

