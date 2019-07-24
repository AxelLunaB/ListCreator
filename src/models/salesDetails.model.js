'use strict';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  const salesDetails = sequelizeClient.define('salesDetails', {
    referral: { type: DataTypes.STRING },
    salesChannel: { type: DataTypes.STRING}
  }, {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    });
  salesDetails.associate = function(models) {
    salesDetails.belongsTo(models.users);
  };
  return salesDetails;
};
