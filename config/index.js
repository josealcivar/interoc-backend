require('dotenv').config();

const config = {
    secretKeySession: process.env.SECRET_KEY_SESSION,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET
};

module.exports = {
    config: config
};