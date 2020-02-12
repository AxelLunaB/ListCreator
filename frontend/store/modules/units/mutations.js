const UNITS_BY_CLUSTER = (state, payload) => {
  state.unitsByCluster = payload;
}

const UNITS_UPDATED = (state, payload) => {

  state.units = payload;
};

const PAGINATION_UPDATED = (state, pagination) => {
  state.pagination = pagination;
};
const GO_NEXT_PAGE = (state) => {
  var pagination = state.pagination;
  pagination.index++;
  pagination.skip = pagination.index * pagination.limit;
  state.pagination = pagination;
};
const GO_PREV_PAGE = (state) => {
  var pagination = state.pagination;
  pagination.index--;
  pagination.skip = pagination.index * pagination.limit;
  state.pagination = pagination;
};

const SET_VIEW_TYPE = (state) => {
   state.isList = !state.isList;
};

const SET_FILTER = (state, payload) => {
  console.log(payload);
  if(payload != state.filterValue) {
    state.filterValue = payload;
  } else {
    state.filterValue = 'id'
  }

};

const UNITS_BY_STAGE = (state, cluster) => {
  state.unitsByStage = cluster.data;
}

const PRICE_FILTER = (state,payload)=> {
  state.specialFilter[2].value = payload.value
}

const REMOVE_FILTER = (state, payload) => {

  state.specialFilter.forEach (filter => {
    if(filter.value != null) {
      filter.value = null
    }

    if(state.priceRange != 0) {
      state.priceRange = 0
    }
  })

};

const SPECIAL_FILTER = (state, payload) => {
  state.specialFilter.forEach (filter => {
    if (payload.id === filter.id) {
      if (payload.value !== filter.value) {
        filter.value = payload.value
      } else {
        filter.value = null
      }
    }
  })
};

const UNIT_UPDATED = (state, unit) => {
  var filteredUnits = state.units.filter(h => h.id == unit.id);
  if (filteredUnits.length > 0) {
    for (let i = 0; i < state.units.length; i++) {
      let h = state.units[i];
      if (h.id == unit.id) {
        for (var key in unit) {
          h[key] = unit[key];
        }
      }
    }
  }
};
const UPDATE_AVAILABILITY = (state, payload) => {
    state.currentAvailability.sold = payload.sold
    state.currentAvailability.available = payload.available
    state.currentAvailability.reserved = payload.reserved
 }


const QUERY_UPDATED = (state, query) => {
  state.query = query;
}
export default {
  UNIT_UPDATED,
  PAGINATION_UPDATED,
  GO_NEXT_PAGE,
  GO_PREV_PAGE,
  UNIT_UPDATED,
  QUERY_UPDATED,
  SET_VIEW_TYPE,
  SET_FILTER,
  SPECIAL_FILTER,
  REMOVE_FILTER,
  UPDATE_AVAILABILITY,
  PRICE_FILTER,
  UNITS_BY_STAGE,
  UNITS_BY_CLUSTER
};
