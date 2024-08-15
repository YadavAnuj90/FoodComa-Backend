const { CLOUDENRY_CLOUD_NAME, CLOUDENRY_API_KEY, CLOUDENRY_API_SECRET } = require('./serverConfig');

const cloudinary = require('cloudinary').v2;

//configure cloudinary 
cloudinary.config({
    cloud_name: CLOUDENRY_CLOUD_NAME,
    api_key: CLOUDENRY_API_KEY,
    api_secret: CLOUDENRY_API_SECRET
});

module.exports = cloudinary;