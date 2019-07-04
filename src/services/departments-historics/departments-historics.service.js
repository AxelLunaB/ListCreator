// // Initializes the `houseHistorics` service on path `/house-historics`
// const createService = require('feathers-sequelize');
// const createModel = require('../../models/departments-historics.model');
// const hooks = require('./departments-historics.hooks');
//
// module.exports = function (app) {
//   const Model = createModel(app);
//   const paginate = app.get('paginate');
//   const options = {
//     name: 'departments-historics',
//     Model,
//     paginate
//   };
//
//   // Initialize our service with any options it requires
//   app.use('/api/departments-historics', createService(options));
//
//   // Get our initialized service so that we can register hooks and filters
//   const service = app.service('api/departments-historics');
//
//   service.hooks(hooks);
// };
