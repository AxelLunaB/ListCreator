'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const status = sequelizeClient.define('status', {
    name: { type: DataTypes.STRING, allowNull: false },
    color_hex: { type: DataTypes.STRING, allowNull: false }
  }, {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    });
  status.associate = function(models) {
    // associations can be defined here
  };
  return status;
};
