const axios = require('axios');
const apiUrl = 'http://192.168.1.2:3000';

module.exports.sendPictureToApi = ( {dataBuffer, filePath}, imageFileName ) => {
  console.log('FilePath in api.js', filePath);
  console.log('DataBuffer in api.js', dataBuffer);

  return new Promise( async (resolve, reject) => {
    const imageModel = {
      dateCreated: new Date(),
      name: imageFileName,
      image: dataBuffer
    }
  
    await axios.post(`${apiUrl}/images`, imageModel);

    resolve();
  })
}
