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
          managementCommissions: data[1],
          salesExecutivesCommissions: data[2],
          salesAdministrativeCommissions: data[3],
          thirdPartyCommissions: data[4],
          brokerCommissions: data[5],
          totalCommissions: data[6],
          statusId: data[7],
          executiveId: data[8] != 'null' ? data[8] : null,
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
