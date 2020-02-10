// Initializes the `mailer` service on path `/mailer`
const createService = require('./mailer.class.js');
const hooks = require('./mailer.hooks');
const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');
const bodyParser = require('body-parser');

module.exports = async function (app) {

  const paginate = app.get('paginate');
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

  // Initialize our service with any options it requires
  app.use('/mailer', Mailer(smtpTransport({
    host: 'smtp.ar3d.net',
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: { rejectUnauthorized: false }
  })));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('mailer');
  service.hooks(hooks);

  // Send current email
  // await app.service('mailer').create(email);
};
