'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const paymentsDetails = sequelizeClient.define('paymentsDetails', {
    paymentNo: { type: DataTypes.INTEGER},
    dueDate: { type: DataTypes.STRING},
    paymentDate: { type: DataTypes.STRING}
  }, {});
  paymentsDetails.associate = function(models) {
    paymentsDetails.belongsTo(models.status);
  };
  return paymentsDetails;
};
