'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const commissions = sequelizeClient.define('commissions', {
    managementCommissions: { type: DataTypes.DOUBLE},
    salesExecutivesCommissions: { type: DataTypes.DOUBLE},
    salesAdministrativeCommissions: { type: DataTypes.DOUBLE},
    thirdPartyCommissions: { type: DataTypes.DOUBLE},
    brokerCommissions: { type: DataTypes.DOUBLE},
    totalCommissions: { type: DataTypes.DOUBLE},
  }, {});
  commissions.associate = function(models) {
    commissions.belongsTo(models.status);
    commissions.belongsTo(models.users);
  };
  return commissions;
};
