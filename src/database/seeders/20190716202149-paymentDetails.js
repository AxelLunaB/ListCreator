'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFilePath = __dirname + '/../csv/paymentsDetails.csv'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var x = new Promise(async (resolve, reject) => {
      var seed = [];
      fs.createReadStream(csvFilePath).pipe(csv()).on('data', function (data) {
        seed.push({
          paymentNo: data[1],
          dueDate: data[2],
          paymentDate: data[3] != 'null' ? data[3] : null,
          paymentId: data[4],
          statusId: data[5],
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }).on('end', function (data) {

        resolve(seed);
      })
    }).then(seed => {
      return queryInterface.bulkInsert('paymentsDetails', seed, {});
    });
    return x;
  },


  down: (queryInterface, Sequelize) => {

  }
};
