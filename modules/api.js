const axios = require('axios');
const config = require('config');
const apiUrl = config.get('api').url;

module.exports.sendPictureToApi = ( pictureBase64Encoded, imageFileName ) => {
  console.log('Sending picture to', apiUrl);

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
      return reject(error);
    });

    if (!postRequest)
      return reject();

    console.log('Saving picture to database successful.');
    return resolve();
  })
}
