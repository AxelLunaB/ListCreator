import Vue from 'vue';
import Router from 'vue-router';
import lots from '@/views/lots.vue';
import dashboard from '@/views/dashboard.vue';
import historics from '@/views/historics.vue';
import houses from '@/views/houses.vue';
import users from '@/views/users.vue';
import departments from '@/views/departments.vue';
import history_reports from '@/views/history-reports.vue';
import BootstrapVue from 'bootstrap-vue';
// import dashboardView from '@/views/dashboardView.vue';
import detail from '@/views/detail.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import towerdetail from '@/views/components/towerdetail.vue';
import VueTransmit from "vue-transmit";
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

Vue.use(VueTransmit);

Vue.use(Router);

Vue.use(Print);

Vue.use(XSLX);

Vue.use(touchspin);


// Vue.use(filesaver);

export default new Router({
  mode: 'history',
    routes:  [
      //{
            // path: '/',
            // name: 'Vista de dashboard',
            // component: dashboardView
        //},
        {
          path:'/',
          name:'Listado de desarrollo',
          component: detail
        },
        {
            path: '/lots',
            name: 'Lotes',
            component: lots
        },
        {
            path: '/houses',
            name: 'Casas',
            component: houses
        },
        {
            path: '/historics',
            name: 'Historial de cambios',
            component: historics
        },
        {
            path: '/admin/users',
            name: 'Usuarios',
            component: users
        },
        {
            path: '/history_reports',
            name: 'History_Reports',
            component: history_reports
        },
        {
          path:'/towerdetail',
          name:"Detalle de torre",
          component: towerdetail
        }
    ]
})
