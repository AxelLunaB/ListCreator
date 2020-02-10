import { currentUser, fetchUsers,fetchExecutives, createUser, patchUser, deleteUser } from '@/api';
import socket from '@/io';

const getCurrentUser = (context) => {
  currentUser().then(response => {
    context.commit('CURRENT_USER_UPDATED', response);
  }).catch(err => {
    // refetch ? throw error? show alert ?
  });
};

const getUsers = (context) => {
  fetchUsers(context.state.pagination.skip).then(response => {
    context.commit('USERS_UPDATED', response.data);
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

const getExecutives = context => {
  fetchExecutives().then(data => {
    context.commit('EXECUTIVES_UPDATED', data.data);
  }).catch(error => {
    console.log('Not logged as executive/Superadmin');
  });
};


const newUser = (context, user) => {
  return new Promise((resolve, reject) => {
    createUser(user).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  });
};
const updateUser = (context, user) => {
  return new Promise((resolve, reject) => {
    patchUser(user).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  });
};
const removeUser = (context, user) => {
  return new Promise((resolve, reject) => {
    deleteUser(user).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });
};
const listenEvents = ({ dispatch, commit }) => {
  // console.log('listen...');
  socket.on('users patched', function (message) {
    commit('USER_UPDATED', message);
  });
  socket.on('users updated', function (message) {
    commit('USER_UPDATED', message);
  });
  socket.on('users created', function (message) {
    dispatch('getUsers');
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

export default {
  getCurrentUser,
  getUsers,
  listenEvents,
  newUser,
  nextPage,
  prevPage,
  removeUser,
  updateUser,
  getExecutives
}
