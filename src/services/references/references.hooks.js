const { authenticate } = require('@feathersjs/authentication').hooks;
const togglePagination = require('../../hooks/toggle-pagination');
const addAssociations = require('../../hooks/add-associations');
const setClusterObject = require('../../hooks/set-cluster-object');
const setStatusObject = require('../../hooks/set-status-object');
const setCustomerObject = require('../../hooks/set-customer-object');
const canUpdate = require('../../hooks/can-update');
const preventDuplicate = require('../../hooks/prevent-duplicates');
const iff = require('feathers-hooks-common').iff;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [
      togglePagination(),
      addAssociations({
        models: [
          {
            model: 'api/status',
            as: 'status'
          }
        ]
      })
    ],
    get: [],
    create: [
      // preventDuplicate({ service: 'api/references' })
  ],
    update: [canUpdate()],
    patch: [
        // For each reference that is different from the one is paid will change its statusId to CANCELED
        // console.log('TotalReferences ----------------->');
        // console.log(totalReferences);
        // for(let i = 0; i < totalReferences.data.length - 1; i++) {
        //   if(totalReferences.data[i].referenceId !== paidReference) {
        //     // Change Status to CANCELED
        //     await context.app.service('/api/references').patch(totalReferences.data[i].referenceId, { statusId: 9 });
        //     console.log(`ReferenceID: ${paidReference} now its status is PAID.
        //     References CANCELED: ${totalReferences.data[i].referenceId}`);
        //   }
        // }
        // totalReferences.data.forEach(async object => { 
        //   if(object.id !== paidReference) {
        //     // Change Status to CANCELED
        //     await context.app.service('/api/references').patch(object.id, { statusId: 9 });
        //     console.log(`ReferenceID: ${paidReference} now its status is PAID.
        //     References CANCELED: ${object.id}`);
        //   }
        // });
    ],
    remove: [canUpdate()]
  },

  after: {
    all: [
    setStatusObject(),
    setCustomerObject()
    ],
    find: [],
    get:[],
    create: [],
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
