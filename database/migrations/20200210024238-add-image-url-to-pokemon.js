'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'Pokemons',
      'image_url',
      Sequelize.STRING
    );    

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Pokemons',
      'image_url'
    );    
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
