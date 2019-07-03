import { createHouse, fetchHouses, patchHouse } from '@/api';
import socket from '@/io';

const getHouses = (context) => {
  // console.log('fetching houses...');
  fetchHouses(context.state.pagination.skip, context.state.query).then(response => {
    //call context.commit
    context.commit('HOUSES_UPDATED', response.data);
    let pagination = {
      total: response.total,
      limit: response.limit,
      skip: response.skip,
      pages: response.total / response.limit,
      index: Math.floor(response.skip / response.limit),
    };
    context.commit('PAGINATION_UPDATED', pagination);
    // console.log(response);
  }).catch(error => {
    console.log(error);
  });
};
const updateHouse = (context, house) => {
  return new Promise((resolve, reject) => {
    patchHouse(house).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  })

};
const newHouse = (context, house) => {
  return new Promise((resolve, reject) => {
    createHouse(house).then(response => {
      // context should be called to commit some mutation in order to send popups or something.
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  })
};
const nextPage = (context) => {

  const { index, pages } = context.state.pagination;
  if (index < pages - 1) {
    //add one to the index.
    context.commit('GO_NEXT_PAGE');
    //when this happens, you should retrieve the new page.
    getHouses(context);
  }

};
const prevPage = (context) => {
  const { index, pages } = context.state.pagination;
  if (index > 0) {
    //add one to the index.
    context.commit('GO_PREV_PAGE');
    //when this happens, you should retrieve the new page.
    getHouses(context);
  }
};
const goSearch = (context, query) => {
  context.commit('QUERY_UPDATED', query);
  getHouses(context);
}


const listenEvents = ({ dispatch, commit }) => {
  // console.log('listen...');
  socket.on('api/houses patched', function (message) {
    commit('HOUSE_UPDATED', message);
  });
  socket.on('api/houses updated', function (message) {
    commit('HOUSE_UPDATED', message);
  });

  socket.on('api/houses created', function (message) {
    dispatch('getHouses');
  });

}
export default {
  getHouses,
  listenEvents,
  newHouse,
  nextPage,
  prevPage,
  updateHouse,
  goSearch,
}
