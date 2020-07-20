'use strict';
module.exports = (sequelize, DataTypes) => {
  const CatalogoViaje = sequelize.define('CatalogoViaje', {
    description: DataTypes.STRING,
    estado: DataTypes.STRING
  }, {});
  CatalogoViaje.associate = function(models) {
    // associations can be defined here
  };
  return CatalogoViaje;
};