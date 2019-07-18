const { authenticate } = require('@feathersjs/authentication').hooks;
const togglePagination = require('../../hooks/toggle-pagination');
const addAssociations = require('../../hooks/add-associations');
const setClusterObject = require('../../hooks/set-cluster-object');
const setStatusObject = require('../../hooks/set-status-object');
const canUpdate = require('../../hooks/can-update');
const preventDuplicate = require('../../hooks/prevent-duplicates');
module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [
      togglePagination(),
    ],
    get: [],
    create: [preventDuplicate({ service: 'api/contracts' })],
    update: [canUpdate()],
    patch: [],
    remove: [canUpdate()]
  },

  after: {
    all: [],
    find: [
      async context => {
      for (i = 0; i < context.result.data.length; i++) {

        let contract = context.result.data[i];

        await context.app.service('api/commissions').get(contract.id).then(result => {
          contract.commission = result;

        })
        }
    },
    async context => {
      for (i = 0; i < context.result.data.length; i++) {

        let contract = context.result.data[i];
        if(contract.paymentId != null){
          await context.app.service('api/payments').get(contract.paymentId).then(result => {
            contract.payments = result;

          })
        }
      }
    },
    async context => {
      for (i = 0; i < context.result.data.length; i++) {

        let contract = context.result.data[i];
        if(contract.salesDetailId != null){
          await context.app.service('api/salesDetails').get(contract.salesDetailId).then(result => {
            contract.salesDetails = result;

          })
        }
      }
    }
    ],
    get: [
    ],
    create: [

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
