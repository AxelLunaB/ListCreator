import { store } from '../utils/store.js';
import users from '../views/users.vue'
import Vue from 'vue';

Vue.prototype.$eventHub = new Vue(); //Global event bus
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  render: h => h(users)
});
