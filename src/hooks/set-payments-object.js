// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    await context.app.service('api/commissions').find({ query: { id: context.result.commissionId } }).then(result => {
      if (result.data.length > 0) {
        context.result.commission = result.data;
      }
      return context;
    }).then( async context => {
        console.log(context.result);
        await context.app.service('api/payment').find({ query: { totalPayments: context.result.paymentId } }).then( result2 => {
          if (result2.data.length > 0) {
            context.result.payment = result2.data;
          }
      });

    });
    return context;
  };
};
