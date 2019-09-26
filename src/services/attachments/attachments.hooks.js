const { authenticate } = require('@feathersjs/authentication').hooks;
// const setAttachment = require('../../hooks/set-attachment-object');

module.exports = {
  before: {
    all: [/* authenticate('jwt') */],
    find: [],
    get: [],
    create: [
      async context => {
        context = await uploadAttachment(context);
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      context => {
        console.log(context.result);
        context.dispatch = 'File uploaded successfully';
        return context;
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
