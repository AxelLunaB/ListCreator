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
  currentAvailability: {
    available:0,
    reserved: 0,
    sold: 0
  },
  monthlySales:{
    antMonth: 10,
    penMonth: 8,
    pastMonth:6,
    currentMonth:4
  },
  specialFilter: [
    {
      id: 'statusId',
      value: null
    },
    {
      id: 'level',
      value: null
    },
    {
      id: 'price',
      value: null
    }
  ],
  priceRange:0,
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
