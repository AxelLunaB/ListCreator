import { createLot, fetchLots, patchLot } from '@/api';
import socket from '@/io';

const getLots = (context) => {
  fetchLots(context.state.pagination.skip, context.state.query).then(response => {
    context.commit('LOTS_UPDATED', response.data);
    let pagination = {
      total: response.total,
      limit: response.limit,
      skip: response.skip,
      pages: response.total / response.limit,
      index: Math.floor(response.skip / response.limit),
    };
    context.commit('PAGINATION_UPDATED', pagination);

  }).catch(err => {
    console.log(err);
  });
};
const updateLot = (context, lot) => {
  return new Promise((resolve, reject) => {
    patchLot(lot).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  })
};
const newHouse = (context, lot) => {
  return new Promise((resolve, reject) => {
    createLot(lot).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  })
};
const listenEvents = ({ dispatch, commit }) => {
  // console.log('listen...');
  socket.on('api/lots patched', function (message) {
    commit('LOT_UPDATED', message);
  });
  socket.on('api/lots updated', function (message) {
    commit('LOT_UPDATED', message);
  });
  socket.on('api/lots created', function (message) {
    dispatch('getLots');
  });

};
const nextPage = (context) => {

  const { index, pages } = context.state.pagination;
  if (index < pages - 1) {
    //add one to the index.
    context.commit('GO_NEXT_PAGE');
    //when this happens, you should retrieve the new page.
    context.dispatch('getLots');
  }

};
const prevPage = (context) => {
  const { index, pages } = context.state.pagination;
  if (index > 0) {
    //add one to the index.
    context.commit('GO_PREV_PAGE');
    //when this happens, you should retrieve the new page.
    context.dispatch('getLots');
  }
};
const goSearch = (context, query) => {
  context.commit('QUERY_UPDATED', query);
  getLots(context);
}


export default {
  getLots,
  newHouse,
  updateLot,
  listenEvents,
  nextPage,
  prevPage,
  goSearch,
}
