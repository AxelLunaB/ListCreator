'use strict';
module.exports = (sequelize, DataTypes) => {
  const units = sequelize.define('units', {
    unitNumber: DataTypes.STRING,
    phase: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    bedrooms: DataTypes.INTEGER,
    nkeys: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
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
    status: DataTypes.STRING
  }, {});
  units.associate = function(models) {
    // associations can be defined here
  };
  return units;
};
