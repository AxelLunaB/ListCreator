import Vue from 'vue';
import lots from '../views/lots.vue';

import { store } from '../utils/store.js';

Vue.prototype.$eventHub = new Vue(); //Global event bus

// eslint-disable-next-line no-new

new Vue({
  el: '#app',
  store,
  render: h => h(lots)
});

