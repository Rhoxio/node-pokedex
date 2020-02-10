'use strict';
const request = require('request');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const count = 10;
    let promises = [];
    for (var i = 0; i < count; i++){
      const promise = new Promise(function(resolve, reject) {
        request('https://pokeapi.co/api/v2/pokemon/6', {json: true}, (err, res, body) => {
          resolve(body)
        })
        
      });
      promises.push(promise)
    }


    Promise.all(promises).then(function(values) {
      console.log(values);
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
