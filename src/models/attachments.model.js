'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const attachments = sequelizeClient.define('attachments', {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    contentType: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING(400), allowNull: false },
    size: { type: DataTypes.STRING, allowNull: false },
    docType: { type: DataTypes.STRING, allowNull: false }
  }, {});

  attachments.associate = function(models) {
    attachments.belongsTo(models.units);
    attachments.belongsTo(models.customers);
  };

  return attachments;
};
