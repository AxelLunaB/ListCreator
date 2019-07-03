const departments = (state) => state.departments;
const query = (state) => state.query;
const isListGetter = (state) => state.isList;
const filterValue = (state) => state.filterValue;
const specialSort = (state) => state.specialFilter;

export default {
  departments,
  query,
  isListGetter,
  filterValue,
  specialSort
}
