import { authenticateSocket, fetchStatus, fetchClusters, fetchCountHouses,fetchCountDepartments,fetchCustomers, createNewCustomer } from '@/api';

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

const getCountHouses = (context) => {
  fetchCountHouses().then(response => {
    context.commit('COUNT_HOUESES_UPDATED', response);
  }).catch(err => {
    // ?
  })
};

const getCountLots = (context) => {
  fetchCountHouses().then(response => {
    context.commit('COUNT_LOTS_UPDATED', response);
  }).catch(err => {
    // ?
  })
};

const getCountDepartments = (context) => {
  fetchCountDepartments().then(response => {
    context.commit('COUNT_DEPARTMENTS_UPDATED', response);
  }).catch(err => {

  })
};



export default {
  authenticate,
  getClusters,
  getCustomers,
  getStatus,
  setPlusButton,
  setNewCustomer,
  getCountHouses,
  getCountDepartments,
};
