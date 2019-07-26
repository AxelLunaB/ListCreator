<template>
  <div id="app-history-reports">
    <div class="history-titles">
      <h2>History reports</h2>
      <p>Filter by date</p>

      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
              <label>From</label>
              <input class="form-control" type="date" v-model="initDate" @change="filterByDate">
          </div>
          <div class="col-sm-12 col-md-6">
              <label>From</label>
              <input class="form-control" type="date" v-model="endDate" @change="filterByDate">
          </div>
        </div>
      </div>
    </div>
    <div class="history-body">
      <table class="table table-hover" style="margin-bottom:0;">
          <thead>
          <tr>
            <td v-for="(t,index) in header" :key="index" style="border-bottom:none;" :class="responsiveTable(index)">
              {{ t.title }}
            </td>
          </tr>
        </thead>
      </table>
      <table class="table table-hover">
          <thead class="table-body">
          <tr v-for="(item,index) in filterByDate" :key="index">
            <td class="responsive0"> {{ item.customer.name }} </td>
            <td> {{ toDate(item.reference.reserveDate) }} </td>
            <!-- <td> {{ item.cluster.abb }} </td>
            <td class="responsive0"> $ {{ toPrice(item.priceTotal) }} </td> -->
            <td> <i @click="print(item)" class="fas fa-file-pdf fa-lg"></i></td>

          </tr>
        </thead>
      </table>
    </div>
    <nav class="pagination" role="navigation" aria-label="Page navigation" v-if="index != 0">
      <button class="btn btn-outline-light pagination-previous" v-on:click="prevPage">Previous</button>
      <ul class="pagination-list pagination-wrapper">
        <li v-for="n in pagesDisplay" :key="n" v-on:click="goToPage(n)" class="page-item">
          <a :class="pageClass(n)" aria-label="Goto page 1" class="page-link btn btn-outline-light">{{n+1}}</a>
        </li>
      </ul>
      <button class="btn btn-outline-light pagination-next" v-on:click="nextPage">Next</button>
    </nav>
    <!--Print section-->
    <div class="willPrint d-none" id="willPrint">

    </div>
    <!-- End of print section -->
  </div>
</template>

<script>
import $ from "jquery";
import { mapGetters } from "vuex";
import { Printd} from 'printd';
import io from "socket.io-client";
import departmentHistoric from "./components/departmentHistoric.vue";
import cookie from "../utils/cookie";

const DEPARTMENT = 0;
const LOTS = 1;
const LOT_DETAIL = 2;
const DEPARTMENT_DETAIL = 3;


var socket = io();

export default {
  mounted: function () {
    const _ = this;
    this.$eventHub.$on("add-department-historic-detail", department => {
      this.selectedDepartment = department;
      this.view = DEPARTMENT_DETAIL;
      this.retrieveData();
    });
    socket.emit(
      "authenticate", {
        strategy: "jwt",
        accessToken: cookie()
      },
      function (message, data) {
        _.retrieveData();
      }
    );
    var isAuthenticated = this.$store.state.others.isAuthenticated;
    if (isAuthenticated) {
      // Dispatch actions &&  subscribe to rt events.
      this.$store.dispatch("users/getUsers");
      this.$store.dispatch("users/listenEvents");
      this.$store.dispatch("contracts/getContracts");


      // listen to authenticated event
    } else {
      let _ = this;
      this.$eventHub.$on("authenticated", function () {
        _.$store.dispatch("users/getUsers");
        _.$store.dispatch("users/listenEvents");
        _.$store.dispatch("contracts/getContracts");


      });
    }
  },
  components: {
    departmentHistoric
  },
  data() {
    return {
      header:[
        {title:'CLIENT'},
        {title: 'DATE'},
        {title:'INFO'}
        //,
        // {title:'#'},
        // {title:'TOWER'},
        // {title:'PRICE'},
        // {title:'INFO'}
      ],
      index:0,
      initDate: null,
      endDate:null,
      selectedDepartment:{}
    }
  },
  methods:{
    toPrice(x) {
      var r = x.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      return r;
    },
    toDate(date){
      var year = date.substring(0,4)
      var month = date.substring(5,7)
      var day = date.substring(8,10)
      return day +'/'+ month + '/'+ year
    },
    responsiveTable(n){

        return 'responsive' + n

      },
      // print(item){ //this is the function that handles the printd plugin
      // const cssText =`` //here's where the css template of whatever we want to print will be
      // const d = newPrintd();
      // d.print(document.getEelementById('willPrint'),[cssText])
      // },
    goToPage(page) {
      this.index = page;
      this.retrieveData();
      },
    prevPage() {
      if (this.index > 0) this.index = this.index - 1;
      this.retrieveData();
    },
    nextPage() {
      if (this.index < Math.floor(this.pages)) this.index = this.index + 1;
      this.retrieveData();
    },
    goToPage(page) {
      this.index = page;
      this.retrieveData();
    },
    pageClass(n) {
      var cssClass = "pagination-link ";

      cssClass += n === this.index ? "is-current" : "";
      // console.log(n,cssClass);

      return cssClass;
      },
    retrieveDepartmentHistorics(query) {
      const _ = this;
      var q = {
        $skip: _.index * _.limit
      };
      if (query != null || query != undefined) {
        for (var k in query) {
          q[k] = query[k];
        }
      }
      socket.emit("api/departments-historics::find", q, (error, department) => {
        _.total = department.total;
        _.limit = department.limit;
        _.pages = department.total / department.limit;
        _.departments = [];
        department.data.forEach(element => {
          _.departments.push(element);
        });
        _.dateArray = _.departments;
        });
      },
      retrieveData(){
        if (this.view === DEPARTMENT) {
          this.retrieveDepartmentHistorics();
          } else if (this.view === DEPARTMENT_DETAIL){
            this.retrieveDepartmentHistorics({
              departmentid: this.selectedDepartment.departmentid
              });
            }
          }
        },
    computed:{
      ...mapGetters({
        // users: "users/users"
        contracts: "contracts/contracts"
      }),
    filterByDate(){
      var init = this.initDate
      var end = this.endDate
      var datesArray = []
      if(this.initDate != null && this.endDate != null) {
        console.log('fetching dates between ' + this.initDate + ' and ' + this.endDate)
        for(var i = 0 ; i < this.contracts.length ; i++ ) {
            if(this.contracts[i].reference != undefined){
              var current = this.contracts[i].reference.reserveDate
              if(current > init && current < end) {
                datesArray.push(this.contracts[i])
                }
              }
            }
          }
      console.log(datesArray)
      datesArray.sort()
      return datesArray
      },
      pagesDisplay() {
        if (Math.ceil(this.pages) > 10) {
          var array = [0, 1];
          var start = this.index > 3 ? this.index : 4;
          for (var i = 0, j = start - 2; i < 5; i++) {
            var k = j + i;
            if (k <= Math.ceil(this.pages) - 3) {
              array.push(k);
            }
          }
          array.push(Math.ceil(this.pages) - 2);
          array.push(Math.ceil(this.pages) - 1);
          return array;
        } else {
          var array = [];
          for (i = 0; i < Math.ceil(this.pages); i++) {
            array.push(i);
          }
          return array;
        }
      }
    }
  }

</script>


<style lang="scss">

  @import 'node_modules/bootstrap/scss/bootstrap';
  @import 'node_modules/bootstrap-vue/src/index.scss';

  html,
  body{
    height:100%;
    width:100%;
    background: #2a333c;
  }

  #app-history-reports {
  height: 100%;
  width: 100%;
  background: #2a333c;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  color:white;

  [type="date"] {
    background: #fff url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png) 97% 50% no-repeat;
  }

  [type="date"]::-webkit-inner-spin-button {
    display: none;
  }

  [type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
  }

  .history-titles {
    background: #3c4857;
    padding: 20px;
    border-radius: 10px;
    width:80vw;
    max-width: 1000px;
    margin:100px auto 0 auto;
  }

    .history-body {
    background: #3c4857;
    padding: 20px;
    border-radius: 10px;
    width:80vw;
    margin-top:50px;
    max-width: 1000px;
    margin:50px auto 50px auto;
  }

  .history-titles h2,
  .history-titles p {
    text-align: center;
  }

  .history-body .table thead td {
    color:white;
    border-bottom:1px solid #a8a8a896;
    border-top:1px solid #a8a8a896;
    text-align: center;
    font-weight: bold;
  }

  .history-body .table thead.table-body td {
    font-weight: 100;
  }

  .table-hover {
    table-layout: fixed;
  }

  .pagination-wrapper {
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-bottom:0;
    padding-left:0;
    list-style: none;
  }

  .pagination {
    width:80vw;
    margin-top:50px;
    max-width: 1000px;
  }

  .page-link {
    background: none;
  }

    @media (max-width: 769px) {
      .responsive0 {
        display: none;
        }
    }
  }
</style>
