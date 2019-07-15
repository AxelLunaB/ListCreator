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
    create: [preventDuplicate({ service: 'api/commissions' })],
    update: [canUpdate()],
    patch: [],
    remove: [canUpdate()]
  },

  after: {
    all: [
    setStatusObject()
  ],
    find: [addAssociations({
      models: [
        {
          model: 'api/status',
          as: 'status'
        }
      ]
    })],
    get: [addAssociations({
      models: [
        {
          model: 'api/status',
          as: 'status'
        }
      ]
    })
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
