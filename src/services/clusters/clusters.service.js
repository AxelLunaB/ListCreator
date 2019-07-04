// Initializes the `clusters` service on path `/api/clusters`
const createService = require('feathers-sequelize');
const createModel = require('../../database/models/clusters.model');
const hooks = require('./clusters.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/clusters', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/clusters');

  service.hooks(hooks);
};
