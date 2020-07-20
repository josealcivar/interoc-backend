'use strict';
module.exports = (sequelize, DataTypes) => {
  const RubroViatico = sequelize.define('RubroViatico', {
    descripcion: DataTypes.STRING,
    valor: DataTypes.DECIMAL,
    estado: DataTypes.STRING
  }, {});
  RubroViatico.associate = function(models) {
    // associations can be defined here
  };
  return RubroViatico;
};