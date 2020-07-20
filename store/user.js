'use strict';
const modelAuth = require('./models/auth');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: 'A'
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };


  User.CreateUser = (ll_user, transaction) => {
    return new Promise((resolve, reject) => {
      return User.create(ll_user, {
        transaction
      }).then(result => {
        console.log("result");
        console.log(result);
        const user = modelAuth.CreateAuthUser(result, transaction);
        return resolve(result);
      }).catch(fail => {
        return reject(fail);
      });
    });
  }


  User.findUsers = (ll_user) => {
    return new Promise((resolve, reject) => {
      return User.findOne({
        where: {
          username: ll_user
        }

      }).then(result => {
        return resolve(result);
      }).catch(fail => {
        return reject(fail);
      });
    });
  };



  return User;
};