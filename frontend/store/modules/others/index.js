/* eslint-disable */
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  isAuthenticated: false,
  hasPlusButton: false,
  status:[],
  clusters: [],
  countUnits: [],
  customers: [],
  units:[],
  unitsByStage:[],
  unitsInfo:[]
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
