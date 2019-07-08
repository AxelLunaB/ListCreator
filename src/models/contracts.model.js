'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const contracts = sequelizeClient.define('contracts', {
    id: { type: DataTypes.INTEGER, primaryKey: true},
    closingDate: DataTypes.DATE,
    WROI: DataTypes.STRING,
    percent: DataTypes.INTEGER,
    years: DataTypes.INTEGER,
    paymentMethod: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    exchangerate: DataTypes.DOUBLE,
    salesprice: DataTypes.DOUBLE
  }, {});
  contracts.associate = function(models) {
    // associations can be defined here
  };
  return contracts;
};
