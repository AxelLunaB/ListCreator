var mysql = require('mysql');
/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }
  setup(app) {
    this.app = app;
  }

  async find(params) {
    var db_ext = mysql.createConnection ({
            host: '216.172.184.60',
            port: '3306',
            database: 'arquimo_arid',
            user: 'arquimo_arid',
            password: 'Aridcc2016',
            charset: 'utf8mb4',
            collation: 'utf8mb4_unicode_ci',
            prefix: '',
            strict: true
    });

    db_ext.connect(function(err) {
      if (err) {
      console.error('error connecting: ' + err.stack);
      return;
      }
      console.log('connected as id ' + db_ext.threadId);
    })

    return await new Promise((resolve, reject) =>{
      db_ext.query('SELECT * FROM arquimo_arid.altozanoChihuahua', function (error, results, fields) {
        var res= [];
        for(var i = 0;i<results.length;i++){
          let e = results[i];
          let x = {
            id: e.idlotes,
            manzana: e.manzana,
            lote: e.lote,
            metros: e.metros,
            preciom2: e.preciom2,
            tipo: e.tipo,
            seccion: e.seccion,
            estado: e.estado,
          }
          res[i] = x;
        }

        db_ext.end();
        resolve(res);
      }
      );
    })



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
