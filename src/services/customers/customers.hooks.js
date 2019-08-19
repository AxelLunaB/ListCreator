const local = require('@feathersjs/authentication-local');
const isAdmin = require('../../hooks/is-admin');
const { authenticate } = require('@feathersjs/authentication').hooks;
const { softDelete, iff } = require('feathers-hooks-common');
const isCurrent = adminRole => context => context.params.query.current != undefined && context.params.query.current == 'true';
const accountService = require('../authmanagement/notifier');
const preventSelfDelete = require('../../hooks/prevent-self-delete');
const verifyHooks = require('feathers-authentication-management').hooks;

const newCustomer = async context => {
  const name = context.data.name;
  const age = context.data.age;
  const address = context.data.address;
  const country = context.data.country;
  const state = context.data.state;
  const city = context.data.city;
  const contactN = context.data.contactNumber;
  const email = context.data.email;
  const userType = '0';

  const customer = {
    name: name,
    age: age,
    address: address,
    country: country,
    state: state,
    city: city,
    userType: userType,
    contactNumber: contactN,
    email: email
  };

  try {
    await context.app.service('/customers').create(customer).then(response => {
      console.log(response);
    });
  } catch(e) {
    console.log(e);
  }
};

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async context => {
        newCustomer(context);
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
