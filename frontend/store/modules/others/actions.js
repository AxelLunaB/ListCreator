/* eslint-disable */
import { authenticateSocket,
  fetchStatus,
  fetchClusters,
  fetchCountUnits,
  fetchCustomers,
  createNewCustomer,
  getUnitsInfo
} from '@/api';

const authenticate = (context) => {
  return new Promise((resolve, reject) => {
    authenticateSocket().then(response => {
      context.commit('IS_AUTHENTICATED', true);
      resolve();
    }).catch(err => {
      reject();
    });
  });
};

const setPlusButton = (context, plusBtn) => {
  context.commit('ADD_BUTTON', plusBtn);
};

const setNewCustomer = (context, customer) => {
  return new Promise((resolve, reject) => {
    createNewCustomer(customer).then(res => {
      // context should be called to commit some mutation in order to send popups or something.
      resolve(res);
    }).catch(e => {
      reject(e);
    });
  })
};

const getStatus = (context) => {
  fetchStatus().then(response => {
    context.commit('STATUS_UPDATED', response.data);
  }).catch(err => {
    // ?
  });
};

const getClusters = (context) => {
  fetchClusters().then(response => {
    context.commit('CLUSTERS_UPDATED', response);
  }).catch(err => {
    // ?
  });
};

const getCustomers = (context) => {
  fetchCustomers().then(response => {
    context.commit('CUSTOMERS_UPDATED', response);
  }).catch(err => {
    // ?
  });
};

const getCountUnits = (context) => {
  fetchCountUnits().then(response => {
    context.commit('COUNT_DEPARTMENTS_UPDATED', response);
  }).catch(err => {

  })
};


const fetchAllUnits = (context) => {
  return new Promise((resolve, reject) => {
    getUnits().then(res => {
      context.commit('UNITS', res);
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
};



const fetchUnitsInfo = (context) => {
  return new Promise((resolve, reject) => {
    getUnitsInfo().then(res => {
      context.commit('STAGES_INFO', res);
      resolve(res);
    }).catch(error => {
      reject(error);
    })
  })
}

export default {
  authenticate,
  getClusters,
  getCustomers,
  getStatus,
  setPlusButton,
  setNewCustomer,
  getCountUnits,
  fetchAllUnits,
  fetchUnitsInfo
};
