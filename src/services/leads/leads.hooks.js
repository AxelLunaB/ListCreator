const togglePagination = require('../../hooks/toggle-pagination');
const { authenticate } = require('@feathersjs/authentication').hooks;
const addAssociations = require('../../hooks/add-associations');
module.exports = {
    before: {
      all: [authenticate('jwt')],
      find: [
        addAssociations({
        models: [
          {
            model: 'customers',
            as: 'customer'
          }
        ]
      }),
      context => {
        if (context.params.query.$sort == undefined) {
          context.params.query.$sort = {
            id: 1
          }
        }
      }, togglePagination()
      ],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },

    after: {
      all: [],
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
