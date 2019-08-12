'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFilePath = __dirname + '/../csv/references.csv'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var x = new Promise(async (resolve, reject) => {
      var seed = [];
      fs.createReadStream(csvFilePath).pipe(csv()).on('data', function (data) {
        seed.push({
          reserveDate: data[1] != 'null' ? new Date(data[1]) : null,
          reserveExpiration: data[2] != 'null' ? data[2] : null,
          customerId: data[3] != 'null' ? data[3] : null,
          statusId: data[4] != 'null' ? data[4] : null,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }).on('end', function (data) {

        resolve(seed);
      })
    }).then(seed => {
      return queryInterface.bulkInsert('references', seed, {});
    });
    return x;
  },


  down: (queryInterface, Sequelize) => {

  }
};
