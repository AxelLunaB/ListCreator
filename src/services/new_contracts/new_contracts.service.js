// Initializes the `new_contracts` service on path `/y`
const createService = require('feathers-sequelize');
const createModel = require('../../models/new_contracts.model');
const hooks = require('./new_contracts.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/y', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('y');

  service.hooks(hooks);
};
