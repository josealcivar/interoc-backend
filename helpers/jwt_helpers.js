const JWT = require('jsonwebtoken');
const boom = require('@hapi/boom');
var createError = require('http-errors');
const config = require('../config');
const {
    Unauthorized
} = require('http-errors');

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            // aud: userId,
        };
        const secrectkey = config.secretKeySession;
        console.log(secrectkey);
        const options = {
            expiresIn: "60",
            issuer: "pickurpage.com",
            audience: userId
        };
        JWT.sign(payload, secrectkey, options, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};

const verifyAccessToken = (req, res, next) => {
    if (!req.header['athorization']) return next(createError.Unauthorized());
    const authHeader = req.header['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    JWT.verify(token, config.accessTokenSecret, (err, payload) => {
        if (err) {
            const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
            return next(createError.Unauthorized(message));
        }
        req.payload = payload;
        next();
    });
};

const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            // aud: userId,
        };
        const secrectkey = config.refreshTokenSecret;
        const options = {
            expiresIn: "60",
            issuer: "pickurpage.com",
            audience: userId
        };
        JWT.sign(payload, secrectkey, options, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};

const verifyRefreshToken = (refreshToken) => {

    return new Promise((resolve, reject) => {
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) return reject(createError.Unauthorized());
            const userId = payload.aud;
            resolve(userId);
            // req.payload = payload;
            // next();
        });
    });
    if (!req.header['athorization']) return next(createError.Unauthorized());
    const authHeader = req.header['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];


};

module.exports = {
    signAccessToken: signAccessToken,
    verifyAccessToken: verifyAccessToken,
    signRefreshToken: signRefreshToken,
    verifyRefreshToken: verifyRefreshToken,
};