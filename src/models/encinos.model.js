'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const encinos = sequelizeClient.define('encinos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    unit: { type: DataTypes.INTEGER },
    stage: { type: DataTypes.INTEGER },
    commercialPhase: { type: DataTypes.STRING },
    houseModel: { type: DataTypes.STRING },
    m2Terrain: { type: DataTypes.DOUBLE },
    suburb: { type: DataTypes.STRING },
    m2Construction: { type: DataTypes.DOUBLE }
  }, {});

  encinos.associate = function(models) {
    
  };

  return encinos;
};