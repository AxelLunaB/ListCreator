'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const units = sequelizeClient.define('units', {
    unitNumber: DataTypes.STRING,
    phase: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    bedrooms: DataTypes.STRING,
    nkeys: DataTypes.INTEGER,
    bathrooms: DataTypes.STRING,
    interiorM2: DataTypes.DOUBLE,
    exteriorM2: DataTypes.DOUBLE,
    roofInteriorM2: DataTypes.DOUBLE,
    roofExteriorM2: DataTypes.DOUBLE,
    totalInteriorM2: DataTypes.DOUBLE,
    totalM2Double: DataTypes.DOUBLE,
    priceInteriorM2: DataTypes.DOUBLE,
    priceTotalM2: DataTypes.DOUBLE,
    priceTotalM2: DataTypes.DOUBLE,
    priceTotal: DataTypes.DOUBLE,
    unitType:DataTypes.STRING,
    furniture:DataTypes.FLOAT
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });
  units.associate = function(models) {
    units.belongsTo(models.clusters);
    units.belongsTo(models.status);
  };
  return units;
};
