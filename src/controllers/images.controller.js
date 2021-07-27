const catchAsync = require('../utils/catchAsync');
const fetch = require('node-fetch');
const { object, array } = require('joi');

const getImages = catchAsync(async (req, res) => {
  const urlImages = 'https://my-json-server.typicode.com/coing-dev/photo-api/images';
  const resultImg = await fetch(urlImages);
  const dataImg = await resultImg.json();
  const urlPhoto = 'https://my-json-server.typicode.com/coing-dev/photo-api/photos';
  const resultPhoto = await fetch(urlPhoto);
  const dataPhoto = await resultPhoto.json();
  const newDataImg = dataImg[0].map((img) => {
    img['url'] = img['path'];
    delete img['path'];
    return img;
  });
  const newDataPhoto = dataPhoto[0].map((pho, index) => {
    pho['id'] = newDataImg.length + index;
    return pho;
  });
  const margResult = [...newDataImg, ...newDataPhoto];
  res.send(margResult);
  /**
   * TODO CALL TO OUTSIDE API
   * AND RETURN THE VALID RESPONSE
   */
});

module.exports = {
  getImages,
};
