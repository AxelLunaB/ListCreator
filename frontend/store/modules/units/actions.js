import {
  getUnits,
  patchUnit,
  fetchUnitsByCluster,
  getUnitsByStage,
  updateUnitStatus,
  updateUnitCustomer,
  updateUnitExecutive,
  fetchUpdatedUnit,
  removeExecutiveFromUnit,
  removeCustomerFromUnit
} from '@/api';
import socket from '@/io';

const updateStatus = (context, newStatus) => {
  return new Promise((resolve, reject) =>{
    updateUnitStatus(newStatus)
    .then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
};

const getUnitUpdatedById = (context,info) => {
  return new Promise((resolve, reject) =>{
    updateUnitExecutive(info)
    .then(res => {
      resolve(res);
    }).catch(err => {
      console.log(err);
    });
  });
};

const deleteExecutiveFromUnit = (context, newStatus) => {
  return new Promise((resolve, reject) =>{
    removeExecutiveFromUnit(newStatus)
    .then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
};


const deleteCustomerFromUnit = (context, newStatus) => {

  return new Promise((resolve, reject) =>{
    removeCustomerFromUnit(newStatus)
    .then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
};

const updateExecutive = (context, newStatus) => {
  return new Promise((resolve, reject) =>{
    updateUnitExecutive(newStatus)
    .then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
};

const updateCustomer = (context, newStatus) => {
  return new Promise((resolve, reject) =>{
    updateUnitCustomer(newStatus)
    .then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
};

const getUnitById = (context,info) => {
  fetchUnitsByCluster(context.state.pagination.skip, info)
  .then(res => {

    // context.commit('DEPARTMENTS_UPDATED', res.data);
    console.log("-------------- actions");
    console.log(info);
    console.log(res);
    if(info.type == 'SA' || info.type == 'E' || info.type == 'A' || info.type == 'D'){
      context.commit('UNITS_UPDATED', res.data);
    } else {
      context.commit('UNITS_UPDATED', res.data);
    }

    //console.log(response);

    let pagination = {
      total: res.total,
      limit: res.limit,
      skip: res.skip,
      pages: res.total / res.limit,
      index: Math.floor(res.skip / res.limit),
    };
    context.commit('PAGINATION_UPDATED', pagination);
  });
};

const fetchUnits = (context) => {
  getUnits(context.state.pagination.skip, context.state.query).then(response => {
    context.commit('UNITS_UPDATED', response.data);

    let pagination = {
      total: response.total,
      limit: response.limit,
      skip: response.skip,
      pages: response.total / response.limit,
      index: Math.floor(response.skip / response.limit),
    };
    context.commit('PAGINATION_UPDATED', pagination);
  }).catch(error => {
    console.log(error);
  });
};

const updateUnit = (context, department) => {
  return new Promise((resolve, reject) => {
    updateUnitCustomer(department).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });
};

const fetchUnitsByStage = (context, stage) => {
  return new Promise((resolve, reject) => {
    getUnitsByStage(stage).then(res => {
      context.commit('UNITS_BY_STAGE', res);
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
};

const nextPage = (context) => {

  const { index, pages } = context.state.pagination;
  if (index < pages - 1) {
    //add one to the index.
    context.commit('GO_NEXT_PAGE');
    //when this happens, you should retrieve the new page.
    getDepartments(context);
  }

};
const prevPage = (context) => {
  const { index, pages } = context.state.pagination;
  if (index > 0) {
    //add one to the index.
    context.commit('GO_PREV_PAGE');
    //when this happens, you should retrieve the new page.
    getDepartments(context);
  }
};
const goSearch = (context, query) => {
  context.commit('QUERY_UPDATED', query);
  getDepartments(context);
}

const setFilter = (context, payload) => {

  context.commit('SET_FILTER', payload);

};

const setSpecialFilter = (context, payload) => {

  context.commit('SPECIAL_FILTER', payload);

};

const setPriceFilter = (context, payload) => {

  context.commit('PRICE_FILTER', payload);

};

const removeSpecialFilter = (context, payload) => {

  context.commit('REMOVE_FILTER', payload);

};

const listenEvents = ({ dispatch, commit }) => {
  console.log('listen...');
  socket.on('api/units patched', function (message) {
    commit('UNIT_UPDATED', message);
  });
  socket.on('api/units updated', function (message) {
    commit('UNIT_UPDATED', message);
  });

  socket.on('api/units created', function (message) {
    dispatch('fetchUnits');
  });

}

const setListType = ( context, commit ) => {
  context.commit('SET_VIEW_TYPE');
}

const setCurrentAvailability = (context, payload) =>{
  context.commit('UPDATE_AVAILABILITY', payload)
}



export default {
  fetchUnits,
  setCurrentAvailability,
  listenEvents,
  nextPage,
  prevPage,
  updateUnit,
  goSearch,
  setListType,
  setFilter,
  setSpecialFilter,
  removeSpecialFilter,
  setPriceFilter,
  updateStatus,
  fetchUnitsByStage,
  getUnitById,
  updateExecutive,
  updateCustomer,
  getUnitUpdatedById,
  deleteExecutiveFromUnit,
  deleteCustomerFromUnit
}
