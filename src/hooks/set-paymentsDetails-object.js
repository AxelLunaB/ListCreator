// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    await context.app.service('api/paymentsDetails').find({ query: { paymentId: context.result.id } }).then(result => {
      if (result.data.length > 0) {
        context.result.paymentsDetails = result.data;
      }
      return context;
    }).then( async context => {
      for (i = 0; i < context.result.paymentsDetails.length; i++) {

        await context.app.service('api/status').find({ query: { id: context.result.paymentsDetails[i].statusId } }).then( result2 => {
          if (result2.data.length > 0) {
            context.result.paymentsDetails[i].status = result2.data[0];
          }
      });
    }
    });
    return context;
  };
};
