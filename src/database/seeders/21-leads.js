
'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFilePath = __dirname + '/../csv/leads.csv';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var x = new Promise(async (resolve, reject) => {
      var seed = [];
      fs.createReadStream(csvFilePath).pipe(csv()).on('data', function (data) {
        seed.push({
          id: data[0],
          name:data[1],
          email:data[2],
          customerId:data[3] != 'null' ? data[3] : null,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }).on('end', function (data) {

        resolve(seed);
      });
    }).then(seed => {
      return queryInterface.bulkInsert('leads', seed, {});
    });
    return x;
  },

  down: (queryInterface, Sequelize) => {

  }
};
