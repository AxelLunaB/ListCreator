// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const departments = sequelizeClient.define('departments', {
    // division: { type: DataTypes.STRING, allowNull: true },
    // cluster: { type: DataTypes.STRING, allowNull: true },
    // depId: {type: DataTypes.INTEGER, allowNull: false},

    deptnumber: { type: DataTypes.INTEGER, allowNull: true },
    type: { type: DataTypes.STRING, allowNull: true },
    subtype: { type: DataTypes.STRING, allowNull: true },
    view: { type: DataTypes.STRING, allowNull: true },
    level: { type: DataTypes.INTEGER, allowNull: true },
    constructionm2: { type: DataTypes.DOUBLE, allowNull: true },
    terracem2: { type: DataTypes.DOUBLE, allowNull: true },
    superficiem2: { type: DataTypes.DOUBLE, allowNull: true },
    cajones: { type: DataTypes.INTEGER, allowNull: true },
    totalprice: { type: DataTypes.DOUBLE, allowNull: true },

    // constructionmricem2: { type: DataTypes.DOUBLE, allowNull: true },
    // terraintotalprice: { type: DataTypes.DOUBLE, allowNull: true },
    // constructiontotalprice: { type: DataTypes.DOUBLE, allowNull: true },
    // status: { type: DataTypes.STRING, allowNull: true }

    // numberId:{ type: DataTypes.INTEGER, allowNull:false, primaryKey:true },
    // unitNo:{ type: DataTypes.INTEGER, allowNull: true },
    // phase:{ type: DataTypes.INTEGER, allowNull: true },
    // building:{ type: DataTypes.STRING, allowNull: true },
    // level:{ type: DataTypes.INTEGER, allowNull: true },
    // bd:{ type: DataTypes.INTEGER, allowNull: true },
    // key:{ type: DataTypes.INTEGER, allowNull: true },
    // bth:{ type: DataTypes.INTEGER, allowNull: true },
    // interiorm2:{  type: DataTypes.DOUBLE, allowNull: true },
    // exteriorm2:{ type: DataTypes.DOUBLE, allowNull: true },
    // roofinterior:{ type: DataTypes.DOUBLE, allowNull: true },
    // roofexterior:{ type: DataTypes.DOUBLE, allowNull: true },
    // totalinterior:{ type: DataTypes.DOUBLE, allowNull: true },
    // totalm2:{ type: DataTypes.DOUBLE, allowNull: true },
    // pricebym2interior:{ type: DataTypes.DOUBLE, allowNull: true },
    // pricebym2:{ type: DataTypes.DOUBLE, allowNull: true },
    // listprice:{ type: DataTypes.DOUBLE, allowNull: true },
    // payment:{ type: DataTypes.INTEGER, allowNull: true },
    // discount:{ type: DataTypes.DOUBLE, allowNull: true},
    // salespriceusd:{ type: DataTypes.DOUBLE, allowNull: true },
    // salespricemxn:{ type: DataTypes.DOUBLE, allowNull: true },
    // exchangerate:{ type: DataTypes.INTEGER, allowNull: true },
    // curr:{  type: DataTypes.STRING, allowNull: true },
    // currentstatus:{  type: DataTypes.INTEGER, allowNull: true },
    // saleschannel:{  type: DataTypes.INTEGER, allowNull: true },
    // broker:{  type: DataTypes.STRING, allowNull: true },
    // salesexecutive:{  type: DataTypes.STRING, allowNull: true },
    // customer:{  type: DataTypes.STRING, allowNull: true },
    // country:{  type: DataTypes.STRING, allowNull: true },
    // state:{  type: DataTypes.STRING, allowNull: true },
    // city:{  type: DataTypes.STRING, allowNull: true },
    // reservedate:{ type: DataTypes.DATE },
    // reserveexpiration:{ type: DataTypes.DATE },
    // roi:{ type: DataTypes.INTEGER, allowNull: true },
    // percentage:{ type: DataTypes.INTEGER, allowNull: true },
    // years:{ type: DataTypes.INTEGER, allowNull: true },
    // closingdate:{ type: DataTypes.DATE },
    // year:{ type: DataTypes.INTEGER, allowNull: true },
    // month:{ type: DataTypes.INTEGER, allowNull: true },
    // day:{ type: DataTypes.INTEGER, allowNull: true },
    // managmentcomission:{ type: DataTypes.INTEGER, allowNull: true },
    // executivecomission:{ type: DataTypes.INTEGER, allowNull: true },
    // administrativecomission:{ type: DataTypes.INTEGER, allowNull: true },
    // thidpartycomission:{ type: DataTypes.INTEGER, allowNull: true },
    // brokercomission:{ type: DataTypes.INTEGER, allowNull: true },
    // totalcomission:{ type: DataTypes.INTEGER, allowNull: true },
    // comissionstatus:{ type: DataTypes.INTEGER, allowNull: true },
    // payone:{  type: DataTypes.DOUBLE, allowNull: true },
    // dateone:{ type: DataTypes.DATE },
    // statusone:{  type: DataTypes.STRING, allowNull: true },
    // paytwo:{  type: DataTypes.DOUBLE, allowNull: true },
    // datetwo:{ type: DataTypes.DATE },
    // statustwo:{  type: DataTypes.STRING, allowNull: true },
    // paythree:{  type: DataTypes.DOUBLE, allowNull: true },
    // datethree:{ type: DataTypes.DATE },
    // statusthree:{  type: DataTypes.STRING, allowNull: true },
    // payfour:{  type: DataTypes.DOUBLE, allowNull: true },
    // datefour:{ type: DataTypes.DATE },
    // statusfour:{  type: DataTypes.STRING, allowNull: true },
    // payfive:{  type: DataTypes.DOUBLE, allowNull: true },
    // datefive:{ type: DataTypes.DATE },
    // statusfive:{  type: DataTypes.STRING, allowNull: true },
    // paysix:{  type: DataTypes.DOUBLE, allowNull: true },
    // datesix:{ type: DataTypes.DATE },
    // statussix:{  type: DataTypes.STRING, allowNull: true },
    // payseven:{  type: DataTypes.DOUBLE, allowNull: true },
    // dateseven:{ type: DataTypes.DATE },
    // statusseven:{  type: DataTypes.STRING, allowNull: true },
    // payeight:{  type: DataTypes.DOUBLE, allowNull: true },
    // dateeight:{ type: DataTypes.DATE },
    // statuseight:{  type: DataTypes.STRING, allowNull: true },
    // paynine:{  type: DataTypes.DOUBLE, allowNull: true },
    // datenine:{ type: DataTypes.DATE },
    // statusnine:{  type: DataTypes.STRING, allowNull: true },
    // payten:{  type: DataTypes.DOUBLE, allowNull: true },
    // dateten:{ type: DataTypes.DATE },
    // statusten:{  type: DataTypes.STRING, allowNull: true },
    // payeleven:{  type: DataTypes.DOUBLE, allowNull: true },
    // dateeleven:{ type: DataTypes.DATE },
    // statuseleven:{  type: DataTypes.STRING, allowNull: true },
    // paytwelve:{  type: DataTypes.DOUBLE, allowNull: true },
    // datetwelve:{ type: DataTypes.DATE },
    // statustwelve:{  type: DataTypes.STRING, allowNull: true },
    // finance: { type: DataTypes.INTEGER, allowNull: true },
    // totalpays: { type: DataTypes.DOUBLE, allowNull: true },
    // totalsales: { type: DataTypes.DOUBLE, allowNull: true },
    // difference: { type: DataTypes.DOUBLE, allowNull: true }
  }, {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    });

  // eslint-disable-next-line no-unused-vars
  departments.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    departments.belongsTo(models.clusters);
    departments.belongsTo(models.status);
  };

  return departments;
};
