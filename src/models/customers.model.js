'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const customers = sequelizeClient.define('customers', {
    name: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false},
    age: { type: DataTypes.INTEGER, allowNull: false },
    address: { type: DataTypes.STRING},
    contactNumber: { type: DataTypes.STRING, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    country: { type: DataTypes.STRING},
    state: { type: DataTypes.STRING},
    city: { type: DataTypes.STRING},
    password: { type: DataTypes.STRING, allowNull: true },
    userType: { type: DataTypes.STRING, allowNull: false },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {});
  customers.associate = function(models) {
    
  };
  return customers;
};
