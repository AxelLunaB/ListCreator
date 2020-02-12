import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  allUnits:[],
  units: [],
  unitsByStage:[],
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
    antMonth: 0, //iterate array departments w/ status.updatedAt in certain range, return its length
    penMonth: 0,
    pastMonth:0,
    cMonth:0
  },
  specialFilter: [
    {
      id: 'houseModel',
      value: null
    },
    {
      id: 'status',
      value: null
    },
    {
      id: 'block',
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
