const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
//const post = require('../post/components/post/network');

const errors = require('../network/error');

const swaggerUI = require('swagger-ui-express');

const app = express();
const swaggerDoc = require("./swagger.json");

app.use(bodyParser.json());

// ROUTER
app.use('/api/user', user);
app.use('/api/auth', auth);
//app.use('/api/post', post);
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc));


//manejo de errores middleware
app.use(errors);



app.listen(config.api.port, () => {
    console.log("escuchando en el puerto:", config.api.port);
});