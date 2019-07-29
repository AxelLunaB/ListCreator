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
/* HOUSES */
const createHouse = (house) => {
  return new Promise((resolve, reject) => {
    socket.emit('create', 'api/houses', house, (error, message) => {
      if (error) {
        reject(error);
      } else {
        resolve(message);
      }
    });
  })
};
const fetchHouses = ($skip, query) => {
  query = query != null ? query : {};
  query['$skip'] = $skip;
  return new Promise((resolve) => {
    socket.emit("api/houses::find", query, (error, lots) => {
      resolve(lots);
    });
  })
};
const patchHouse = (house) => {
  return new Promise((resolve, reject) => {
    socket.emit('patch', 'api/houses', house.id, house, (error, message) => {
      // console.log(error);
      // console.log(message);
      if (error) {
        reject(error);
      } else {
        resolve(message);
      }
    });
  });
};

/* DEPARTMENTS */
const createDepartments = (department) => {
  return new Promise((resolve, reject) => {
    socket.emit('create', 'api/departments', department, (error, message) => {
      if (error) {
        reject(error);
      } else {
        resolve(message);
      }
    });
  })
};
const fetchDepartments = ($skip, query) => {
  query = query != null ? query : {};
  query['$skip'] = $skip;
  return new Promise((resolve) => {
    socket.emit("api/departments::find", query, (error, lots) => {
      resolve(lots);
    });
  })
};
const patchDepartments = (department) => {
  return new Promise((resolve, reject) => {
    socket.emit('patch', 'api/departments', department.id, department, (error, message) => {
      if (error) {
        reject(error);
      } else {
        resolve(message);
      }
    });
  });
};

/* CONTRACTS */

const fetchContracts = ($skip, query) => {
  query = query != null ? query : {};
  query['$skip'] = $skip;
  return new Promise((resolve) => {
    socket.emit("api/contracts::find", query, (error, lots) => {
      resolve(lots);
    });
  })
};
const createContract = (department) => {
  return new Promise((resolve, reject) => {
    socket.emit('create', 'api/contracts', department, (error, message) => {
      if (error) {
        reject(error);
      } else {
        resolve(message);
      }
    });
  })
};

// commissions
const fetchCommissions = ($skip, query) => {
  query = query != null ? query : {};
  query['$skip'] = $skip;
  return new Promise((resolve) => {
    socket.emit("api/commissions::find", query, (error, lots) => {
      resolve(lots);
    });
  })
};

/* LOTS */
const createLot = (lot) => {
  return new Promise((resolve, reject) => {
    socket.emit('create', 'api/lots', lot, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};
const fetchLots = ($skip, query) => {
  query = query != null ? query : {};
  query['$skip'] = $skip;
  return new Promise((resolve, reject) => {
    socket.emit('find', 'api/lots', query, (error, lots) => {
      if (error) {
        reject(error);
      } else {
        resolve(lots);
      }
    });
  });
};
const patchLot = (lot) => {
  return new Promise((resolve, reject) => {
    socket.emit('patch', 'api/lots', lot.id, lot, (error, message) => {
      if (error) {
        reject(error);
      } else {
        resolve(message);
      }
    });
  })
};

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

const fetchCountHouses = () => {
  return new Promise((resolve, reject) => {
    socket.emit('find', 'api/countByCluster', {}, (error, count) => {
      if (error) {
        reject(error);
      } else {
        resolve(count);
      }
    });
  });
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
}

export {
  authenticateSocket,
  fetchStatus,
  fetchClusters,
  //
  createHouse,
  fetchHouses,
  patchHouse,
  //
  createDepartments,
  fetchDepartments,
  patchDepartments,
  //
  fetchContracts,
  createContract,
  fetchCommissions,
  //
  createLot,
  fetchLots,
  patchLot,
  //
  createUser,
  currentUser,
  deleteUser,
  fetchUsers,
  patchUser,
  //
  fetchCustomers,
  //
  fetchCountHouses,
  fetchCountDepartments,
}
