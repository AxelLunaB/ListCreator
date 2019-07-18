'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFilePath = __dirname + '/../csv/customers.csv'


module.exports = {
  up: (queryInterface, Sequelize) => {
    const bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var x = new Promise(async (resolve, reject) => {
      var seed = [];
      fs.createReadStream(csvFilePath).pipe(csv()).on('data', function (data) {
        seed.push({
          name: data[1] != 'null' ? data[1] : null,
          age: data[2] != 'null' ? data[2] : null,
          address: data[3] != 'null' ? data[3] : null,
          contactNumber: data[4] != 'null' ? data[4] : null,
          email: data[5] != 'null' ? data[0] + data[5] : null,
          country: data[6] != 'null' ? data[6] : null,
          state: data[7] != 'null' ? data[7] : null,
          city: data[8] != 'null' ? data[8] : null,
          password: bcrypt.hashSync(data[9], salt),
          userType: data[10],
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }).on('end', function (data) {

        resolve(seed);
      })
    }).then(seed => {
      return queryInterface.bulkInsert('customers', seed, {});
    });
    return x;
  },


  down: (queryInterface, Sequelize) => {

  }
};
