import { fetchCommissions } from '@/api';
import socket from '@/io';


const getCommissions = (context) => {
  // console.log('fetching houses...');
  fetchCommissions(context.state.pagination.skip, context.state.query).then(response => {
    //call context.commit
    context.commit('COMMISSIONS_UPDATED', response.data);

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
// const updateDepartment = (context, department) => {
//   return new Promise((resolve, reject) => {
//     patchDepartments(department).then(response => {
//       resolve(response);
//     }).catch(err => {
//       reject(err);
//     });
//   })
//
// };
// const newDepartment = (context, department) => {
//   return new Promise((resolve, reject) => {
//     createDepartments(department).then(response => {
//       // context should be called to commit some mutation in order to send popups or something.
//       resolve(response);
//     }).catch(err => {
//       reject(err);
//     });
//   })
// };
const nextPage = (context) => {

  const { index, pages } = context.state.pagination;
  if (index < pages - 1) {
    //add one to the index.
    context.commit('GO_NEXT_PAGE');
    //when this happens, you should retrieve the new page.
    getCommissions(context);
  }

};
const prevPage = (context) => {
  const { index, pages } = context.state.pagination;
  if (index > 0) {
    //add one to the index.
    context.commit('GO_PREV_PAGE');
    //when this happens, you should retrieve the new page.
    getCommissions(context);
  }
};
const goSearch = (context, query) => {
  context.commit('QUERY_UPDATED', query);
  getCommissions(context);
}

const setFilter = (context, payload) => {

  context.commit('SET_FILTER', payload);

};

const setSpecialFilter = (context, payload) => {

  context.commit('SPECIAL_FILTER', payload);

};

const removeSpecialFilter = (context, payload) => {

  context.commit('REMOVE_FILTER', payload);

};

const listenEvents = ({ dispatch, commit }) => {
  //console.log('listen...');
  // socket.on('api/departments patched', function (message) {
  //   commit('DEPARTMENT_UPDATED', message);
  // });
  // socket.on('api/departments updated', function (message) {
  //   commit('DEPARTMENTS_UPDATED', message);
  // });
  //
  // socket.on('api/departments created', function (message) {
  //   dispatch('getDepartments');
  // });

}

const setListType = ( context, commit ) => {
  context.commit('SET_VIEW_TYPE');
}




export default {
  getCommissions,
  listenEvents,
  // newDepartment,
  nextPage,
  prevPage,
  // updateDepartment,
  goSearch,
  setListType,
  setFilter,
  setSpecialFilter,
  removeSpecialFilter
}
