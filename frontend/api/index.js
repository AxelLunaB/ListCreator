/* eslint-disable */
// api/index.js
import cookie from '@/utils/cookie';
import socket from '@/io';

/* AUTHENTICATION */
const authenticateSocket = () => {
  return new Promise((resolve, reject) => {
    const params = { strategy: "jwt", accessToken: cookie() };
    socket.emit("authenticate", params, function (message, data) {
      //message should be null.
      // console.log(data);
      // console.log(message);
      if (message != null || message != undefined) {
        reject();
      } else {
        resolve();
      }
    });
  })
};

const updateUnitStatus = (newStatus) => {
  console.log(newStatus);
  return new Promise((resolve, reject) => {
    socket.emit('patch', 'units', newStatus.unitId, {statusId: newStatus.statusId}, (error, message) => {
      if (error) {
        reject(error);
      } else {
        resolve(message);
      }
    });
  })
};

const updateUnitExecutive = (newStatus) => {
  console.log(newStatus);
  return new Promise((resolve, reject) => {
    socket.emit('patch', 'units', newStatus.unitId, {userId: newStatus.userId}, (error, message) => {
      if (error) {
        reject(error);
      } else {
        resolve(message);
      }
    });
  })
};

const fetchUpdatedUnit = (unit) => {
  console.log(unit);
  return new Promise((resolve, reject) => {
    socket.emit('find', 'units',{ id: unit }, (error, message) => {
      if (error) {
        reject(error);
      } else {
        resolve(message);
      }
    });
  })
};

const removeExecutiveFromUnit = data => {
  return new Promise((resolve,reject) => {
    socket.emit('patch', 'units', data, { userId: null }, (error, response) => {
      error ? reject(error) : resolve(response);
    });
  })
}

/* USERS */
const createUser = (user) => {
  return new Promise((resolve, reject) => {
    socket.emit('create', 'users', user, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};
const currentUser = () => {
  return new Promise((resolve, reject) => {
    socket.emit('find', 'users', { current: 'true' }, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user)
      }
    });
  });
};
const fetchUsers = ($skip) => {
  return new Promise((resolve, reject) => {
    socket.emit('find', 'users', { $skip }, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  })
};

const fetchCustomers = ($skip, query) => {
  query = query != null ? query : {};
  query['$skip'] = $skip;
  return new Promise((resolve, reject) => {
    socket.emit('find', 'customers', query, (error, customers) => {
      if (error) {
        reject(error);
      } else {
        resolve(customers);
      }
    });
  });
};

const fetchExecutives = () => {
  return new Promise((resolve, reject) => {
    socket.emit('find', 'users', { type: { $in: ['A', 'V'] } }, (error, data) => {
      error ? reject(error) : resolve(data);
    });
  });
};

const createNewCustomer = (customer) => {
  return new Promise((resolve, reject) => {
    socket.emit('create', 'customers', customer, (error, response) => {
      error ? reject(error) : resolve(response);
    });
  });
};

const deleteUser = (user) => {
  return new Promise((resolve, reject) => {
    socket.emit('remove', 'users', user.id, user, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};
const patchUser = (user) => {
  return new Promise((resolve, reject) => {
    socket.emit('patch', 'users', user.id, user, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

const fetchStatus = () => {
  return new Promise((resolve, reject) => {
    socket.emit('find', 'api/status', {}, (error, status) => {
      if (error) {
        reject(error);
      } else {
        resolve(status);
      }
    });
  });
};

const fetchClusters = () => {
  return new Promise((resolve, reject) => {
    socket.emit('find', 'api/clusters', { $paginate: 'false' }, (error, clusters) => {
      if (error) {
        reject(error);
      } else {
        resolve(clusters);
      }
    });
  });
};

const fetchCountByCluster = clusterObj => {
  return new Promise((resolve, reject) => {
    socket.emit('find', '/api/countByCluster', clusterObj, (error, cluster) => {
      error ? reject(error) : resolve(cluster);
    });
  });
};

const fetchUnitsByCluster = ($skip, info) => {
  // Returns all clusters if user is not executive else returns only units assigned to said
  if(info) {

      return new Promise((resolve) => {
        socket.emit("api/departments::find", { clusterId: info.tower }, (error, lots) => {
          resolve(lots);
        });
      })

    }

};

const fetchCountDepartments = () => {
  return new Promise((resolve, reject) => {
    socket.emit('find', 'api/countByCluster', {}, (error, count) => {
      if (error) {
        reject(error);
      } else {
        resolve(count);
        //console.log(count.data);
      }
    });
  });
};


/* Attachments */
const getS3Signature = file => {
  return new Promise((resolve, reject) => {
    socket.emit('create', 'attachments', file, (error, response) => {
      error ? reject(error) : resolve(response);
    });
  });
};

/* Units */
const getUnits = () => {
  return new Promise((resolve, reject) => {
    socket.emit('find', '/units', {}, (error, count) => {
      if (error) {
        reject(error);
      } else {
        resolve(count);
      }
    });
  });
};

const getUnitsByStage = (stage) => {
  return new Promise((resolve, reject) => {
    socket.emit('find', '/units', { stage: stage }, (error, data) => {
      error ? reject(error) : resolve(data);
    });
  });
};

const getUnitsInfo = () => {
  return new Promise((resolve, reject) => {
    socket.emit('find', '/units', (error, data) => {
      if(error){
        reject(error);
      } else {
        let stageInfo = [];

        let stages = {}
        data.data.forEach(function(u){
          stageInfo.includes(u.stage) ? stageInfo : stageInfo.push(u.stage);
        });

        for(let i = 0 ; i < stageInfo.length; i++){

          let vendido = []; let apartado =[]; let bloqueado = []; let disponible = [];

          stages[stageInfo[i]];

          for(let o = 0 ; o < data.data.length; o++){

            if(data.data[o].statusId === 1 && data.data[o].stage === stageInfo[i])
            disponible.push(data.data[o]);

            if(data.data[o].statusId === 2 && data.data[o].stage === stageInfo[i])
            vendido.push(data.data[o]);

            if(data.data[o].statusId === 3 && data.data[o].stage === stageInfo[i])
            apartado.push(data.data[o]);

            if(data.data[o].statusId === 4 && data.data[o].stage === stageInfo[i])
            bloqueado.push(data.data[o]);
          }

          let all = disponible.length + vendido.length + apartado.length + bloqueado.length;

          stages[stageInfo[i]] = {
            "APARTADO":apartado.length,
            "VENDIDO":vendido.length,
            "BLOQUEADO":bloqueado.length,
            "DISPONIBLE":disponible.length,
            "TOTAL":all
          }
        }

        resolve(stages);

      }
    });
  });
};


export {
  authenticateSocket,
  fetchStatus,
  fetchExecutives,
  fetchClusters,
  fetchCountByCluster,
  fetchUnitsByCluster,
  updateUnitStatus,
  createUser,
  currentUser,
  deleteUser,
  fetchUsers,
  patchUser,
  createNewCustomer,
  fetchCustomers,
  getS3Signature,
  getUnits,
  getUnitsByStage,
  getUnitsInfo,
  updateUnitExecutive,
  fetchUpdatedUnit,
  removeExecutiveFromUnit
}
