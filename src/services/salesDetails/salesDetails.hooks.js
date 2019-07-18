const { authenticate } = require('@feathersjs/authentication').hooks;
const togglePagination = require('../../hooks/toggle-pagination');
const addAssociations = require('../../hooks/add-associations');
const setClusterObject = require('../../hooks/set-cluster-object');
const setExecutiveObject = require('../../hooks/set-executive-object');
const canUpdate = require('../../hooks/can-update');
const preventDuplicate = require('../../hooks/prevent-duplicates');
const iff = require('feathers-hooks-common').iff;
module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [
      togglePagination()
    ],
    get: [],
    create: [],
    update: [canUpdate()],
    patch: [],
    remove: [canUpdate()]
  },

  after: {
    all: [
    setExecutiveObject()
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
