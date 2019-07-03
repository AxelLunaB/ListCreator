const currentUser = (state) => state.user;
const isAdmin = (state) => state.user.type === 'A' || false;
const users = (state) => state.users;

export default {
  currentUser,
  isAdmin,
  users
}
