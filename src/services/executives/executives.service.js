// Initializes the `users` service on path `/users`
const createService = require('feathers-sequelize');
const createModel = require('../../models/executives.model');
const hooks = require('./executives.hooks');

//TODO: Validate duplicate entries for email.

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'executives',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/executives', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('executives');

  service.hooks(hooks);
};
