// Initializes the `authmanagement` service on path `/authmanagement`
const authmanagement = require('feathers-authentication-management');
const hooks = require('./authmanagement.hooks');
const notifier = require('./notifier');

module.exports = function (app) {

  app.configure(authmanagement(notifier(app)));
  const service = app.service('authManagement');

  service.hooks(hooks);
};
