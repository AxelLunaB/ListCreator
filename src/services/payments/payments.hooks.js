const { authenticate } = require('@feathersjs/authentication').hooks;
const togglePagination = require('../../hooks/toggle-pagination');
const addAssociations = require('../../hooks/add-associations');
const canUpdate = require('../../hooks/can-update');
const setDetailsObject = require('../../hooks/set-paymentsDetails-object');
const preventDuplicate = require('../../hooks/prevent-duplicates');
const iff = require('feathers-hooks-common').iff;
const moment = require('moment');

const createPaymentsDetails = async (context, dueDates, paymentId) => {
  for(let i = 0; i < dueDates.length; i++) {
    // Insert a new payment detail in db for each dueDate in the array
    await context.app.service('api/paymentsDetails').create(
      { 
        paymentNo: 1 + i,
        dueDate: dueDates[i],
        paymentDate: null,
        statusId: 4,
        paymentId: paymentId 
      }
    );
  }
};

const setDueDates = (totalPayments, reserveExpiration) => {
  const dueDates = [];

  for(let i = 1; i <= totalPayments; i++) {
    const dueDate = moment(reserveExpiration).add(i, 'months').format('DD/MM/YYYY');
    dueDates.push(dueDate);
  }
  return dueDates;
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [setDetailsObject()],
    get:[setDetailsObject()],
    create: [
      async context => {

        const { params } = context;
        const { reserveExpiration, contractId } = params;
        const dueDates = setDueDates(12, reserveExpiration);
        const paymentId = context.result.id;

        try {

          if(contractId && paymentId) {
            await context.app.service('api/contracts').patch(contractId, { paymentId: paymentId });
          }
        } catch(e) {
          console.log(e);
        }

        createPaymentsDetails(context, dueDates, paymentId); 
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
