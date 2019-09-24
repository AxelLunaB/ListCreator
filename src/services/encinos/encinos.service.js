// Initializes the `encinos` service on path `/encinos`
const createService = require('feathers-sequelize');
const createModel = require('../../models/encinos.model');
const hooks = require('./encinos.hooks');

//TODO: Validate duplicate entries for email.

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'encinos',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/encinos', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('encinos');

  service.hooks(hooks);
};