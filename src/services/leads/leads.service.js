// Initializes the `encinos` service on path `/encinos`
const createService = require('feathers-sequelize');
const createModel = require('../../models/leads.model');
const hooks = require('./leads.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'leads',
    Model,
    paginate
  };

  app.use('/leads', createService(options));
  const service = app.service('leads');

  service.hooks(hooks);
};
