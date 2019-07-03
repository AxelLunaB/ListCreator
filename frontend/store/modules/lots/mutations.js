const LOTS_UPDATED = (state, lots) => {
  state.lots = lots;
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
const LOT_UPDATED = (state, lot) => {
  var filteredLot = state.lots.filter(h => h.id == lot.id);
  if (filteredLot.length > 0) {
    for (let i = 0; i < state.lots.length; i++) {
      let h = state.lots[i];
      if (h.id == lot.id) {
        for (var key in lot) {
          h[key] = lot[key];
        }
      }
    }
  }
};
const QUERY_UPDATED = (state, query) => {
  state.query = query;
}

export default {
  GO_NEXT_PAGE,
  GO_PREV_PAGE,
  LOT_UPDATED,
  LOTS_UPDATED,
  PAGINATION_UPDATED,
  QUERY_UPDATED,
};
