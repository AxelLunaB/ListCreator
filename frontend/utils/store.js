import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    count: 0,
    user: {
      id: 0,
      name: '',
      email: '',
      type: ''
    },
    searchQuery: {},
    isSearching: false,
    hasAddButton: false,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state){
      state.count--;
    },
    setUser(state, user) {
      state.user = user;
    },
    deleteUser(state) {
      state.user = {
        id: 0,
        name: '',
        email: '',
        type: ''
      };
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    deleteSearchQuery(state) {
      state.searchQuery = {};
    },
    setSearching(state, isSearching) {
      state.isSearching = isSearching;
    },
    deleteSearching(state) {
      state.isSearching = false;
    },
    addButton(state,val){
      state.hasAddButton = val;
    },
    resetState(state) {
      state.count = 0;
      state.user ={
        id: 0,
        name: '',
        email: '',
        type: ''
      };
      state.searchQuery = {};
      state.isSearching = false;
    }

  }
});

