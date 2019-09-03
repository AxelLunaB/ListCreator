const contracts = (state) => state.contracts;
const query = (state) => state.query;
const isListGetter = (state) => state.isList;
const filterValue = (state) => state.filterValue;
const specialSort = (state) => state.specialFilter;
const contractsByPaidRef = (state) => state.contractsByPaidRef;

export default {
  contracts,
  contractsByPaidRef,
  query,
  isListGetter,
  filterValue,
  specialSort
}
