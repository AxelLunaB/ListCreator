const hasPlusButton = (state) => state.hasPlusButton;
const status = (state) => state.status;
const clusters = (state) => state.clusters;
const countHouses = (state) => state.countHouses;
const countLots = (state) => state.countLots;
const countDepartments = (state) => state.countDepartments;
const customers= (state) => state.customers;
const getReferences= (state) => state.references;

export default {
  clusters,
  hasPlusButton,
  status,
  countHouses,
  countLots,
  countDepartments,
  customers,
  getReferences
};
