import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
    countByCluster: []
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};