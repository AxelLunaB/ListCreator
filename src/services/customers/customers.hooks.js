const local = require('@feathersjs/authentication-local');
const isAdmin = require('../../hooks/is-admin');
const { authenticate } = require('@feathersjs/authentication').hooks;
const { softDelete, iff } = require('feathers-hooks-common');
const isCurrent = adminRole => context => context.params.query.current != undefined && context.params.query.current == 'true';
const accountService = require('../authmanagement/notifier');
const preventSelfDelete = require('../../hooks/prevent-self-delete');
const verifyHooks = require('feathers-authentication-management').hooks;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [
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
    create: [
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
