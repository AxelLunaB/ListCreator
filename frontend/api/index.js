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

const fetchDepartmentsByCluster = ($skip, cluster) => {
  console.log(cluster);

  return new Promise((resolve) => {
    socket.emit("api/departments::find", {clusterId: cluster}, (error, lots) => {
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

const fetchTotalContracts = async unitId => {
  return new Promise((resolve, reject) => {
    socket.emit('find', 'api/contracts', { unitId: unitId }, (error, response) => {
      error ? reject(error) : resolve(response);
    });
  });
};

/* Retrieves all contracts by Paid Reference */
const fetchContractsByPaidRef = async () => {
  // Contracts
  const contracts = [];

  // References ID
  const referencesId = [];

  // Fetch all references that belongs to
  // a paid reference
  await socket.emit('api/references::find', { statusId: 5 }, (error, references) => {

    if(error) {
      throw new Error(error);
    }

    // All Paid References as Array : []
    const paidReferences = references;
      
    paidReferences.data.forEach(reference => {
      let id = reference.id;
      referencesId.push(id);
    });
  });

  await socket.emit('find', 'api/contracts', { $sort: { id: 1 } }, (error, response) => {

    if(error) {
      throw new Error(error);
    }

    console.log('CONTRACTS');
    console.log(response);

    console.log('ReferencesID');
    console.log(referencesId);
      
    if(response !== null || response !== undefined) {
      referencesId.forEach(id => {
        // Search for referenceId at Contracts
        let contract = response.data.find(element => {
          return element.referenceId === id;
        });
  
        // Pushes the data to contracts array
        contracts.push(contract);
      });
    }
      
  });
    
  console.log('CONTRACTS PAID');
  console.log(contracts);

  return new Promise((resolve) => {
    resolve(contracts);
  });
};

const fetchContracts = ($skip, query) => {
  query = query != null ? query : {};
  query['$skip'] = $skip;
  return new Promise((resolve) => {
    socket.emit("api/contracts::find", query, (error, lots) => {
      resolve(lots);
    });
  })
};

const createContract = (contract) => {
  return new Promise((resolve, reject) => {
    socket.emit('api/contracts::create', contract, (error, message) => {
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

const fetchReferences = () => {
  return new Promise((resolve, reject) => {
    socket.emit('find', 'api/references', {}, (error, count) => {
      if (error) {
        reject(error);
      } else {
        resolve(count);
        //console.log(count.data);
      }
    });
  });
}

/* Attachments */
const getS3Signature = file => {
  return new Promise((resolve, reject) => {
    socket.emit('/attachments::create', file, (error, response) => {
      error ? reject(error) : resolve(response);
    });
  });
};

/* References */
const patchReferences = reference => {
  return new Promise((resolve, reject) => {
    socket.emit('patch', 'api/references', reference.id, { statusId: reference.statusId }, (error, response) => {
      error ? reject(error) : resolve(response);
    });
  });
};

const cancelReferences = async reference => {
   // Paid Reference
   const paidReference = reference.paidReference;
   // Status to patch
   const statusId = reference.statusId;
   // UnitID to patch
   const unitId = reference.unitId;
   // First fetchTotalContracts that belongs to the same unit in api/contracts
   const totalContracts = await fetchTotalContracts(unitId); // Returns an objects array

   console.log('Total Contracts ------------>');
   console.log(totalContracts);

   try {

    // First patch the reference paid
    socket.emit('patch', 'api/references', paidReference, { statusId: statusId },  (error, response) => {
      console.log(`Paid ReferenceID: ${paidReference}`);
    });

    // Patch Department
    socket.emit('patch', 'api/departments', unitId, { statusId: 3 }, (error, response) => {
      console.log(`UnitID: ${unitId} RESERVED`);
    });

    totalContracts.data.forEach(obj => {
      if(obj.referenceId !== paidReference) {

        socket.emit('patch', 'api/references', obj.referenceId, { statusId: 8 }, (error, response) => {
          console.log(`Reference ID: ${obj.referenceId} cancelled.`);
        });
      }
    });

   } catch(e) {
     console.log(e);
   }

   console.log('References cancelled sucessfully!');
};

export {
  authenticateSocket,
  fetchStatus,
  fetchClusters,
  fetchCountByCluster,
  //
  createHouse,
  fetchHouses,
  patchHouse,
  //
  createDepartments,
  fetchDepartments,
  patchDepartments,
  fetchDepartmentsByCluster,
  //
  fetchContracts,
  fetchContractsByPaidRef,
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
  createNewCustomer,
  fetchCustomers,
  //
  fetchCountHouses,
  fetchCountDepartments,
  //
  patchReferences,
  fetchReferences,
  cancelReferences,
  //
  getS3Signature
}
