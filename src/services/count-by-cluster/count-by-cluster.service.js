// Initializes the `countByCluster` service on path `/api/countByCluster`
const createService = require('./count-by-cluster.class.js');
const hooks = require('./count-by-cluster.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/countByCluster', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/countByCluster');

  service.hooks(hooks);
};
