'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFilePath = __dirname + '/../csv/commissions.csv'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var x = new Promise(async (resolve, reject) => {
      var seed = [];
      fs.createReadStream(csvFilePath).pipe(csv()).on('data', function (data) {
        seed.push({
          managementCommissions: data[1] != 'null' ? data[1] : null,
          salesExecutivesCommissions: data[2] != 'null' ? data[2] : null,
          salesAdministrativeCommissions: data[3] != 'null' ? data[3] : null,
          thirdPartyCommissions: data[4] != 'null' ? data[4] : null,
          brokerCommissions: data[5] != 'null' ? data[5] : null,
          totalCommissions: data[6] != 'null' ? data[6] : null,
          statusId: data[7] != 'null' ? data[7] : null,
          userId: data[8] != 'null' ? data[8] : null,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }).on('end', function (data) {

        resolve(seed);
      })
    }).then(seed => {
      return queryInterface.bulkInsert('commissions', seed, {});
    });
    return x;
  },

  down: (queryInterface, Sequelize) => {

  }
};
