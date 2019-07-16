// Initializes the `houses` service on path `/houses`
const createService = require('feathers-sequelize');
const createModel = require('../../models/paymentsDetails.model');
const hooks = require('./paymentsDetails.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'paymentsDetails',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/paymentsDetails', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('/api/paymentsDetails');

  service.hooks(hooks);
};
