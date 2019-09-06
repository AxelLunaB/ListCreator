/* eslint-disable no-unused-vars */
class Service {

    constructor(options) {
      this.options = options || {};
    }

    setup(app) {
      this.app = app;
    }
  
    async find(params) {
        
    }
  
    async get(id, params) {
      
    }
  
    async create(data, params) {
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