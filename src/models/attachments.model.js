'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const attachments = sequelizeClient.define('attachments', {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    contentType: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    size: { type: DataTypes.STRING, allowNull: false }
  }, {});

  attachments.associate = function(models) {
    // associations can be defined here
    attachments.belongsTo(models.units);
  };

  return attachments;
};