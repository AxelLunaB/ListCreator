'use strict';
module.exports = (sequelize, DataTypes) => {
  const units = sequelize.define('executives', {
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    contactNumber: { type: DataTypes.INTEGER, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    userType: { type: DataTypes.STRING, allowNull: false },

  }, {});
  units.associate = function(models) {
    // associations can be defined here
  };
  return executives;
};
