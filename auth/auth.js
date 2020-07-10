const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

//const error = require('../utils/error');

const secret = config.jwt.secret;

const sign = (data) => jwt.sign(JSON.stringify(data), secret);


const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);
        if (decoded.id !== owner) {
            //throw new Error('NO puedes realizar esta operacion');

            // se ejecuta un error personalizado de utils
            throw error('NO puedes realizar esta operacion', 401);
        } else {

            return true;
        }

    },
    logged: function (req, owner) {
        const decoded = decodeHeader(req);
    },
};


/**
 * @description esta verificacion solo es con la clave secreta.
 *              de la aplicación 
 * @param {*} token 
 */
const verify = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error('errores:' + error.message);
    }

};

// obtiene el token de la petición para hacer la verificacion de permisos.
/**
 * @description obtiene el token de la peticion para hacer la verificacion de permisos.
 * @author jose alcivar
 * @param {authorization} auth 
 */
const getToken = (auth) => {

    if (!auth) {
        throw new Error('No viene token', 401);
    } else if (auth.indexOf("Bearer ") === -1) {
        throw new Error('Formato invalido');
    }
    let token = auth.replace('Bearer ', '');
    return token;
};

/**
 * @description funcion para obtenerel token de permiso
 * @param {request} req 
 */
const decodeHeader = (req) => {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    console.log("VERIFY DE token -- decoded");
    console.log(decoded);
    return decoded;
};


module.exports = {
    sign,
    check
};