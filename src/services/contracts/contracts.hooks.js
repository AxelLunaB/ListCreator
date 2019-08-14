const { authenticate } = require('@feathersjs/authentication').hooks;
const togglePagination = require('../../hooks/toggle-pagination');
const addAssociations = require('../../hooks/add-associations');
const setClusterObject = require('../../hooks/set-cluster-object');
const setStatusObject = require('../../hooks/set-status-object');
const canUpdate = require('../../hooks/can-update');
const preventDuplicate = require('../../hooks/prevent-duplicates');
const moment = require('moment');
module.exports = {
  before: {
  all: [/*authenticate('jwt')*/],
    find: [
      togglePagination(),
    ],
    get: [],
    create: [],
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
          const dayOfPayment = context.data.dateOfPayment;
          const today = new Date(dayOfPayment);
          const finalDate = new Date(today);
          const daysToExpire = 5;
          const reserveExpiration = finalDate.setDate(today.getDate() + daysToExpire);
          const contractId = context.data.id;
          const unitId = context.data.unitId;
          const executiveId = context.data.executive;
          const salesPrice = context.data.salesprice;
          const customerId = context.data.customerId;

          let referenceObject = {
            reserveDate: today,
            reserveExpiration: reserveExpiration,
            customerId: customerId,
            statusId: 4
          };

          const createReference = async referenceObject => {
            const newReference = await context.app.service('api/references').create(referenceObject);
            const referenceId = newReference.id;
            return referenceId;
          };

          const createSaleDetail = async () => {
            let saleDetailObj = null;
            
            try {
              let saleDetail = { referral: "", salesChannel: "Web Panel", userId: executiveId };
              saleDetailObj = await context.app.service('api/salesDetails').create(saleDetail);

            } catch(e) {
              console.log(e);
            }

            return saleDetailObj;
          };

          const patchContract = async (referenceId, salesDetailId)  => {
            const updatedContract = await context.app.service('api/contracts').patch(contractId, { referenceId: referenceId, salesDetailId: salesDetailId });
            return updatedContract;
          };

          const patchUnit = async unitId => {
            try {
              // Changes StatusId to RESERVED (statusId: 3)
              await context.app.service('api/departments').patch(unitId, {statusId: 3});
            } catch(e) {
              const msg = new Error('Error making reservation...');
              console.log(msg);
            }
          };

          const patchSalesDetails = async () => {
            await context.app.service('api/salesDetails').patch(salesDetailId, { userId: executiveId });
          };

          // Set Payment to 12 totalPayments
          // Retrieve ID from payment for setting paymentDetails

          const generatePayment = async (totalPayments) => {
            // (totalToPay - totalSale)
            const differencePayments = null;
            const payment = await context.app.service('api/payments').create({ 
              totalPayments: totalPayments, 
              totalSale: null, 
              totalToPay: salesPrice, 
              differencePayments: differencePayments
            });

            return payment;
          };

          const setDueDates = (totalPayments, reserveExpiration) => {
            const dueDates = [];

            for(let i = 1; i <= totalPayments; i++) {
              const dueDate = moment(reserveExpiration).add(i, 'months').format('DD/MM/YYYY');
              dueDates.push(dueDate);
            }
            return dueDates;
          };

          const createPaymentsDetails = async (dueDates, paymentId) => {
            for(let i = 0; i < dueDates.length; i++) {
              // Insert a new payment detail in db for each dueDate in the array
              await context.app.service('api/paymentsDetails').create(
                { 
                  paymentNo: 1 + i,
                  dueDate: dueDates[i],
                  paymentDate: null,
                  statusId: 4,
                  paymentId: paymentId 
                }
              );
            }
          };

          const addContractPaymentId = async paymentId => {
            await context.app.service('api/contracts').patch(contractId, { paymentId: paymentId });
            console.log(`Contract ID: ${contractId} patched with PaymentID: ${paymentId}.`);
          };

          const getSalesPrice = async (contractId) => {
            const contract = await context.app.service('api/contracts').get(contractId);
            const salesPrice = contract.salesprice;
            return salesPrice;
          };

          try {
            // Create a new reference
            const newReference = createReference(referenceObject);
            
            newReference.then(referenceId => {
              // Insert new reference id to context data
              context.data.referenceId = referenceId;

              // Generate a new Sale Detail
            const saleDetailObj = createSaleDetail();
            
            saleDetailObj.then(obj => {
              const salesDetailId = obj.id;
              // Patch contract
              patchContract(referenceId, salesDetailId);
            });

            });

            const unitId = context.data.unitId;
            patchUnit(unitId);

            // Generate paymentId for patching contracts.paymentId
            let paymentId = null;
            generatePayment(12).then(result => {

              // Retrieve unique paymentId 
              paymentId = result.id;

              // Patch contract for paymentId
              addContractPaymentId(paymentId);

              // Generate all due dates for every payment
              // setDueDates : Array[String]
              const dueDates = setDueDates(12, reserveExpiration);
              console.log('Fechas de Pago');
              console.log(dueDates);

              // Add all due dates to payment details in db
              createPaymentsDetails(dueDates, paymentId);
            });

          } catch(error) {
            console.log(error);
          }
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
