import Vue from 'vue';
import Router from 'vue-router';
import lists from '@/views/lists.vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "chart.js";
import "hchs-vue-charts";
import Print from "vue-print-nb";
import XSLX from 'xlsx';
import DatePicker from 'vue-bootstrap-datetimepicker';
import touchspin from 'bootstrap-touchspin';
import vuelidateLib from 'vuelidate';

Vue.use(vuelidateLib);

Vue.use(DatePicker);

Vue.use(window.VueCharts);

Vue.use(BootstrapVue)

Vue.use(Router);

Vue.use(Print);

Vue.use(XSLX);

Vue.use(touchspin);


// Vue.use(filesaver);

export default new Router({
  mode: 'history',
    routes:  [
      {
            path: '/',
            name: 'View Lists',
            component: lists
        },

    ]
})
