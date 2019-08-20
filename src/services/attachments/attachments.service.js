// Initializes the `attachments` service on path `/attachments`
const createService = require('feathers-sequelize');
const createModel = require('../../models/attachments.model');
const hooks = require('./attachments.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/attachments', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('attachments');

  service.hooks(hooks);
};
