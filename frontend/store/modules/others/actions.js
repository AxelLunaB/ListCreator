import { authenticateSocket, fetchStatus, fetchClusters, fetchCountHouses,fetchCountDepartments } from '@/api';

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
  getStatus,
  setPlusButton,
  getCountHouses,
  getCountDepartments,
};
