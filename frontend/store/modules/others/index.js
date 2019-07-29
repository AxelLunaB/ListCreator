import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  isAuthenticated: false,
  hasPlusButton: false,
  status:[],
  clusters: [],
  countHouses: [],
  countLots: [],
  customers: []
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
