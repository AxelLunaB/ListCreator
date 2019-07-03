import Vue from 'vue';
import Vuex from 'vuex';
import housesModule from './modules/houses';
import departmentsModule from './modules/departments';
import lotsModule from './modules/lots';
import othersModule from './modules/others';
import usersModule from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    houses: housesModule,
    departments: departmentsModule,
    others: othersModule,
    lots: lotsModule,
    users: usersModule,
  }
});
