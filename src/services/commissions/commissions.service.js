// Initializes the `houses` service on path `/houses`
const createService = require('feathers-sequelize');
const createModel = require('../../models/commissions.model');
const hooks = require('./commissions.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'commissions',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/commissions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('/api/commissions');
  service.hooks(hooks);
};
