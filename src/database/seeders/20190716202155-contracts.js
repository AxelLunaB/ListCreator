'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFilePath = __dirname + '/../csv/contracts.csv'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var x = new Promise(async (resolve, reject) => {
      var seed = [];
      fs.createReadStream(csvFilePath).pipe(csv()).on('data', function (data) {
        seed.push({
          id: data[0],
          closingDate:data[1],
          WROI:data[2],
          percent:data[3],
          years:data[4],
          paymentMethod:data[5],
          discount:data[6],
          currency:data[7],
          exchangerate:data[8],
          salesprice:data[9],
          commissionId: data[10] != 'null' ? data[10] : null,
          paymentId: data[11] != 'null' ? data[11] : null,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }).on('end', function (data) {

        resolve(seed);
      })
    }).then(seed => {
      return queryInterface.bulkInsert('contracts', seed, {});
    });
    return x;
  },

  down: (queryInterface, Sequelize) => {

  }
};
