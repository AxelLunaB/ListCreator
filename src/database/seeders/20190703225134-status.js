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
        name: 'NOT DONE',
        color_hex: '#35ce41',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'DONE',
        color_hex: '#cd110f',
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
