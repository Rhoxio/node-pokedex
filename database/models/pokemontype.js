'use strict';
module.exports = (sequelize, DataTypes) => {
  var PokemonType = sequelize.define('PokemonType', {
    pokemon_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER
  }, {});
  PokemonType.associate = function(models) {
    // associations can be defined here
  };
  return PokemonType;
};