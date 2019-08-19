'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const units_historics = sequelizeClient.define('units_historics', {
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });
  units_historics.associate = function(models) {
    // associations can be defined here
  };
  return unitsHistorics;
};
