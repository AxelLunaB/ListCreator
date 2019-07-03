'use strict';

const fs = require('fs')
const csv = require('fast-csv');
const csvFilePath = __dirname + '/../units.csv';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

   var x = new Promise(async (resolve, reject) => {
    var seed = [];
    fs.createReadStream(csvFilePath).pipe(csv()).on('data', function (data) {
      seed.push({
        id: parseInt(data[0]),
        unit: data[1],
        phase: data[2],
        buildingid: data[3],
        level: data[4],
        bedrooms: data[5],
        nkeys: data[6],
        bathrooms: data[7],
        interiorm2: data[8],
        exteriorm2: data[9],
        roofinteriorm2: data[10],
        roofexteriorm2: data[11],
        totalinteriorm2: data[12],
        totalm2double: data[13],
        priceinteriorm2: data[14],
        pricetotalm2: data[15],
        pricetotal: data[16],
        status: data[17],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }).on('end', function (data) {

      resolve(seed);
    });
  }).then(seed => {
    return queryInterface.bulkInsert('units', seed, {});
  });
  console.log('x is: ');
  console.log(x);
  return x;
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
