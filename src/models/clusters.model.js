'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const clusters = sequelizeClient.define('clusters', {
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false },
    abb: { type: DataTypes.STRING, allowNull: false}
  }, {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    });
  clusters.associate = function(models) {
    // associations can be defined here
  };
  return clusters;
};
