import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  lots: [],
  pagination: {
    total: 0,
    limit: 0,
    skip: 0,
    pages: 0,
    index: 0,
  },
  query: null,
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
