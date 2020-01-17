// Initializes the `encinos` service on path `/encinos`
const createService = require('feathers-sequelize');
const createModel = require('../../models/units.model');
const hooks = require('./units.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'encinos',
    Model,
    paginate
  };

  app.use('/units', createService(options));
  const service = app.service('units');

  service.hooks(hooks);
};
