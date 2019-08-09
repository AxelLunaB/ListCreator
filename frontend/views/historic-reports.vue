<template>
  <div id="app-historic-reports">
    <div class="historic-titles">
      <h2>Historic reports</h2>
      <p>Filter by date</p>

      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
              <label>From</label>
              <input class="form-control" type="date" v-model="initDate" @change="filterByDate()">
          </div>
          <div class="col-sm-12 col-md-6">
              <label>To</label>
              <input class="form-control" type="date" v-model="endDate" @change="filterByDate()">
          </div>
        </div>
      </div>
    </div>
    <div class="historic-body relative" v-if="watchMe">
      <table class="table" style="margin-bottom:0;">
          <thead>
          <tr>
            <td v-for="(t,index) in header" :key="index" style="border-bottom:none;" :class="responsiveTable(index)">
              {{ t.title }}
            </td>
          </tr>
        </thead>
      </table>
      <table class="table table-hover">
          <thead class="table-body" v-if="filterByDate != undefined">
          <tr v-for="(item,index) in filterByDate" :key="index" class="colors">
            <td class="responsive0" style="font-weight:bolder;">{{ item.cluster.abb != null ? item.cluster.abb : '-' }} </td>
            <td class="responsive1" style="font-weight:bolder;">{{ item.unitNumber != null ? item.unitNumber  :'-' }} </td>
            <td class="responsive2" style="font-size:14px;"> {{ item.customer.name != null ? item.customer.name  :'-' }} </td>
            <td class="responsive3"> {{ item.commission.executive.name != null ? item.commission.executive.name  :'-' }} </td>
            <td class="responsive4"> {{ item.reference.reserveDate != null ? toDate(item.reference.reserveDate) : '-' }} </td>
            <td class="responsive5"><i @click="print(item)" class="fas fa-file-pdf fa-lg hover-mouse"></i></td>
          </tr>
        </thead>
      </table>
    </div>
    <div class="historic-body" v-if="watchMe == false" style="display: flex;align-items: center;justify-content: center;">
      <p>Please choose a date range</p>
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
      <section class="hero print">
        <div class="container-header">
          <div class="container-inner-header">
            <h4>SALES REPORT</h4>
            <img src="https://i.imgur.com/jqiuuYB.png" width="200px">
          </div>
          <div class= "container-date">
            <p id="date"></p>
            <p>Tulum, Quintana Roo, México</p>
          </div>
        </div>
        <div class="container-body">
          <h4>CONTRACT INFORMATION</h4>
          <div class="flex" >
            <div>
              <h5 style="margin-bottom:0;">CUSTOMER</h5>
                <p id="customer" style="margin-top:0;"></p>
              <h6 style="margin-bottom:0;">COUNTRY</h6>
                <p id="country" style="margin-top:0;"></p>
              <h6 style="margin-bottom:0;">STATE</h6>
                <p id="state" style="margin-top:0;"></p>
              <h6 style="margin-bottom:0;">ADDRESS</h6>
                <p id="address" style="margin-top:0;"></p>
              <h6 style="margin-bottom:0;">PHONE</h6>
                <p id="customerPhone" style="margin-top:0;"></p>
              <h6 style="margin-bottom:0;">EMAIL</h6>
                <p id="customerEmail" style="margin-top:0;"></p>
            </div>
            <div>
              <h5 style="margin-bottom:0;">EXECUTIVE</h5>
              <p id="executive" style="margin-top:0;"></p>
              <h6 style="margin-bottom:0;">CONTACT INFO</h6>
              <p id="phoneExec" style="margin:0;"></p>
              <p id="emailExec" style="margin-top:0"></p>
              <h5 style="margin-bottom:0;">PAYMENT INFO</h5>
              <h6 style="margin:0;">PAYMENT METHOD</h6>
                <p id="paymentMethod" style="margin-top:0"></p>
              <h6 style="margin-bottom:0;">RESERVE DATE</h6>
                <p id="reserveDate" style="margin-top:0"></p>
              <h6 style="margin-bottom:0;">EXPIRATION DATE</h6>
                <p id="reserveExpiration" style="margin-top:0"></p>
            </div>
          </div>
        </div>
        <div class="container-body">
          <h4>DEPARTMENT INFORMATION</h4>
          <div class="flex">
            <div>
              <h5 style="margin-bottom:0;">TOWER</h5>
              <p id="clusterName" style="margin-top:0;"></p>
              <h5 style="margin-bottom:0;">UNIT No.</h5>
              <p id="unitNo" style="margin-top:0;"></p>
            </div>
            <div>
              <h5 style="margin-bottom:0;">LEVEL</h5>
              <p id="level"></p>
              <h5 style="margin-bottom:0;">STATUS</h5>
              <p id="statusName" style="margin-top:0;"></p>
            </div>
            <div>
              <h5 style="margin-bottom:0;">PRICE</h5>
              <p id="priceTotal"></p>
              <h5 style="margin-bottom:0;">CURRENCY</h5>
              <p id="currency" style="margin-top:0;"></p>
            </div>
          </div>
        </div>
        <div class="container-body" style="height:200px;">

        </div>
      </section>
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
import swal from "sweetalert";

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
      this.$store.dispatch("contracts/getContracts");


      // listen to authenticated event
    } else {
      let _ = this;
      this.$eventHub.$on("authenticated", function () {
        _.$store.dispatch("users/getUsers");
        _.$store.dispatch("users/listenEvents");
        _.$store.dispatch("contracts/getContracts");
        _.$store.dispatch("departments/getDepartments");


      });
    }
  },
  components: {
    departmentHistoric
  },
  data() {
    return {
      header:[
        {title:'TOWER'},
        {title:'UNIT'},
        {title:'CLIENT'},
        {title:'EXECUTIVE'},
        {title: 'DATE'},
        {title:'INFO'}
      ],
      index:0,
      initDate: null,
      endDate:null,
      selectedDepartment:{},
      watchMe: false,
      depsAndContractsArray:[],
      contractsArray: []
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
      print(item){

      const monthName = m => new Date(0, m).toLocaleString('en-US', { month: 'long' })

      var today = new Date();
      var month = today.getMonth();
      var dd = today.getDate();
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = '0' + dd;
      }


      document.getElementById("date").innerHTML = monthName(month)+ " " + dd + " " + yyyy ;
      $('#executive').html(item.commission.executive.name == undefined ? '-' : item.commission.executive.name);
      $('#customer').html(item.customer.name == undefined ? '-' : item.customer.name);
      $('#phoneExec').html(item.salesDetails.executive.contactNumber == undefined ? '-' : item.salesDetails.executive.contactNumber);
      $('#emailExec').html(item.salesDetails.executive.email == undefined ? '-' : item.salesDetails.executive.email);
      $('#country').html(item.customer.country == undefined ? '-' : item.customer.country);
      $('#state').html(item.customer.state == undefined ? '-' : item.customer.state);
      $('#address').html(item.customer.address == undefined ? '-' : item.customer.address);
      $('#customerPhone').html(item.customer.contactNumber == undefined ? '-' : item.customer.contactNumber);
      $('#customerEmail').html(item.customer.email == undefined ? '-' : item.customer.email);
      $('#paymentMethod').html(item.paymentMethod == undefined ? '-' : item.paymentMethod);
      $('#reserveDate').html(item.reference.reserveDate == undefined ? '-' : item.reference.reserveDate.substring(0,10));
      $('#reserveExpiration').html(item.reference.reserveExpiration == undefined ? '-' : item.reference.reserveExpiration.substring(0,10));
      $('#clusterName').html(item.cluster.name == undefined ? '-' : item.cluster.name);
      $('#level').html(item.level == undefined ? '-' : item.level);
      $('#statusName').html(item.status.name == undefined ? '-' : item.status.name);
      $('#unitNo').html(item.unitNumber == undefined ? '-' : item.unitNumber);
      $('#priceTotal').html(item.priceTotal == undefined ? '-' : item.priceTotal);
      $('#currency').html(item.currency == undefined ? '-' : item.currency);

      const cssText =`
        @import url('https://fonts.googleapis.com/css?family=Oswald&display=swap');
        body,
        html {
          height:100%;
          width:100%;
          margin:0;
          font-family: 'Oswald', sans-serif;
        }

        .container-header,
        .container-body{
          width:100%;
          border: 1px solid #dfd756;
          padding:10px;
          box-sizing:border-box;
          margin: 10px 0 10px 0;
        }

        .container-inner-header,
        .container-date {
          text-align:center;
          display:flex;
          align-items:center;
          justify-content:space-between;
        }

        .willPrint p{
          font-size:0.8rem;
        }

        .willPrint h4{
          margin-top:0;
        }

        .inner-header-sub {
          border:1px solid green;
        }

        .flex{
          display:flex;
          flex-direction:row;
          justify-content:space-between;
        }`
      const d = new Printd();
      d.print(document.getElementById('willPrint'),[cssText])
      },
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
        contracts: "contracts/contracts",
        departments: "departments/departments"
      }),
    filterByDate(){
      this.depsAndContractsArray = []
      var init = this.initDate
      var end = this.endDate
      this.contractsArray = []
      var newE = {}

      if(this.initDate != null && this.endDate != null) {
        this.watchMe = true
        var newW = {}
        for(var i = 0 ; i < this.contracts.length ; i++ ) {
            if(this.contracts[i].reference != undefined){
              var current = this.contracts[i].reference.reserveDate
              if(current >= init && current <= end) {
                this.depsAndContractsArray.push(this.contracts[i])
                }
              }
            }
            if(this.depsAndContractsArray == 0 ) {
              if(this.initDate != null || this.endDate != null)
            swal({
              text: `No apartments within range`,
              icon: "error",
              buttons: false,
              timer: 1500
          });
            }
          }
          console.log(this.depsAndContractsArray)

          for(var i = 0 ; i < this.depsAndContractsArray.length ; i++ ) {
            for(var e = 0 ; e < this.departments.length ; e++ ) {
              if(this.depsAndContractsArray[i].id == this.departments[e].id) {
                this.contractsArray.push(this.departments[e])
                }
              }
            }
            for ( var a = 0 ; a < this.depsAndContractsArray.length ; a ++ ) {
              newE = Object.assign(this.depsAndContractsArray[a],this.contractsArray[a])
              }

          this.depsAndContractsArray.sort((a,b) => (a.reference.reserveDate > b.reference.reserveDate) ? 1 : ((b.reference.reserveDate > a.reference.reserveDate) ? -1 : 0));
          return this.depsAndContractsArray

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

  .relative {
    position:relative;
  }

  .hover-mouse{
    cursor:pointer;
  }

  .absolute {
    position:absolute;
    left:0;
    top:7px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  body #app-historic-reports .historic-body .table thead td {
    border-bottom:none;
  }

  #app-historic-reports {
  height: 100%;
  width: 100%;
  background: #2a333c;
  color:white;
  }

  [type="date"] {
    background: #fff url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png) 97% 50% no-repeat;
  }

  [type="date"]::-webkit-inner-spin-button {
    display: none;
  }

  [type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
  }

  .historic-titles {
    background: #3c4857;
    padding: 20px;
    border-radius: 10px;
    width:80vw;
    max-width: 1000px;
    margin:100px auto 0 auto;
  }

    .historic-body {
    background: #3c4857;
    padding: 20px;
    border-radius: 10px;
    width:80vw;
    margin-top:50px;
    max-width: 1000px;
    margin:50px auto 50px auto;
  }

   .historic-body p {
    text-align: center;
    margin: 0;
   }

  .historic-titles h2,
  .historic-titles p {
    text-align: center;
  }

  .historic-body .table thead td {
    color:white;
    border-bottom:1px solid #a8a8a896;
    border-top:1px solid #a8a8a896;
    text-align: center;
    font-weight: bold;
  }

  .historic-body .table thead.table-body td {
    font-weight: 100;
  }

  .table-hover {
    table-layout: fixed;
  }

  .table-hover tr:hover {
    background: #2b353fb4;
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

  .responsive0,
  .responsive1,
  .responsive4 {
    width:100px;
  }

  .responsive5{
    width:80px;
  }

  .responsive3{
    width:150px;
  }

  td.responsive0,
  td.responsive1,
  td.responsive2,
  td.responsive3,
  td.responsive4,
  td.responsive5{
    padding: 6px 12px 6px 12px
  }

  .colors:nth-child(odd) {
  background: #425061;
}


    @media (max-width: 1000px) {
      .responsive2{
        display: none;
      }
    }

    @media (max-width:578px){
      .responsive4{
        display:none;
      }
    }

      @media (max-width:768px){
        .responsive3{
          display:none;
        }
    }

      @media (max-width:411px){
        .responsive1{
          width:33%;
        }

        .responsive0{
          width:75px;
        }
    }

</style>
