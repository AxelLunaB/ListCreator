const { authenticate } = require('@feathersjs/authentication').hooks;
const togglePagination = require('../../hooks/toggle-pagination');
const addAssociations = require('../../hooks/add-associations');
const setClusterObject = require('../../hooks/set-cluster-object');
const setStatusObject = require('../../hooks/set-status-object');
const canUpdate = require('../../hooks/can-update');
const preventDuplicate = require('../../hooks/prevent-duplicates');
module.exports = {
  before: {
  all: [/*authenticate('jwt')*/],
    find: [
      togglePagination(),
    ],
    get: [],
    create: [
            // context => { console.log(context) }


      //
      //

  ],
    update: [canUpdate()],
    patch: [],
    remove: [canUpdate()]
  },

  after: {
    all: [],
    find: [
      async context => {
      for (let i = 0; i < context.result.data.length; i++) {

        let contract = context.result.data[i];
        if(contract.commissionId != null) {
         await context.app.service('api/commissions').get(contract.id).then(result => {
           contract.commission = result;
         });
        }
      }
    },
    async context => {
      for (let i = 0; i < context.result.data.length; i++) {

        let contract = context.result.data[i];
        if(contract.paymentId != null){
          await context.app.service('api/payments').get(contract.paymentId).then(result => {
            contract.payments = result;

          });
        }
      }
    },
    async context => {
      for (let i = 0; i < context.result.data.length; i++) {

        let contract = context.result.data[i];
        if(contract.salesDetailId != null){
          await context.app.service('api/salesDetails').get(contract.salesDetailId).then(result => {
            contract.salesDetails = result;

          });
        }
       }
      },
      async context => {
        for (let i = 0; i < context.result.data.length; i++) {

          let contract = context.result.data[i];
          if(contract.customerId != null){
            await context.app.service('customers').get(contract.customerId).then(result => {
              delete result.password;
              delete result.usertype;
              delete result.deleted;
              contract.customer = result;

            });
          }
        }
      },
      async context => {
        for (let i = 0; i < context.result.data.length; i++) {

          let contract = context.result.data[i];
          if(contract.referenceId != null){
            await context.app.service('api/references').get(contract.referenceId).then(result => {
              contract.reference = result;

            });
          }
        }
      },
      // async context => {
      //   for (i = 0; i < context.result.data.length; i++) {

      //     let contract = context.result.data[i];
      //     if(contract.referenceId != null){
      //       await context.app.service('api/references').get(contract.id).then(result => {
      //         contract.reference = result;

      //       })
      //     }
      //   }
      // }
    ],
    get: [
    ],
    create: [
      //llamar a api/references y crear una nueva referencia
      //reserveDate :hoy
      //reserveExpiration: dentro de 5 dias
      //leer el id resultante del .then
      // agregas el id al context.data
      //
      // tomar el unitId del result
      // hacer patch de la unidad del statusId a apartado = 3
      // async context => {
      //   for (let i = 0; i < context.result.length; i++) {
      //     let contract = context.result.data[i];

      //     if(contract.referenceId != null){
      //       await context.app.service('api/references').get(contract.id).then(result => {
      //         console.log(result);
      //       });
      //     }
      //   }
      // }

      async context => {
          
          const today = new Date();
          const finalDate = new Date(today);
          const daysToExpire = 5;
          const reserveExpiration = finalDate.setDate(today.getDate() + daysToExpire);
          const contractId = context.data.id;
          const unitId = context.data.unitId;

          let referenceObject = {
            reserveDate: today,
            reserveExpiration: reserveExpiration
          };
          
          await context.app.service('api/references').create(referenceObject).then(result => {
            // Retrieves new ID from result
            const referenceId = result.id;
            return Promise.resolve(referenceId);

          }).then(async referenceId => {

            let dataToMerge = { 
              referenceId: referenceId
            };

            await context.app.service('api/contracts').patch(contractId, dataToMerge).then(res => {
            }).then(async () => {

              await context.app.service('api/departments').patch(unitId, {statusId: 3}).then(res => {
                console.log(res);
              });

            });

          });
      }

    ],
    update: [

    ],
    patch: [

    ],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
