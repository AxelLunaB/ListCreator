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
    create: [preventDuplicate({ service: 'api/references' })],
    update: [canUpdate()],
    patch: [],
    remove: [canUpdate()]
  },

  after: {
    all: [
    setStatusObject(),
    setCustomerObject()

  ],
    find: [
    ],
    get:[

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
