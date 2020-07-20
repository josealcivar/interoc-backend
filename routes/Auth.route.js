'use strict';
var express = require('express');
var router = express.Router();
var controller_User = require('../api/user/controller-user');

/* POST users listing. */
router.post('/register', controller_User.register);

router.post('/login', function (req, res, next) {
    res.send('respond with a login');
});

router.post('/refresh-token', function (req, res, next) {
    res.send('respond with a refresh token');
});

router.post('/logout', function (req, res, next) {
    res.send('respond with a refresh token');
});

module.exports = router;