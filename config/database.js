/**
 * ?archivo de configuracion de conexiones y operadores SQL 
 * ?este archivo permmite definir difenretes conexiones a las bases de datos.
 */

const fs = require('fs');

const sequelize = require('sequelize');
const Op = sequelize.Op;

let operadores = {

  $and: Op.and,
  $or: Op.or,
  $eq: Op.eq,
  $gt: Op.gt,
  $lt: Op.lt,
  $lte: Op.lte,
  $like: Op.like
};

module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'INTEROC_DEV',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    "operatorsAliases": operadores,
    "logging": false,
    // dialectOptions: {
    //   bigNumberStrings: true
    // }
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    "operatorsAliases": operadores,
    // dialectOptions: {
    //   bigNumberStrings: true
    // }
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'mysql',
    "operatorsAliases": operadores,
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        //  ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
      }
    }
  }
};