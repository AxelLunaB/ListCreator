'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const lists = sequelizeClient.define('lists', {
    name: { type: DataTypes.STRING, allowNull: false },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {});
  lists.associate = function(models) {
    // associations can be defined here
  };
  return lists;
};
