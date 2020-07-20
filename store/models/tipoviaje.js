'use strict';
module.exports = (sequelize, DataTypes) => {
  const TipoViaje = sequelize.define('TipoViaje', {
    description: DataTypes.STRING,
    estado: DataTypes.STRING
  }, {});
  TipoViaje.associate = function(models) {
    // associations can be defined here
  };
  return TipoViaje;
};