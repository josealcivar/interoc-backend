'use strict';

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Auth = sequelize.define('Auth', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
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

      const hashed_password = bcrypt.genSalt(10);
      usuario.password = bcrypt.hash(usuario.password, hashed_password);

      return Auth.create(usuario, {
        transaction
      }).then(result => {
        return resolve(result);
      }).catch(fail => {
        return reject(fail);
      });
    });
  };


  return Auth;
};