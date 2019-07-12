const commissions = (state) => state.commissions;
const query = (state) => state.query;
const isListGetter = (state) => state.isList;
const filterValue = (state) => state.filterValue;
const specialSort = (state) => state.specialFilter;

export default {
  commissions,
  query,
  isListGetter,
  filterValue,
  specialSort
}
