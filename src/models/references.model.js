'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const references = sequelizeClient.define('references', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    reserveDate: { type: DataTypes.DATE},
    reserveExpiration: { type: DataTypes.DATE}
  }, {});
  references.associate = function(models) {
    references.belongsTo(models.customers);
    references.belongsTo(models.status);
  };
  return references;
};
