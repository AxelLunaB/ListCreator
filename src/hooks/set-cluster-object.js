// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    await context.app.service('api/clusters').find({ query: { id: context.result.clusterId } }).then(result => {
      if (result.data.length > 0) {
        context.result.cluster = result.data[0];
      }
    });
    return context;
  };
};
