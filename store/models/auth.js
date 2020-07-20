'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Auth = sequelize.define('Auth', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    estado: {
      type: DataTypes.STRING,
      defaultValue: 'A'
    }
  }, {});
  Auth.associate = function (models) {
    // associations can be defined here
  };


  Auth.CreateAuthUser = (usuario, transaction) => {
    console.log("directo a crear un user auth");
    console.log(usuario);
    return new Promise((resolve, reject) => {
      return Auth.create(usuario, {
        transaction
      }).then(result => {
        return resolve(result);
      }).catch(fail => {
        console.log(fail);
        return reject(fail);
      });
    });
  };



  return Auth;
};