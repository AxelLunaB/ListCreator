// Initializes the `houses` service on path `/houses`
const createService = require('feathers-sequelize');
const createModel = require('../../models/salesDetails.model');
const hooks = require('./salesDetails.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'salesDetails',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/salesDetails', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('/api/salesDetails');

  service.hooks(hooks);
};
