
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY:process.env.JWT_EXPIRY,
    CLOUDENRY_CLOUD_NAME:process.env.CLOUDENRY_CLOUD_NAME,
    CLOUDENRY_API_SECRET:process.env.CLOUDENRY_API_SECRET,
    CLOUDENRY_API_KEY:process.env.CLOUDENRY_API_KEY,
    FRONTEND_URL : process.env.FRONTEND_URL


}