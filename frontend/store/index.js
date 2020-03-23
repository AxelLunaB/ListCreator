import Vue from 'vue';
import Vuex from 'vuex';
import othersModule from './modules/others';
import usersModule from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    others: othersModule,
    users: usersModule,
  }
});
