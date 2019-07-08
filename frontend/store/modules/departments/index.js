import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  departments: [],
  pagination: {
    total: 0,
    limit: 0,
    skip: 0,
    pages: 0,
    index: 0,
  },
  specialFilter: [
    {
      id: 'level',
      value: null
    },
    {
      id: 'priceTotal',
      value: null
    },
    {
      id: 'status',
      value: null
    }
  ],
  query: null,
  isList: false,
  filterValue: "cons"
};


export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
