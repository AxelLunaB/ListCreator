'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFilePath = __dirname + '/../csv/users.csv'
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var x = new Promise(async (resolve, reject) => {
      var seed = [];
      fs.createReadStream(csvFilePath).pipe(csv()).on('data', function (data) {
        seed.push({
          name: data[1],
          age: data[2],
          contactNumber: data[3],
          email: data[4],
          country: data[5],
          state: data[6],
          city: data[7],
          address: data[8],
          password: bcrypt.hashSync('giada2019', salt),
          userType: data[9],
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }).on('end', function (data) {

        resolve(seed);
      })
    }).then(seed => {
      return queryInterface.bulkInsert('users', seed, {});
    });
    return x;
  },


  down: (queryInterface, Sequelize) => {

  }
};
