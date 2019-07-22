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

const PRICE_FILTER = (state,payload)=> {
  if(payload.value <= state.priceFilter.priceOne){
    alert("less than 200,000")
  }
  if(payload.value > state.priceFilter.priceOne && payload.value <= state.priceFilter.priceTwo ){
    alert("price is between 200,001 -250,000")
  }
  if(payload.value > state.priceFilter.priceTwo && payload.value <= state.priceFilter.priceThree ){
    alert("price between 250,001 - 300,000")
  }
  if(payload.value > state.priceFilter.priceThree && payload.value <= state.priceFilter.priceFour ){
    alert("price between 300,001 - 350,000")
  }
  if(payload.value > state.priceFilter.priceFour && payload.value <= state.priceFilter.priceFive ){
    alert("price between 351,000 - 400,000")
  }
}

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
const UPDATE_AVAILABILITY = (state, payload) => {
    state.currentAvailability.sold = payload.sold
    state.currentAvailability.available = payload.available
    state.currentAvailability.reserved = payload.reserved
 }


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
  REMOVE_FILTER,
  UPDATE_AVAILABILITY,
  PRICE_FILTER
};
