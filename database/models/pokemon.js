'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pokemon = sequelize.define('Pokemon', {
    name: DataTypes.STRING,
    nationalId: DataTypes.INTEGER,
    image_url: DataTypes.STRING
  }, {});
  Pokemon.associate = function(models) {
    // associations can be defined here
    Pokemon.belongsToMany(models.Type, {
      through: models.PokemonType,
      as: 'types',
      foreignKey: 'pokemon_id'
    });
  };
  return Pokemon;
};