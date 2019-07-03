// Initializes the `credix` service on path `/api/credix`
const createService = require('./credix.class.js');
const hooks = require('./credix.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/credix', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/credix');

  service.hooks(hooks);
};
