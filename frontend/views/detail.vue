<template>
  <div class="main-tables-container">
      <!-- <router-link to="/" id="return"  :class="{ fadeInAnimate: isAnimated }">
        <return-page />
      </router-link> -->
    <div class="col-11"  style="margin-top:80px;">
      <div class="title-header">
        <div style="width:100px;height:100px;margin-left:10px;"><img src="../../public/favico.png"></div>
        <h2 style=" display: flex;align-items: center;">Viva Towers</h2>
        <div class="buttons-header">
          <div class="btn-group" role="group" aria-label="Basic example" style="margin-right:10px;">
          <button type="button" class="btn btn-outline-light">Reports</button>
          <button type="button" class="btn btn-outline-light">Other</button>
          <button type="button" class="btn btn-outline-light">Other</button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <div>
              <detail-table v-for="e in departments" :key="e.index" :detailTable="e"></detail-table>
              </div>
          </div>
        </div>
      </div>
      <towerdetail></towerdetail>
      <div class="navbar-container">
          <div class="navbar-brand">
            <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-light">Copy</button>
            <button type="button" class="btn btn-outline-light">CSV</button>
            <button type="button" class="btn btn-outline-light">Excel</button>
            <button type="button" class="btn btn-outline-light">PDF</button>
            <button type="button" class="btn btn-outline-light">Print</button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import { mapGetters } from "vuex";
  import detailTable from "./components/detail-table.vue";
  import returnPage from "./components/returnPage.vue";
  import towerdetail from "./components/towerdetail.vue";
  export default {
    components: {
      detailTable,
      returnPage,
      towerdetail
    },
    mounted: function() {
      this.$eventHub.$on("go-search", params => {
        var query = {};
        params.forEach(v => {
          if (v[1] != "") {
            query[v[0]] = v[1];
          }
        });
        this.$store.dispatch("departments/goSearch", query);
      });
      // logic
      var isAuthenticated = this.$store.state.others.isAuthenticated;
      if (isAuthenticated) {
        // Dispatch actions &&  subscribe to rt events.
        console.log("auth");
        this.$store.dispatch("departments/getDepartments");
        this.$store.dispatch("others/setPlusButton", true);
        this.$store.dispatch("departments/listenEvents");
        // listen to authenticated event
      } else {
        console.log("no auth");
        let _ = this;
        this.$eventHub.$on("authenticated", function() {
          _.$store.dispatch("departments/getDepartments");
          _.$store.dispatch("others/setPlusButton", true);
          _.$store.dispatch("departments/listenEvents");
        });
      }
    },
    data(){
      return {
        detailTable: 3,
        isAnimated: true
      }
    },
    methods: {
      ...mapActions("departments", ["nextPage", "prevPage"])
    },
    computed: {
      ...mapGetters({
        departments: "departments/departments",
        searchQuery: "departments/query",
        clusters: "others/clusters",
        filteredValue: "departments/filterValue",
        specialSort: "departments/specialSort"
      })
    }
  }
</script>

<style  lang="scss">

  @import 'node_modules/bootstrap/scss/bootstrap';
  @import 'node_modules/bootstrap-vue/src/index.scss';

  .main-tables-container {
    width:100vw;
    background: rgb(81, 111, 77);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card {
    background: none;
  }

  .table thead td, .table thead th {
      border-width: 0px;
      color: white;
  }

  h2 {
    color:  white;
  }

  .test {
    background: red;;
  }

    .card-body {
      background: rgb(106, 142, 103);
      margin:10px;
      border-radius: 3px;
      color: white;
      cursor: pointer;
    }

    .table {
      background: none;
      color: white;

    }

    .table td {
      padding: 0;
    }

    .info-card {
      width:100%;
    }

    .table-hover tbody tr:hover {
      color: #ddffe4;
      background-color: rgba(0,0,0,.075);
  }

  .image-card {
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .title-header {
    display: flex;
    justify-content: space-between;
  }

  .buttons-header {
    display: flex;
     justify-content: flex-start;
     align-items:center;
  }

  .navbar-brand {
     display: flex;
     justify-content: flex-start;
  }

  #return {
    color: white;
    position: fixed;
    left: 20px;
    top:80px;
    z-index: 30;
  }

  td {
    color: white;
  }

  img {
    border-radius: 15%;
  }

  @media screen and (max-width: 867px) {
    .navbar-brand {
      justify-content: center;
    }
  }
</style>
