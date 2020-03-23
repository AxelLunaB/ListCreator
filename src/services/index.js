const users = require('./users/users.service.js');
const status = require('./status/status.service.js');



module.exports = function (app) {
  app.configure(users);
  app.configure(status);
};
