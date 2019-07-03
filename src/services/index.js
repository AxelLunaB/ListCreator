const users = require('./users/users.service.js');
const departments = require('./departments/departments.service.js');
const departmentsHistorics = require('./departments-historics/departments-historics.service.js');
const mailer = require('./mailer/mailer.service.js');
const authmanagement = require('./authmanagement/authmanagement.service.js');
const status = require('./status/status.service.js');
const clusters = require('./clusters/clusters.service.js');
const countByCluster = require('./count-by-cluster/count-by-cluster.service.js');
const credix = require('./credix/credix.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(departments);
  app.configure(departmentsHistorics);
  app.configure(mailer);
  app.configure(authmanagement);
  app.configure(status);
  app.configure(clusters);
  app.configure(countByCluster);
  app.configure(credix);
};
