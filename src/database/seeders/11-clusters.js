'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: available, sold, reserved
      */
    return queryInterface.bulkInsert('clusters', [
      {
        name: 'PUNTO MADEIRA',
        code: 1,
        abb: 'MAD',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'CARMELINA',
        code: 2,
        abb: 'CAR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'OPORTO',
        code: 3,
        abb: 'OPO',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', 0, {});
    */
  }
};
