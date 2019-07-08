'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: available, sold, reserved
      */
    return queryInterface.bulkInsert('status', [
      {
        name: 'AVAILABLE',
        color_hex: '#ffffff',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SOLD',
        color_hex: '#5c151e',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'RESERVED',
        color_hex: '#15275c',
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
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
