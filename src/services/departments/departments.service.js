// Initializes the `houses` service on path `/houses`
const createService = require('feathers-sequelize');
const createModel = require('../../models/units.model');
const hooks = require('./departments.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'units',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/departments', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('/api/departments');

  service.hooks(hooks);
};
