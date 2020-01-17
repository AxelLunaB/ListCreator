const users = require('./users/users.service.js');
const mailer = require('./mailer/mailer.service.js');
const authmanagement = require('./authmanagement/authmanagement.service.js');
const status = require('./status/status.service.js');
const clusters = require('./clusters/clusters.service.js');
const countByCluster = require('./count-by-cluster/count-by-cluster.service.js');
const customers = require('./customers/customers.service.js');
const attachments = require('./attachments/attachments.service.js');
const units = require('./units/units.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
   app.configure(users);
  app.configure(authmanagement);
  app.configure(status);
  app.configure(clusters);
  app.configure(units);
};
