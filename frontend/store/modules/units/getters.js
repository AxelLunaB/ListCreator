const units = (state) => state.units;
const query = (state) => state.query;
const isListGetter = (state) => state.isList;
const filterValue = (state) => state.filterValue;
const specialSort = (state) => state.specialFilter;
const currentAvailability = (state) => state.currentAvailability;
const priceRange = (state) => state.priceRange;
const monthlySales = (state) => state.monthlySales;
const allUnits  = (state) => state.allUnits;
const unitsByStage = (state) => state.unitsByStage;

export default {
  units,
  query,
  currentAvailability,
  isListGetter,
  filterValue,
  specialSort,
  priceRange,
  monthlySales,
  allUnits,
  unitsByStage
}
