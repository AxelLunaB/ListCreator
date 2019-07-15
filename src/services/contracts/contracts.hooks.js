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
    //   addAssociations({
    //     models: [
    //       {
    //         model: 'api/commissions',
    //         as: 'commission'
    //       }
    //     ]
    //   }),
    //   context => {
    //     if (context.params.query.$sort == undefined) {
    //       context.params.query.$sort = {
    //         id: 1
    //       }
    //     }
    //   }
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
