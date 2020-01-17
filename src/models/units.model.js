'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const units = sequelizeClient.define('units', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    unit: { type: DataTypes.INTEGER },
    stage: { type: DataTypes.STRING },
    commercialPhase: { type: DataTypes.STRING },
    houseModel: { type: DataTypes.STRING },
    priceTotal: { type: DataTypes.DOUBLE},
    m2Terrain: { type: DataTypes.DOUBLE },
    suburb: { type: DataTypes.STRING },
    m2Construction: { type: DataTypes.STRING },
  }, {});

  units.associate = function(models) {
    units.belongsTo(models.status);
    units.belongsTo(models.clusters);
  };

  return units;
};
