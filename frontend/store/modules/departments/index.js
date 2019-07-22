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
  specialFilter: [
    {
      id: 'statusId',
      value: null
    },
    {
      id: 'priceTotal',
      value: null
    },
    {
      id: 'level',
      value: null
    }
  ],
  priceFilter: {
    priceOne: 200000,
    priceTwo: 250000,
    priceThree: 300000,
    priceFour: 350000,
    priceFive: 400000
  },
  priceDep: 0,
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
