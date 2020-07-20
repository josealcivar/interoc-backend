'use strict';

var createError = require('http-errors');

const sequelize = require('../../store/models').sequelize;
const model = require('../../store/models');
const bcrypt = require('bcrypt');

const {
    signAccessToken,
    signRefreshToken
} = require('../../helpers/jwt_helpers');
const {
    authSchema
} = require('../../helpers/validation_schema');

const register = async (req, res, next) => {

    let t = await inicializarTransaccion();
    try {
        const {
            firstName,
            lastName,
            username,
            password,
        } = req.body;
        // if (!user || !password) throw createError.BadRequest();
        const data_validate = authSchema.validateAsync(username, password);
        console.log("data_validate");
        console.log(req.body);
        const doesExist = await model.User.findUsers(data_validate);
        console.log(doesExist);
        if (doesExist) throw createError.Conflict(`${username} este usuario ya se encuentra registrado`);
        const usuario = await model.User.CreateUser(req.body, t);
        const auth = {
            id: usuario.id,
            username: usuario.username,
            password: req.body.password
        };
        // await bcrypt.genSalt(10).then(salt => {
        //     bcrypt.hash(usuario.password, salt).then(hash => {
        //         auth.password = hash;
        //     });
        // });
        auth.password = bcrypt.hashSync(auth.password, 10);
        console.log("auth");
        console.log(auth);
        const ususerio_creado = await model.Auth.CreateAuthUser(auth, t);

        // const newuser = model.User.CreateUser({
        //     data_validate
        // }); 

        const accessToken = await signAccessToken(ususerio_creado.id);
        const refreshToken = await signRefreshToken(ususerio_creado.id);
        t.commit();
        res.send("created");

    } catch (error) {
        if (error.isJoiv === true) error.status = 422;
        next(error);
    }
};


function inicializarTransaccion() {
    return new Promise((resolve, reject) => {
        sequelize.transaction({
                autocommit: false
            }).then(result => {
                return resolve(result);
            })
            .catch(fail => {
                return reject(fail);
            });
    });
};



module.exports = {
    register: register,
};