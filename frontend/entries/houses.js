import houses from '../views/houses.vue';
import { store } from '../utils/store.js';
import Vue from 'vue';

Vue.prototype.$eventHub = new Vue(); //Global event bus
// eslint-disable-next-line no-new

new Vue({
  el: '#app',
  store,
  render: h => h(houses)
});

