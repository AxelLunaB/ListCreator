'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('units', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.STRING
      },
      unit: {
        type: Sequelize.STRING
      },
      phase: {
        type: Sequelize.INTEGER
      },
      buildingid: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER
      },
      bedrooms: {
        type: Sequelize.INTEGER
      },
      nkeys: {
        type: Sequelize.INTEGER
      },
      bathrooms: {
        type: Sequelize.INTEGER
      },
      interiorm2: {
        type: Sequelize.DOUBLE
      },
      exteriorm2: {
        type: Sequelize.DOUBLE
      },
      roofinteriorm2: {
        type: Sequelize.DOUBLE
      },
      roofexteriorm2: {
        type: Sequelize.DOUBLE
      },
      totalinteriorm2: {
        type: Sequelize.DOUBLE
      },
      totalm2double: {
        type: Sequelize.DOUBLE
      },
      priceinteriorm2: {
        type: Sequelize.DOUBLE
      },
      pricetotalm2: {
        type: Sequelize.DOUBLE
      },
      pricetotal: {
        type: Sequelize.DOUBLE
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('units');
  }
};
