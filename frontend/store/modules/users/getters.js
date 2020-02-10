const currentUser = (state) => state.user;
const isAdmin = (state) => state.user.type === 'A' || false;
const users = (state) => state.users;
const executives = state => state.executives;

export default {
  currentUser,
  isAdmin,
  executives,
  users
}
