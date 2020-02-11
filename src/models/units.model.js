'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const units = sequelizeClient.define('units', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    unit: { type: DataTypes.STRING },
    tower: { type: DataTypes.STRING },
    level: { type: DataTypes.INTEGER },
    bedrooms: {type:DataTypes.INTEGER},
    bathrooms: {type:DataTypes.INTEGER},
    buildM2: { type: DataTypes.DOUBLE },
    balconyM2: { type: DataTypes.DOUBLE },
    totalM2: {type: DataTypes.DOUBLE },
    totalSQFT: {type:DataTypes.DOUBLE},
    parking: {type:DataTypes.STRING},
    listPrice : {type:DataTypes.DOUBLE},
    finalPrice : {type:DataTypes.DOUBLE},
    discount: { type: DataTypes.INTEGER },
    delivery: { type: DataTypes.STRING },
  }, {});

  units.associate = function(models) {
    units.belongsTo(models.status);
    units.belongsTo(models.clusters);
    units.belongsTo(models.users);
    units.belongsTo(models.customers);
  };

  return units;
};
