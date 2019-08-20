import Vue from 'vue';
import Vuex from 'vuex';
import housesModule from './modules/houses';
import departmentsModule from './modules/departments';
import contractsModule from './modules/contracts';
import commissionsModule from './modules/commissions';
import lotsModule from './modules/lots';
import othersModule from './modules/others';
import usersModule from './modules/users';
import countByClusterModule from './modules/count-by-cluster';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    houses: housesModule,
    departments: departmentsModule,
    commissions: commissionsModule,
    contracts: contractsModule,
    others: othersModule,
    lots: lotsModule,
    users: usersModule,
    countByCluster: countByClusterModule
  }
});
