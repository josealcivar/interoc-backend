'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */



    /**
     * ?  metodo para crear un nuevo usuario
     * @param {*} ll_user //* se envia los datos del usuario para ser creado
     * @param {*} transaction //* se envia la transaccion para confirmar el query Commit
     */



    static async CreateUser(ll_user, transaction) {
      return new Promise((resolve, reject) => {
        return User.create(ll_user, {
          transaction
        }).then(result => {
          const user = this.CreateAuthUser(result, transaction);
          return resolve(result);
        }).catch(fail => {
          return reject(fail);
        });
      });
    }


    static async findUsers(ll_user) {
      return new Promise((resolve, reject) => {
        return User.findOne({
          username: ll_user
        }).then(result => {
          return resolve(result);
        }).catch(fail => {
          return reject(fail);
        });
      });
    };


    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};