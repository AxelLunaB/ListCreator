/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }
  setup(app) {
    this.app = app;
  }

  async find(params) {
    // Use params.query.id to retrieve the clusterId

    let data = {};
    let totalKeys = 0;
    let clusters = [];
    let units = [];

    // Status Counters
    let availableStatus = 0;
    let soldStatus = 0;
    let reservedStatus = 0;
    let notPaidStatus = 0;
    let paidStatus = 0;
    let referredStatus = 0;
    let blockedStatus = 0;

    try {

      await this.app.service('api/clusters').find({ query: { $paginate: 'false' } }).then(res => {
        clusters = res;
      });

      await this.app.service('/api/departments').find({ query: { $paginate: 'false' } }).then(res => {
        units = res;
      });

      // Add each cluster to data object
      clusters.forEach(cluster => {

      let statusCount = {
        available: 0,
        blocked: 0,
        notPaid: 0,
        paid: 0,
        referred: 0,
        reserved: 0,
        sold: 0
      };


      // Restarts variables for every status
      availableStatus = 0;
      soldStatus = 0;
      reservedStatus = 0;
      notPaidStatus = 0;
      paidStatus = 0;
      referredStatus = 0;
      blockedStatus = 0;

        // Checks if cluster is not already in the object by name
        if(data[cluster.name] === undefined) {

          // Initialize an object for each cluster added
          data[cluster.name] = {
            name:cluster.name,
            keys: 0,
            oneBR: null,
            twoBR: null,
            threeBR: null,
            total: 0,
            statusCount: statusCount
          };

          // Add total of keys to specific cluster
          units.forEach(unit => {

            if(unit.dataValues.clusterId === cluster.id) {
              totalKeys += unit.dataValues.nkeys;

              switch(unit.dataValues.statusId) {
                case 1:
                  availableStatus += 1;
                  statusCount.available += 1;
                  break;

                case 2:
                  soldStatus += 1;
                  statusCount.sold += 1;
                  break;

                case 3:
                  reservedStatus += 1;
                  statusCount.reserved += 1;
                  break;

                case 4:
                  notPaidStatus += 1;
                  statusCount.notPaid += 1;
                  break;

                case 5:
                  paidStatus += 1;
                  statusCount.paid += 1;
                  break;

                case 6:
                  referredStatus += 1;
                  statusCount.referred += 1;
                  break;

                case 7:
                  blockedStatus += 1;
                  statusCount.blocked += 1;
                  break;

                default:
                  throw new Error('Incorrect status.');
              } // Switch closing bracket
            }

          });

          let clusterName = cluster.name;
          data[clusterName]['keys'] = totalKeys;
          data[clusterName]['statusCount'] = statusCount;
          totalKeys = 0;
        }

      });

      // Add Total for each status to data object
      // data.statusCount = {};
      // data.statusCount.available = availableStatus;
      // data.statusCount.sold = soldStatus;
      // data.statusCount.reserved = reservedStatus;
      // data.statusCount.notPaid = notPaidStatus;
      // data.statusCount.paid = paidStatus;
      // data.statusCount.referred = referredStatus;
      // data.statusCount.blocked = blockedStatus;

    } catch(e) {
      console.log(e);
    }

    // await this.app.service('api/houses').find({ query: { $paginate: 'false' } }).then(result => {
    //   result.forEach(e => {
    //     if (x[e.cluster.name] == undefined) {
    //       x[e.cluster.name] = {};
    //       x[e.cluster.name]['TOTAL'] = { color: '#fff', total: 0 };
    //       x[e.cluster.name]['id'] = e.cluster.id;
    //       x[e.cluster.name]['code'] = e.cluster.code;
    //       x[e.cluster.name]['values'] = {};
    //       status.forEach(s => {
    //         if (x[e.cluster.name]['values'][s.name] == undefined) {
    //           x[e.cluster.name]['values'][s.name] = { color: s.color_hex, total: 0, id: s.id };
    //         }
    //       })
    //     }
    //     if (x[e.cluster.name]['values'][e.status.name] == undefined) {
    //       x[e.cluster.name]['values'][e.status.name] = { color: e.status.color_hex, total: 0, id: e.status.id };
    //     }
    //     x[e.cluster.name]['values'][e.status.name]['total']++;
    //     x[e.cluster.name]['TOTAL'].total++;
    //   });
    // });

    // await this.app.service('api/lots').find({ query: { $paginate: 'false' } }).then(result => {
    //   result.forEach(e => {
    //     if (x[e.cluster.name] == undefined) {
    //       x[e.cluster.name] = {};
    //       x[e.cluster.name]['TOTAL'] = { color: '#fff', total: 0 };
    //       x[e.cluster.name]['id'] = e.cluster.id;
    //       x[e.cluster.name]['code'] = e.cluster.code;
    //       x[e.cluster.name]['values'] = {};
    //       status.forEach(s => {
    //         if (x[e.cluster.name]['values'][s.name] == undefined) {
    //           x[e.cluster.name]['values'][s.name] = { color: s.color_hex, total: 0, id: s.id };
    //         }
    //       })
    //     }
    //     if (x[e.cluster.name]['values'][e.status.name] == undefined) {
    //       x[e.cluster.name]['values'][e.status.name] = { color: e.status.color_hex, total: 0, id: e.status.id };
    //     }
    //     x[e.cluster.name]['values'][e.status.name]['total']++;
    //     x[e.cluster.name]['TOTAL'].total++;
    //   });
    // });

    // var finalResult = [];

    // for (var item in x) { // trae cluster
    //   var obj = { id: x[item]['id'], code: x[item]['code'], name: item, total: x[item]['TOTAL'].total, status: [] };
    //   for (var status in x[item]['values']) {
    //     obj.status.push({ name: status, id: x[item]['values'][status].id, color: x[item]['values'][status].color, total: x[item]['values'][status].total });
    //   }
    //   finalResult.push(obj);
    // }
    // finalResult.sort((a, b) => {
    //   b.name[0] > a.name[0]
    // });
    // return finalResult;

    return data;
  }

  async get(id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
