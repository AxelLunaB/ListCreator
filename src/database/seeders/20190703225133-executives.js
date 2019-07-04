'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFilePath = __dirname + '/../csv/executives.csv'
const bcrypt = require('bcryptjs');
module.exports = {
  up: (queryInterface, Sequelize) => {
    var x = new Promise(async (resolve, reject) => {
      var seed = [];
      fs.createReadStream(csvFilePath).pipe(csv()).on('data', function (data) {
        seed.push({
          name: data[1],
          age: data[2],
          contactNumber: data[3],
          email: data[4],
          password: bcrypt.hashSync(data[5], salt),
          userType: data[6]
        })
      }).on('end', function (data) {

        resolve(seed);
      })
    }).then(seed => {
      return queryInterface.bulkInsert('executives', seed, {});
    });
    return x;
  },
  },

  down: (queryInterface, Sequelize) => {

  }
};
