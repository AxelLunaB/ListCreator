const IS_AUTHENTICATED = (state, isAuthenticated) => {
    state.isAuthenticated = isAuthenticated;
};

const UPDATE_CLUSTER_COUNT = (state, payload) => {
    state.countByCluster = payload;
};
  
  
export default {
    IS_AUTHENTICATED,
    UPDATE_CLUSTER_COUNT
};
  