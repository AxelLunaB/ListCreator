'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFilePath = __dirname + '/../csv/salesDetails.csv'

module.exports = {
  up: (queryInterface, Sequelize) => {

    var x = new Promise(async (resolve, reject) => {
      var seed = [];
      fs.createReadStream(csvFilePath).pipe(csv()).on('data', function (data) {
        seed.push({
          referral: data[1] != 'null' ? data[1] : null,
          salesChannel: data[2] != 'null' ? data[2] : null,
          userId: data[3] != 'null' ? data[3] : null,
          createdAt: new Date(),
          updatedAt: new Date()

        })
      }).on('end', function (data) {

        resolve(seed);
      })
    }).then(seed => {
      return queryInterface.bulkInsert('salesDetails', seed, {});
    });
    return x;
  },


  down: (queryInterface, Sequelize) => {

  }
};
