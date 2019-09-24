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

const COUNT_HOUESES_UPDATED = (state, count) => {
  state.countHouses = count;
}
const COUNT_LOTS_UPDATED = (state, count) => {
  state.countLots = count;
}
const COUNT_DEPARTMENTS_UPDATED = (state, count) => {
  state.countDepartments = count;
}
const CUSTOMERS_UPDATED = (state, customers) => {
  state.customers = customers;
}

const REFERENCES_UPDATED = (state, references) => {
  state.references = references;
}

const ENCINOS_UNITS = (state, units) => {
  state.encinos = units;
}

const ENCINOS_UNITS_BY_STAGE = (state, stage) => {
  state.encinosByStage = stage;
}

export default {
  ADD_BUTTON,
  CLUSTERS_UPDATED,
  IS_AUTHENTICATED,
  STATUS_UPDATED,
  COUNT_HOUESES_UPDATED,
  COUNT_LOTS_UPDATED,
  COUNT_DEPARTMENTS_UPDATED,
  CUSTOMERS_UPDATED,
  REFERENCES_UPDATED,
  ENCINOS_UNITS,
  ENCINOS_UNITS_BY_STAGE
};
