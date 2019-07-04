'use strict';
module.exports = (sequelize, DataTypes) => {
  const units = sequelize.define('users', {
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    contactNumber : { type: DataTypes.INTEGER, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    country: { type: DataTypes.INTEGER, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    userType: { type: DataTypes.STRING, allowNull: false },

  }, {});
  units.associate = function(models) {
    // associations can be defined here
  };
  return users;
};
