'use strict';
module.exports = (sequelize, DataTypes) => {
  var Type = sequelize.define('Type', {
    name: DataTypes.STRING
  }, {});
  Type.associate = function(models) {
    Type.belongsToMany(models.Pokemon, {
      through: models.PokemonType,
      as: 'pokemon',
      foreignKey: 'type_id'
    });
  };
  return Type;
};