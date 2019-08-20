/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }
  setup(app) {
    this.app = app;
  }

  async find(params) {
    // Use params.query to retrieve the clusterId

    let data = {};

    let status = [];
    let clusters = [];
    let units = [];

    try {
      await this.app.service('api/status').find({ query: { $paginate: 'false' } }).then(res => {
        status = res;
      });

      await this.app.service('api/clusters').find({ query: { $paginate: 'false' } }).then(res => {
        clusters = res;
      });

      await this.app.service('/api/departments').find({ query: { $paginate: 'false' } }).then(res => {
        units = res;
      });

      // Add each cluster to data object
      clusters.forEach(cluster => {
        // Checks if cluster is not already in the object by name
        console.log(cluster);
      });

      console.log('Data Object -------------------------------------->');
      console.log(data);

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
