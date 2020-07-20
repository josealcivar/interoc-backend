const jwt = require('jsonwebtoken');
const User = require('../database/models');
//const User = require('../models/User');

export const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.SECRET_KEY_SESSION);
    try {
        const user = await User.GetUser({
            _id: data._id,
            'tokens.token': token
        });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({
            error: 'Not authorized to access this resource'
        });
    }

};