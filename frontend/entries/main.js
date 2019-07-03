import Vue from 'vue';
import App from '@/views/App.vue';
import router from '@/router';
// import { store } from '@/utils/store';
import store from '../store';


// test
Vue.prototype.$eventHub = new Vue();

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
