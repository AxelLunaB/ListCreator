/* eslint-disable */
const IS_AUTHENTICATED = (state, isAuthenticated) => {
  state.isAuthenticated = isAuthenticated;
};

const ADD_BUTTON = (state, addButton) => {
  state.hasPlusButton = addButton;
};
const STATUS_UPDATED = (state, status) => {
  state.status = status;
};

const CLUSTERS_UPDATED = (state, clusters) => {
  state.clusters = clusters;
};

const COUNT_UNITS_UPDATED = (state, count) => {
  state.countUnits = count;
}
const CUSTOMERS_UPDATED = (state, customers) => {
  state.customers = customers;
}

const UNITS = (state, units) => {
  state.units = units;
}

const UNITS_BY_STAGE = (state, stage) => {
  state.unitsByStage = stage;
}

const STAGES_INFO = (state, stage) => {
  state.unitsInfo = stage;
}

export default {
  ADD_BUTTON,
  CLUSTERS_UPDATED,
  IS_AUTHENTICATED,
  STATUS_UPDATED,
  COUNT_UNITS_UPDATED,
  CUSTOMERS_UPDATED,
  UNITS,
  UNITS_BY_STAGE,
  STAGES_INFO
};
