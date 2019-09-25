'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const payments = sequelizeClient.define('payments', {
    totalPayments: { type: DataTypes.DOUBLE},
    totalSale: { type: DataTypes.DOUBLE},
    totalToPay: { type: DataTypes.DOUBLE},
    differencePayments: { type: DataTypes.DOUBLE}
  }, {});
  payments.associate = function(models) {
    // payments.hasMany(models.paymentsDetails);
  };
  return payments;
};
