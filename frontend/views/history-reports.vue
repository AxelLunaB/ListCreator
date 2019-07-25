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
            <th v-for="(t,index) in header" :key="index" style="border-bottom:none;" :class="responsiveTable(index)">
              {{ t.title }}
            </th>
          </tr>
        </thead>
      </table>
      <table class="table table-hover">
          <thead>
          <tr>
            <th v-for="item in departments" :key="item.id">

            </th> <!--Reports here-->
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

export default {
  data() {
    return {
      header:[
        {title: 'ID'},
        {title:'#'},
        {title:'FLOOR'},
        {title:'PRICE'},
        {title:'INFO'}
      ],
      index:0,
      initDate: null,
      endDate:null,
      departments:[],
      selectedDepartment:{}
    }
  },
  methods:{
    responsiveTable(n){

        return 'responsive' + n

      },
    filterByDate(){

        if (this.initDate !== null && this.initDate !== '' && this.endDate !== null && this.endDate !== '') {
          const helper = new Date(this.endDate);
          helper.setDate(new Date(this.endDate).getDate() + 1);
          this.departments = this.dateArray.filter((element) => {
            return new Date(element.updatedAt).getTime() >= new Date(this.initDate).getTime() && new Date(element.updatedAt).getTime() <= helper.getTime();
          });
        } else {
          this.departments = this.dateArray;
        }

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
      }
      ,
      print(){
        const cssText = `` //here goes the css of the div we will print
      }

    },
    computed:{
      ...mapGetters({
        //here b getters
      }),
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  }

    .history-body {
    background: #3c4857;
    padding: 20px;
    border-radius: 10px;
    width:80vw;
    margin-top:50px;
    max-width: 1000px;
  }

  .history-titles h2,
  .history-titles p {
    text-align: center;
  }

  .history-body .table thead th {
    color:white;
    border-bottom:1px solid #a8a8a896;
    border-top:1px solid #a8a8a896;
    text-align: center;
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
      .responsive2,
      .responsive3 {
        display: none;
        }
    }
  }
</style>
