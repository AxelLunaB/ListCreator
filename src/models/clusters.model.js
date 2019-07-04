'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const clusters = sequelizeClient.define('clusters', {
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.INTEGER, allowNull: false }
  }, {});
  clusters.associate = function(models) {
    // associations can be defined here
  };
  return clusters;
};
