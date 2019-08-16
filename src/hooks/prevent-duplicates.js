// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    var service = options.service;
    if (context.data != undefined) {
      var clusterId = context.data.clusterId;
      var block = context.data.block;
      var lotnumber = context.data.lotnumber;
      var exists = false;
      /* check if the specified value exists */
      await context.app.service(service).find({ query: { clusterId, block, lotnumber } }).then(result => {
        if (result.total > 0) {
          exists = true;
        }
      });

      if (exists) {//you should not be able to create the same regiter, trwo exception.
        throw new errors.Conflict('There is already a contract.');
      }
    }
    return context;
  };
};
