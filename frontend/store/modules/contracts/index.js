import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  contracts: [],
  pagination: {
    total: 0,
    limit: 0,
    skip: 0,
    pages: 0,
    index: 0,
  },
  specialFilter: [
    {
      id: 'statusId',
      value: null
    },
    {
      id: 'type',
      value: null
    },
    {
      id: 'level',
      value: null
    }
  ],
  query: null,
  isList: false,
  filterValue: "cons",
  selectedDep:[]
};


export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
