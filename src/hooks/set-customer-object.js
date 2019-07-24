// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if(context.result.customerId != null) {
    await context.app.service('customers').find({ query: { id: context.result.customerId } }).then(result => {
      if (result.data.length > 0) {
        delete result.data[0].password;
        delete result.data[0].type;
        delete result.data[0].deleted;
        context.result.customer = result.data[0];
      }
    });
    }
    return context;
  };
};
