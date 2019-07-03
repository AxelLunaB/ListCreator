// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const errors = require('@feathersjs/errors');

//TODO: Make validation for multiple values.
// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if (context.id == context.params.user.id) {
      console.log(context.id);
      console.log(context.params.user.id);
      throw new errors.Conflict('User has no permissions to perform this action.');
    }
    return context;
  };
};
