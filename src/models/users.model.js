'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    contactNumber : { type: DataTypes.INTEGER, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.INTEGER, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    userType: { type: DataTypes.STRING, allowNull: false },

  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};
