const departments = (state) => state.departments;
const query = (state) => state.query;
const isListGetter = (state) => state.isList;
const filterValue = (state) => state.filterValue;
const specialSort = (state) => state.specialFilter;
const currentAvailability = (state) => state.currentAvailability;
const priceSort = (state) => state.depsByPrice;

export default {
  departments,
  query,
  currentAvailability,
  isListGetter,
  filterValue,
  specialSort,
  priceSort
}
