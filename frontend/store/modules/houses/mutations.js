const HOUSES_UPDATED = (state, houses) => {
  state.houses = houses;
};

const PAGINATION_UPDATED = (state, pagination) => {
  state.pagination = pagination;
};
const GO_NEXT_PAGE = (state) => {
  var pagination = state.pagination;
  pagination.index++;
  pagination.skip = pagination.index * pagination.limit;
  state.pagination = pagination;
}
const GO_PREV_PAGE = (state) => {
  var pagination = state.pagination;
  pagination.index--;
  pagination.skip = pagination.index * pagination.limit;
  state.pagination = pagination;
};

const HOUSE_UPDATED = (state, house) => {
  // console.log('updating register...', JSON.stringify(house));
  var filteredHouse = state.houses.filter(h => h.id == house.id);
  // console.log(filteredHouse.length);
  if (filteredHouse.length > 0) {
    for (let i = 0; i < state.houses.length; i++) {
      let h = state.houses[i];
      if (h.id == house.id) {
        for (var key in house) {
          h[key] = house[key];
        }
      }
    }
  }
};
const QUERY_UPDATED = (state, query) => {
  state.query = query;
}
export default {
  HOUSES_UPDATED,
  PAGINATION_UPDATED,
  GO_NEXT_PAGE,
  GO_PREV_PAGE,
  HOUSE_UPDATED,
  QUERY_UPDATED
};
