'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const contracts = sequelizeClient.define('contracts', {
    id: { type: DataTypes.INTEGER, primaryKey: true},
    closingDate: { type: DataTypes.STRING},
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
    contracts.belongsTo(models.commissions);
    contracts.belongsTo(models.payments);
    contracts.belongsTo(models.salesDetails);
  };
  return contracts;
};
