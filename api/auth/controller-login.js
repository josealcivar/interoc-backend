/**
 * 
 * * funcion para auntenticar a usuario
 */

const jwt = require('jsonwebtoken');
const config = require('./config');
var createError = require('http-errors');
const authSchema = require('../../helpers/validation_schema');
const model = require('../../store/models');
const {
    noExtendLeft
} = require('sequelize/types/lib/operators');
const {
    signAccessToken,
    signRefreshToken
} = require('../../helpers/jwt_helpers');

const login = async (req, res, next) => {

    try {
        const result = await authSchema.validateAsync(req.body);
        const user = await model.User.getUser();
        if (!user) throw createError.NotFound('User not registered');
        const validate = await bcrypt.compare(user.password, result.password);
        if (!validate) throw createError.Unauthorized('Username/password not valid');

        const accessToken = await signAccessToken(newuser.id);
        const refreshToken = await signRefreshToken(newuser.id);
        res.send(accessToken);
    } catch (error) {
        if (error.isJoi === true) return noExtendLeft(createError.BadRequest("Invalido Username o password"));
        next(error);
    }

};


const refresh = async (req, res, next) => {

    try {
        const result = await authSchema.validateAsync(req.body);
        const user = await model.User.getUser();
        if (!user) throw createError.NotFound('User not registered');
        const validate = await bcrypt.compare(user.password, result.password);
        if (!validate) throw createError.Unauthorized('Username/password not valid');

        const accessToken = await signAccessToken(newuser.id);
        const refreshToken = await signRefreshToken(newuser.id);
        res.send(accessToken);
    } catch (error) {
        if (error.isJoi === true) return noExtendLeft(createError.BadRequest("Invalido Username o password"));
        next(error);
    }

};

module.exports = {
    login: login,
    refresh: refresh,
}