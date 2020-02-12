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

const updateUnitCustomer = newCustomer => {
  return new Promise((resolve, reject) => {
    socket.emit('patch', 'units', newCustomer.unitId, { customerId: newCustomer.customerId }, (error, message) => {
      error ? reject(error) : resolve(message);
    });
  })
}

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
};

const removeCustomerFromUnit = data => {
  return new Promise((resolve,reject) => {
    socket.emit('patch', 'units', data, { customerId: null }, (error, response) => {
      error ? reject(error) : resolve(response);
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

const patchUser = user => {
  return new Promise((resolve, reject) => {
    socket.emit('patch', 'users', user.id, user, (error, response) => {
      error ? reject(error) : resolve(response);
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

const getAttachments = unitId => {
  return new Promise((resolve, reject) => {
    socket.emit('find', 'attachments', { unitId: unitId }, (error, response) => {
      error ? reject(error) : resolve(response);
    });
  });
};

const deleteAttachment = data => {
  return new Promise((resolve, reject) => {
    socket.emit('remove', 'attachments', data, (error, response) => {
      error ? reject(error) : resolve(response);
    });
  });
};

const getAttachmentsCustomer = customerId => {
  return new Promise((resolve, reject) => {
    socket.emit('find', 'attachments', { customerId: customerId }, (error, response) => {
      error ? reject(error) : resolve(response);
    });
  });
};

const deleteAllAttachments = attachments => {
  return new Promise((resolve,reject) => {
    // const attachmentId = attachments.data[0].id

    for(let i = 0; i < attachments.data.length; i++) {
      socket.emit('remove', 'attachments', attachments.data[i].id, (error, payments) => {
        if(error) { reject(error); }
      });
    }


  });
};

const updateCustomerInfo = customer => {
  return new Promise((resolve, reject) => {
    socket.emit('patch', 'customers', customer.id, customer, (error, response) => {
      error ? reject(error) : resolve(response);
    });
  });
};

const createNewAttachment = (attachment) => {
  return new Promise((resolve, reject) => {
    socket.emit('create', 'attachments', attachment, (error, response) => {
      error ? reject(error) : resolve(response);
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

const generatePropesctoGuide = type => {
  return new Promise((resolve, reject) => {
    socket.emit('create', 'attachments', type, (err, res) => {
      err ? reject(err) : resolve(res);
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

const getUnitsByStage = (cluster) => {
  return new Promise((resolve, reject) => {
    socket.emit('find', '/units', { clusterId: cluster }, (error, data) => {
      error ? reject(error) : resolve(data);
    });
  });
};

const removeCustomer = customerId => {
  return new Promise((resolve, reject) => {
    socket.emit('remove', 'customers', customerId, (error, response) => {
      error ? reject(error) : resolve(response);
    });
  });
};

const getUnitsInfo = () => {
  return new Promise((resolve, reject) => {
    socket.emit('find', '/units', (error, data) => {
      if(error){
        reject(error);
      } else {
        // We grab the data and we separate it by tower.
        let MADEIRA = [];
        let CARMELINA = [];
        let OPORTO = [];

        data.data.forEach(u => {
          u.clusterId === 1 ?  MADEIRA.push(u) : null
          u.clusterId === 2 ? CARMELINA.push(u): null
          u.clusterId === 3 ? OPORTO.push(u) : null
        })

        let result = {
          MADEIRA,
          CARMELINA,
          OPORTO
        };

        resolve(result);

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
  removeCustomer,
  createNewCustomer,
  fetchCustomers,
  getS3Signature,
  getUnits,
  getUnitsByStage,
  getUnitsInfo,
  updateUnitExecutive,
  updateUnitCustomer,
  fetchUpdatedUnit,
  removeExecutiveFromUnit,
  removeCustomerFromUnit,
  getAttachments,
  deleteAttachment,
  deleteAllAttachments,
  getAttachmentsCustomer,
  createNewAttachment,
  updateCustomerInfo,
  generatePropesctoGuide
}
