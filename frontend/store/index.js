import Vue from 'vue';
import Vuex from 'vuex';
import attachmentsModule from './modules/attachments';
import unitsModule from './modules/units';
import othersModule from './modules/others';
import usersModule from './modules/users';
import countByClusterModule from './modules/count-by-cluster';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    attachments: attachmentsModule,
    units: unitsModule,
    others: othersModule,
    users: usersModule,
    countByCluster: countByClusterModule
  }
});
