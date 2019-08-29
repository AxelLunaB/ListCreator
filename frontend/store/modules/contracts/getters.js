const contracts = (state) => state.contracts;
const query = (state) => state.query;
const isListGetter = (state) => state.isList;
const filterValue = (state) => state.filterValue;
const specialSort = (state) => state.specialFilter;
const setNewContract = (state) => state.selectedDep;

export default {
  contracts,
  query,
  isListGetter,
  filterValue,
  specialSort,
  setNewContract
}
