'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFilePath = __dirname + '/../csv/contracts.csv';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var x = new Promise(async (resolve, reject) => {
      var seed = [];
      fs.createReadStream(csvFilePath).pipe(csv()).on('data', function (data) {
        seed.push({
          id: data[0],
          closingDate:data[1] != 'null' ? data[1] : null,
          WROI:data[2] != 'null' ? data[2] : null,
          percent:data[3] != 'null' ? data[3] : null,
          years:data[4] != 'null' ? data[4] : null,
          paymentMethod:data[5] != 'null' ? data[5] : null,
          discount:data[6] != 'null' ? data[6] : null,
          currency:data[7] != 'null' ? data[7] : null,
          exchangerate:data[8] != 'null' ? data[8] : null,
          salesprice:data[9] != 'null' ? data[9] : null,
          commissionId: data[10] != 'null' ? data[10] : null,
          paymentId: data[11] != 'null' ? data[11] : null,
          salesDetailId: data[12] != 'null' ? data[12] : null,
          customerId: data[13] != 'null' ? data[13] : null,
          referenceId: data[14] != 'null' ? data[14] : null,
          clusterId: data[15] != 'null' ? data[15] : 1,
          comment: data[17] != 'null' ? data[17] : null,
          furniture:data[18] != 'null' ? data[18]:null,
          createdAt: new Date(),
          updatedAt: new Date(),
          unitId: data[0]
        });
      }).on('end', function (data) {

        resolve(seed);
      });
    }).then(seed => {
      return queryInterface.bulkInsert('contracts', seed, {});
    });
    return x;
  },

  down: (queryInterface, Sequelize) => {

  }
};
