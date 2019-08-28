'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFilePath = __dirname + '/../csv/units.csv'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var x = new Promise(async (resolve, reject) => {
      var seed = [];
      fs.createReadStream(csvFilePath).pipe(csv()).on('data', function (data) {
        seed.push({
          unitNumber: data[1],
          phase: data[2],
          level: data[3],
          bedrooms: data[4],
          nkeys: data[5],
          bathrooms: data[6],
          interiorM2: data[7],
          exteriorM2: data[8],
          roofInteriorM2: data[9],
          roofExteriorM2: data[10],
          totalInteriorM2: data[11],
          totalM2Double: data[12],
          priceInteriorM2: data[13],
          priceTotalM2: data[14],
          priceTotal: data[15],
          clusterId: data[16],
          statusId: data[17],
          unitType:data[18],
          furniture:data[19],
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }).on('end', function (data) {

        resolve(seed);
      })
    }).then(seed => {
      return queryInterface.bulkInsert('units', seed, {});
    });
    return x;
  },

  down: (queryInterface, Sequelize) => {

  }
};
