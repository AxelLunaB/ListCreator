const DEPARTMENTS_UPDATED = (state, departments) => {
  state.departments = departments;
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

  if(payload != state.filterValue) {
    state.filterValue = payload;
  } else {
    state.filterValue = 'id'
  }

};

const REMOVE_FILTER = (state, payload) => {

  state.specialFilter.forEach (filter => {
    if(filter.value != null) {
      filter.value = null
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

const DEPARTMENT_UPDATED = (state, department) => {
  // console.log('updating register...', JSON.stringify(house));
  var filteredDepartment = state.departments.filter(h => h.id == department.id);
  // console.log(filteredHouse.length);
  if (filteredDepartment.length > 0) {
    for (let i = 0; i < state.departments.length; i++) {
      let h = state.departments[i];
      if (h.id == department.id) {
        for (var key in department) {
          h[key] = department[key];
        }
      }
    }
  }
};


const QUERY_UPDATED = (state, query) => {
  state.query = query;
}
export default {
  DEPARTMENTS_UPDATED,
  PAGINATION_UPDATED,
  GO_NEXT_PAGE,
  GO_PREV_PAGE,
  DEPARTMENT_UPDATED,
  QUERY_UPDATED,
  SET_VIEW_TYPE,
  SET_FILTER,
  SPECIAL_FILTER,
  REMOVE_FILTER
};
