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
        name: '1-A',
        code: '1-A',
        abb: '1-A',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '1-B',
        code: '1-B',
        abb: '1-B',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '2',
        code: '2',
        abb: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '3',
        code: '3',
        abb: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '4',
        code: '4',
        abb: '4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '5',
        code: '5',
        abb: '5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '6',
        code: '6',
        abb: '6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '7',
        code: '7',
        abb: '7',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '9',
        code: '9',
        abb: '9',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '10',
        code: '10',
        abb: '10',
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
