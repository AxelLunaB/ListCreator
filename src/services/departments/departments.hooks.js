const { authenticate } = require('@feathersjs/authentication').hooks;
const togglePagination = require('../../hooks/toggle-pagination');
const addAssociations = require('../../hooks/add-associations');
const setClusterObject = require('../../hooks/set-cluster-object');
const setStatusObject = require('../../hooks/set-status-object');
const canUpdate = require('../../hooks/can-update');
const preventDuplicate = require('../../hooks/prevent-duplicates');

const getClusterById = async context => {
  const clusterId = 1;

  try {
    await context.app.service('/api/departments').find({ clusterId: clusterId })
    .then(res => {
      console.log(res);
    });
  } catch(e) {
    console.log(e);
  }
};

module.exports = {
  before: {
    all: [
    authenticate('jwt')
    ],
    find: [
     togglePagination(),
      addAssociations({
        models: [
          {
            model: 'api/clusters',
            as: 'cluster'
          },
          {
             model: 'api/status',
             as: 'status'
          }
        ]
      }),
      context => {
        if (context.params.query.$sort == undefined) {
          context.params.query.$sort = {
            id: 1
          }
        }
      }
    ],
    get: [],
    create: [preventDuplicate({ service: 'api/departments' })],
    update: [canUpdate()],
    patch: [
      // canUpdate(),
      // async context => {
      //   var historic = {};
      //   /* search current values */
      //   await context.app.service('api/departments').get(context.id).then(department => {
      //     /* add values to the object */
      //     for (let k in department) {
      //       historic[k] = department[k];
      //     }
      //     historic.departmentid = department.id;
      //   });
      //   /* assign new values & save it. */
      //   for (let k in context.data) {
      //     historic[`${k}new`] = context.data[k];
      //   }
      //
      //   historic.userid = context.params.user.id;
      //   delete historic.id;
      //   if (historic.cluster != undefined) {
      //     delete historic.cluster;
      //   }
      //   if (historic.status != undefined) {
      //     delete historic.status;
      //   }
      //
      //   await context.app.service('api/departments-historics').create(historic).then(historic => {
      //     console.log(historic);
      //   });

      // }
    ],
    remove: [canUpdate()]
  },

  after: {
    all: [],
    find: [
      async context => {
        getClusterById(context);
      }
    ],
    get: [
      setClusterObject(),
      setStatusObject(),
    ],
    create: [
      setClusterObject(),
      setStatusObject(),
    ],
    update: [
      setClusterObject(),
      setStatusObject(),
    ],
    patch: [
      setClusterObject(),
      setStatusObject(),
    ],
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
