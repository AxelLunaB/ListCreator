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
          lastName: data[2] != 'null' ? data[2] : null,
          age: data[3] != 'null' ? data[3] : 0,
          address: data[4] != 'null' ? data[4] : null,
          zipcode: data[5] != 'null' ? data[5] : null,
          contactNumber: data[6] != 'null' ? data[6] : 0,
          cellphone: data[7] != 'null' ? data[7] : 0,
          email: data[8] != 'null' ? data[8] + data[5] : data[0] + 'cliente@servicio.com',
          country: data[9] != 'null' ? data[9] : null,
          state: data[10] != 'null' ? data[10] : null,
          city: data[11] != 'null' ? data[11] : null,
          password: bcrypt.hashSync(data[12], salt),
          userType: data[13],
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
