'use strict';
module.exports = (sequelize, DataTypes) => {
  const units = sequelize.define('units', {
    unitNumber: DataTypes.STRING,
    phase: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    bedrooms: DataTypes.INTEGER,
    nkeys: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    interiorm2: DataTypes.DOUBLE,
    exteriorm2: DataTypes.DOUBLE,
    roofinteriorm2: DataTypes.DOUBLE,
    roofexteriorm2: DataTypes.DOUBLE,
    totalinteriorm2: DataTypes.DOUBLE,
    totalm2double: DataTypes.DOUBLE,
    priceinteriorm2: DataTypes.DOUBLE,
    pricetotalm2: DataTypes.DOUBLE,
    pricetotalm2: DataTypes.DOUBLE,
    pricetotal: DataTypes.DOUBLE,
    status: DataTypes.STRING
  }, {});
  units.associate = function(models) {
    // associations can be defined here
  };
  return units;
};
