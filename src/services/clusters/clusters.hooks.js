const { authenticate } = require('@feathersjs/authentication').hooks;
// const togglePagination = require('../../hooks/toggle-pagination');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      // togglePagination(),
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
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
