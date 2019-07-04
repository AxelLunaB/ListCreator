'use strict';
module.exports = (sequelize, DataTypes) => {
  const units = sequelize.define('clusters', {
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.INTEGER, allowNull: false }
  }, {});
  units.associate = function(models) {
    // associations can be defined here
  };
  return clusters;
};
