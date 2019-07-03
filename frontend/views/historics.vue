<template>
  <div class="app-container container has-navbar-fixed-top">
    <div class="panel-background">
      <div class="tabs">
        <ul>
          <li :class="departmentTabClass"><a v-on:click="changeView(0)">Departamentos</a></li>

          <li v-if="selectedDepartment.id != undefined" :class="departmentDetailClass"><a v-on:click="changeView(3)">Departamento: #{{selectedDepartment.deptnumber}}</a></li>
        </ul>
      </div>
      <div class="columns is-multiline padding-30">
        <department-historic v-if="view == 0" v-for="l in departments" :key="l.id" :historic="l" :is-detailed="false"></department-historic>
        <department-historic v-if="view == 3" v-for="l in departments" :key="l.id" :historic="l" :is-detailed="true"></department-historic>
      </div>
      <div class="padding-15">
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
          <a v-on:click="prevPage" class="pagination-previous">Anterior</a>
          <a v-on:click="nextPage" class="pagination-next">Siguiente</a>
          <ul class="pagination-list">
            <li v-for="n in pagesDisplay" :key="n" v-on:click="goToPage(n)">
              <a :class="pageClass(n)" aria-label="Goto page 1">{{n+1}}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";

import cookie from "../utils/cookie";
import historic from "./components/historic.vue";
import departmentHistoric from "./components/departmentHistoric.vue";
import io from "socket.io-client";


const DEPARTMENT = 0;
const LOTS = 1;
const LOT_DETAIL = 2;
const DEPARTMENT_DETAIL = 3;

var socket = io();

export default {
  mounted: function() {
    const _ = this;
    // this.$store.commit("addButton", false);
  /*  this.$eventHub.$on("add-lot-historic-detail", lot => {
      this.selectedLot = lot;
      this.view = LOT_DETAIL;
      this.retrieveData();
    }); */
    this.$eventHub.$on("add-department-historic-detail", department => {
      this.selectedDepartment = department;
      this.view = DEPARTMENT_DETAIL;
      this.retrieveData();
    });
    socket.emit(
      "authenticate",
      {
        strategy: "jwt",
        accessToken: cookie()
      },
      function(message, data) {
        _.retrieveData();
      }
    );
  },
  components: {
    historic,
    departmentHistoric,

  },
  data() {
    return {
      lots: [],
      departments: [],
      total: 0,
      limit: 0,
      pages: 0,
      index: 0 /* AKA PAGE */,
      view: 0,
      selectedLot: {},
      selectedDepartment: {}
    };
  },
  methods: {
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
    updateLot(uLot) {
      this.lots.forEach(lot => {
        if (lot.id === uLot.id) {
          for (var key in uLot) {
            lot[key] = uLot[key];
          }
        }
      });
    },
    retrieveLotsHistorics(query) {
      const _ = this;
      var q = { $skip: _.index * _.limit };
      if (query != null || query != undefined) {
        for (var k in query) {
          q[k] = query[k];
        }
      }
      socket.emit("api/lot-historics::find", q, (error, lots) => {
        _.total = lots.total;
        _.limit = lots.limit;
        _.pages = lots.total / lots.limit;
        _.lots = [];
        lots.data.forEach(l => {
          _.lots.push(l);
        });
      });
    },
    retrieveDepartmentHistorics(query) {
      const _ = this;
      var q = { $skip: _.index * _.limit };
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
        department.data.forEach(l => {
          _.departments.push(l);
        });
      });
    },
    retrieveData() {
       if (this.view === LOTS) {
        this.retrieveLotsHistorics();
      } else if (this.view === LOT_DETAIL) {
        this.retrieveLotsHistorics({ lotid: this.selectedLot.lotid });
      }
      else if (this.view === DEPARTMENT) {
        this.retrieveDepartmentHistorics();
      } else if (this.view === DEPARTMENT_DETAIL) {
        this.retrieveDepartmentHistorics({ departmentid: this.selectedDepartment.departmentid });
      }
    },
    changeView(view) {
      this.view = view;
      this.index = 0;
      this.retrieveData();
    }
  },
  computed: {
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
    },
    departmentTabClass() {
      return this.view === DEPARTMENT ? "is-active" : "";
    },
    lotTabClass() {
      return this.view === LOTS ? "is-active" : "";
    },
    lotDetailClass() {
      return this.view === LOT_DETAIL ? "is-active" : "";
    },
    departmentDetailClass() {
      return this.view === DEPARTMENT_DETAIL ? "is-active" : "";
    }
  }
};
</script>
<style lang="scss" src="../styles/main.scss">
</style>
