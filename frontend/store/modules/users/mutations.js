const CURRENT_USER_UPDATED = (state, user) => {
  state.user = user;
};
const USERS_UPDATED = (state, users) => {
  state.users = users;
};
const PAGINATION_UPDATED = (state, pagination) => {
  state.pagination = pagination;
};

const USER_UPDATED = (state, user) => {
  for (let i = 0; i < state.users.length; i++) {
    let usr = state.users[i];
    if (usr.id === user.id) {
      for (var key in user) {
        usr[key] = user[key];
      }
    }
  }
};
export default {
  CURRENT_USER_UPDATED,
  PAGINATION_UPDATED,
  USER_UPDATED,
  USERS_UPDATED,
}
