const users = require('./users/users.service.js');
// const executives = require('./executives/executives.service.js');
const departments = require('./departments/departments.service.js');
const contracts = require('./contracts/contracts.service.js');
const commissions = require('./commissions/commissions.service.js');
// const departmentsHistorics = require('./departments-historics/departments-historics.service.js');
const mailer = require('./mailer/mailer.service.js');
const authmanagement = require('./authmanagement/authmanagement.service.js');
const salesDetails = require('./salesDetails/salesDetails.service.js');
const status = require('./status/status.service.js');
const clusters = require('./clusters/clusters.service.js');
const countByCluster = require('./count-by-cluster/count-by-cluster.service.js');
const credix = require('./credix/credix.service.js');
const payments = require('./payments/payments.service.js');
const paymentsDetails = require('./paymentsDetails/paymentsDetails.service.js');
const customers = require('./customers/customers.service.js');
const references = require('./references/references.service.js');
const attachments = require('./attachments/attachments.service.js');
const encinos = require('./encinos/encinos.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
   app.configure(users);
  // app.configure(customers);
  // app.configure(executives);
  // app.configure(departments);
  // app.configure(contracts);
  // app.configure(commissions);
  // app.configure(salesDetails);
  // app.configure(departmentsHistorics);
  // app.configure(mailer);
  app.configure(authmanagement);
  app.configure(status);
  app.configure(clusters);
  // app.configure(countByCluster);
  // app.configure(credix);
  // app.configure(paymentsDetails);
  // app.configure(payments);
  // app.configure(references);
  // app.configure(attachments);
  app.configure(encinos);
};
