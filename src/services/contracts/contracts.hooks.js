const { authenticate } = require('@feathersjs/authentication').hooks;
const togglePagination = require('../../hooks/toggle-pagination');
const addAssociations = require('../../hooks/add-associations');
const setClusterObject = require('../../hooks/set-cluster-object');
const setStatusObject = require('../../hooks/set-status-object');
const canUpdate = require('../../hooks/can-update');
const preventDuplicate = require('../../hooks/prevent-duplicates');
const moment = require('moment');
const iff = require('feathers-hooks-common').iff;

const createReference = async context => {
  console.log(context.data);
  const dayOfPayment = context.data.dateOfPayment;
  const today = new Date(dayOfPayment);
  const finalDate = new Date(today);
  const daysToExpire = 14;
  const reserveExpiration = finalDate.setDate(today.getDate() + daysToExpire);
  const customerId = context.data.customerId;
  const contractId = context.data.id;

  let reference = {
    reserveDate: today,
    reserveExpiration: reserveExpiration,
    customerId: customerId,
    statusId: 4
  };

  try {
    await context.app.service('api/references').create(reference).then(async res => {
      if(res.id) {
        const referenceId = res.id;
        context.data.referenceId = res.id;

        await context.app.service('api/contracts').patch(contractId, { referenceId: referenceId });
        console.log(`ContractID: ${contractId} patched with ReferenceID: ${referenceId}.`);
      }
    });

    } catch(e) {
      console.log(e);
    }
  };

  const patchUnit = async context => {
    const unitId = context.data.unitId;
    try {
      await context.app.service('api/departments').patch(unitId, { statusId: 6 });
      console.log(`UnitID: ${unitId} has been patched!`);
    } catch(e) {
      console.log(e);
    }
  };

  const generatePayment = async (context, totalPayments) => {

    const dayOfPayment = context.data.dateOfPayment;
      const today = new Date(dayOfPayment);
      const finalDate = new Date(today);
      const daysToExpire = 14;
      const reserveExpiration = finalDate.setDate(today.getDate() + daysToExpire);
      const contractId = context.data.id;

    // (totalToPay - totalSale)
    const differencePayments = null;
    const salesPrice = context.data.salesprice;
    const params = {
      reserveExpiration: reserveExpiration,
      contractId: contractId
    };

    try {

      if(salesPrice !== null || salesPrice !== undefined) {

        await context.app.service('api/payments').create(
        {
          totalPayments: totalPayments,
          totalSale: null,
          totalToPay: salesPrice,
          differencePayments: differencePayments
        }, params);
      }

    } catch(e) {
      console.log(e);
    }

    return context;
  };

  const createSalesDetails = async (context) => {
    const executiveId = context.data.executive;
    const salesDetailsObj = { referral: "", salesChannel: "Web Panel", userId: executiveId };
    const contractId = context.data.id;

    try {
      await context.app.service('api/salesDetails').create(salesDetailsObj).then(async res => {
        await context.app.service('api/contracts').patch(contractId, { salesDetailId: res.id });
      });
    } catch(e) {
      console.log(e);
    }
  };

  const createCommission = async (context) => {
    const contractId = context.data.id;
    const executiveId = context.data.executive;
    console.log(`ExecutiveID: ${executiveId}`);
    let commission = {
      managementCommissions: Math.floor((Math.random() * 3) + 1),
      salesAdministrativeCommissions: Math.floor((Math.random() * 2) + 1),
      thirdPartyCommissions: 1,
      brokerCommissions: 5,
      totalCommissions: 140000,
      statusId: 4,
      userId: executiveId
    }

    try {
      await context.app.service('/api/commissions').create(commission).then(async res => {
        await context.app.service('api/contracts').patch(contractId, { commissionId: res.id });
      });
    } catch(e) {
      console.log(e);
    }
  };

module.exports = {
  before: {
  all: [authenticate('jwt')],
    find: [togglePagination()],
    get: [],
    create: [
     async context => {
      let newId = await context.app.service('api/contracts').find({query: {$limit: 1,$sort: {id: -1} }})
          context.data.id = newId.data[0].id + 1;
      }

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
    get: [],
    create: [
      //llamar a api/references y crear una nueva referencia
      //reserveDate :hoy
      //reserveExpiration: dentro de 5 dias
      //leer el id resultante del .then
      // agregas el id al context.data
      //
      // tomar el unitId del result
      // hacer patch de la unidad del statusId a apartado = 3

      async context => {
        createReference(context);
        patchUnit(context);
        generatePayment(context, 12);
        createSalesDetails(context);
        createCommission(context);
      }
    ],
    update: [],
    patch: [],
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
