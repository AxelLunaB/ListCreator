const local = require('@feathersjs/authentication-local');
const isAdmin = require('../../hooks/is-admin');
const { authenticate } = require('@feathersjs/authentication').hooks;
const { softDelete, iff } = require('feathers-hooks-common');
const isCurrent = adminRole => context => context.params.query.current != undefined && context.params.query.current == 'true';
const accountService = require('../authmanagement/notifier');
const preventSelfDelete = require('../../hooks/prevent-self-delete');
const verifyHooks = require('feathers-authentication-management').hooks;
const togglePagination = require('../../hooks/toggle-pagination');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [

      softDelete('deleted'),
      iff(isCurrent(), context => {
        if (context.params.query.current != undefined && context.params.query.current == 'true') {
          context.result = context.params.user;
          delete context.params.query.current;
        }
      }).else(isAdmin()),
      togglePagination()
    ],
    get: [softDelete('deleted'),],
    create: [softDelete('deleted'), isAdmin(), local.hooks.hashPassword(), verifyHooks.addVerification()],
    update: [softDelete('deleted'), isAdmin(), local.hooks.hashPassword()],
    patch: [softDelete('deleted'), isAdmin()],
    remove: [preventSelfDelete(), softDelete('deleted'), isAdmin()]
  },

  after: {
    all: [local.hooks.protect('password'), local.hooks.protect('deleted')],
    find: [],
    get: [],
    create: [
      context => {
        accountService(context.app).notifier('resendVerifySignup',context.result);
      },
      verifyHooks.removeVerification()
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
