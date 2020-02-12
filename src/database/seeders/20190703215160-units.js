
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
          tower:data[2] != 'null' ? data[2] : null,
          level:data[3] != 'null' ? data[3] : null,
          bedrooms:data[4] != 'null' ? data[4] : null,
          bathrooms:data[5] != 'null' ? data[5] : null,
          buildM2:data[6] != 'null' ? data[6] : null,
          balconyM2:data[7] != 'null' ? data[7] : null,
          totalM2:data[8] != 'null' ? data[8] : null,
          totalSQFT:data[9] != 'null' ? data[9] : null,
          parking:data[10] != 'null' ? data[10] : null,
          listPrice:data[11] != 'null' ? data[11] : null,
          finalPrice:data[12] != 'null' ? data[12] : null,
          discount:data[13] != 'null' ? data[13] : null,
          delivery:data[14] != 'null' ? data[14] : null,
          exchangeRate:data[15] != 'null' ? data[15] : null,
          clusterId:data[16] != 'null' ? data[16] : null,
          statusId:data[17] != 'null' ? data[17] : null,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }).on('end', function (data) {

        resolve(seed);
      });
    }).then(seed => {
      return queryInterface.bulkInsert('units', seed, {});
    });
    return x;
  },

  down: (queryInterface, Sequelize) => {

  }
};
