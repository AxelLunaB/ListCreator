'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const leads = sequelizeClient.define('leads', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
  }, {});
  leads.associate = function(models) {
    leads.belongsTo(models.customers);
  };
  return leads;
};