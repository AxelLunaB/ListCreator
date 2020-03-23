import lots from '../views/login.vue';
import Vue from 'vue';
import { store } from '../utils/store.js';
// eslint-disable-next-line no-new
new Vue({
    el: '#app-login-refactor',
    store,
    render: h => h(lots)
});
