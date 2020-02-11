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
        name: 'DISPONIBLE',
        color_hex: '#35ce41',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'VENDIDO',
        color_hex: '#cd110f',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'PENDIENTE',
        color_hex: '#f5e02a',
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
