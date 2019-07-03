// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const departmentHistorics = sequelizeClient.define('department_historics', {
    cluster: { type: DataTypes.STRING, allowNull: true },
    level: { type: DataTypes.STRING, allowNull: true },
    deptnumber: { type: DataTypes.INTEGER, allowNull: true },
    type: { type: DataTypes.STRING, allowNull: true },
    terracem2: { type: DataTypes.DOUBLE, allowNull: true },
    constructionm2: { type: DataTypes.DOUBLE, allowNull: true },
    superficiem2: { type: DataTypes.DOUBLE, allowNull: true },
    subtype: { type: DataTypes.STRING, allowNull: true },
    view: { type: DataTypes.STRING, allowNull: true },
    cajones: { type: DataTypes.DOUBLE, allowNull: true },
    totalprice: { type: DataTypes.DOUBLE, allowNull: true },
    statusId: { type: DataTypes.STRING, allowNull: true },
    divisionnew: { type: DataTypes.STRING, allowNull: true },
    clusternew: { type: DataTypes.STRING, allowNull: true },
    levelnew: { type: DataTypes.STRING, allowNull: true },
    viewnew: { type: DataTypes.STRING, allowNull: true },
    deptnumbernew: { type: DataTypes.INTEGER, allowNull: true },
    typenew: { type: DataTypes.STRING, allowNull: true },
    terracem2new: { type: DataTypes.DOUBLE, allowNull: true },
    constructionm2new: { type: DataTypes.DOUBLE, allowNull: true },
    superficiem2new: { type: DataTypes.DOUBLE, allowNull: true },
    subtypenew: { type: DataTypes.STRING, allowNull: true },
    cajonesnew: { type: DataTypes.DOUBLE, allowNull: true },
    totalpricenew: { type: DataTypes.DOUBLE, allowNull: true },
    statusIdnew: { type: DataTypes.STRING, allowNull: true },

    departmentid: { type: DataTypes.INTEGER, allowNull: false },
    userid: { type: DataTypes.INTEGER, allowNull: false }

  }, {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    });

  // eslint-disable-next-line no-unused-vars
  departmentHistorics.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    departmentHistorics.belongsTo(models.users, { foreignKey: 'userid' });
    departmentHistorics.belongsTo(models.departments, { foreignKey: 'departmentid' });

  };

  return departmentHistorics;
};
