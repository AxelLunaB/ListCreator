'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFilePath = __dirname + '/../csv/encinos.csv';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var x = new Promise(async (resolve, reject) => {
      var seed = [];
      fs.createReadStream(csvFilePath).pipe(csv()).on('data', function (data) {
        seed.push({
          id: data[0],
          unit:data[1] != 'null' ? data[1] : null,
          stage:data[2] != 'null' ? data[2] : null,
          commercialPhase:data[3] != 'null' ? data[3] : null,
          houseModel:data[4] != 'null' ? data[4] : null,
          m2Terrain:data[5] != 'null' ? data[5] : null,
          suburb:data[6] != 'null' ? data[6] : null,
          m2Construction:data[7] != 'null' ? data[7] : null,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }).on('end', function (data) {

        resolve(seed);
      });
    }).then(seed => {
      return queryInterface.bulkInsert('encinos', seed, {});
    });
    return x;
  },

  down: (queryInterface, Sequelize) => {

  }
};
