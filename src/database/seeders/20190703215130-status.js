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
        color_hex: '#35ce41',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SOLD',
        color_hex: '#cd110f',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'RESERVED',
        color_hex: '#e89005',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'NOT PAID',
        color_hex: '#f5e02a',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'PAID',
        color_hex: '#7ddc0f',
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
