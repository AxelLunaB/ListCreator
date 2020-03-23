import Vue from 'vue';
import App from '@/views/App.vue';
import router from '@/router';
import store from '../store';

Vue.prototype.$eventHub = new Vue();

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
