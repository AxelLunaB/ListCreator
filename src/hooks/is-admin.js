// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    var data = context.params;
    if (data === undefined) {
      // console.log('data undefined');
      return context;
    }
    if (data.user !== undefined) {
      // console.log('user undefined');

      if (data.user.type !== 'A') { //User is not admin, should not be able to moddify any user object.
        // console.log('diferente de A ');
        // console.log(data.user.type);
        throw new errors.Forbidden('User has no permissions to perform this action.');
      } else {
        // console.log(data.user.type);
      }
    }
    return context;
  };
};
