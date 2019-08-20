'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('clusters', [
      {
        name: 'BRAVA TOWER',
        code: 1,
        abb: 'BT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'GIADA TOWERS A',
        code:2,
        abb:'A',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name:'GIADA TOWERS B',
        code:3,
        abb:'B',
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ], {});
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
