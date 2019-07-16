const { authenticate } = require('@feathersjs/authentication').hooks;
const togglePagination = require('../../hooks/toggle-pagination');
const addAssociations = require('../../hooks/add-associations');
const setStatusObject = require('../../hooks/set-status-object');
const canUpdate = require('../../hooks/can-update');
const preventDuplicate = require('../../hooks/prevent-duplicates');
const iff = require('feathers-hooks-common').iff;
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [setStatusObject()],
    find: [],
    get:[],
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
