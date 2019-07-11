<template>
  <div class="main-tables-container">
      <!-- <router-link to="/" id="return"  :class="{ fadeInAnimate: isAnimated }">
        <return-page />
      </router-link> -->
    <div class="col-11"  style="margin-top:80px;">
        <div class="title-header">
          <div style="width:100px;height:100px;margin-left:10px;"><img src="../../public/favico.png"></div>
          <h2 style=" display: flex;align-items: center;">Brava Tower</h2>
          <div class="buttons-header">
            <div class="btn-group" role="group" aria-label="Basic example" style="margin-right:10px;">
              <button type="button" class="btn btn-outline-light">Reports</button>
              <button type="button" class="btn btn-outline-light">Other</button>
              <button type="button" class="btn btn-outline-light">Other</button>
            </div>
          </div>
        </div>
      <div class="card-body" id="printMe">
        <div class="row">
          <div class="col-12">
            <div>
        <table class="table table-hover" style="table-layout: fixed;margin-bottom:0;margin-top:0;">
            <tbody>
            <tr>
                <td class="header-t" style="text-align:center;vertical-align:middle;"><b> UNIT  #</b></td>
                <td class="header-t xs-mobile" style="text-align:center;vertical-align:middle;"><b>LEVEL</b></td>
                <td class="header-t tablet" style="text-align:center;vertical-align:middle;"><b>BATHROOMS</b></td>
                <td class="header-t tablet" style="text-align:center;vertical-align:middle;"><b>BEDROOMS</b></td>
                <td class="header-t tablet" style="text-align:center;vertical-align:middle;"><b>KEYS</b></td>
                <td class="header-t mobile" style="text-align:center;vertical-align:middle;"><b>M<sup>2</sup> int</b></td>
                <td class="header-t mobile" style="text-align:center;vertical-align:middle;"><b>M<sup>2</sup> ext</b></td>
                <td class="header-t xs-mobile"  style="text-align:center;vertical-align:middle;"><b>PRICE</b></td>
                <td style="header-t text-align:center;vertical-align:middle;"><b>STATUS</b></td>
            </tr>
            </tbody>
        </table>
              <detail-table v-for="(e, index) in departments" :key="e.index" :detailTable="e" :contracts="contracts[index]"></detail-table>
              </div>
            </div>
          </div>
        </div>
      <towerdetail></towerdetail>
      <div class="navbar-container">
          <div class="navbar-brand">
            <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-light" @click="tableToExcel('table', 'printMe')">Dowload sheet</button>
            <button type="button" class="btn btn-outline-light" v-print="'#printMe'" id="sendtopdf">Print PDF</button>
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
        this.$store.dispatch("contracts/getContracts");
        this.$store.dispatch("others/setPlusButton", true);
        this.$store.dispatch("departments/listenEvents");
        // listen to authenticated event
      } else {
        console.log("no auth");
        let _ = this;
        this.$eventHub.$on("authenticated", function() {
          _.$store.dispatch("departments/getDepartments");
          _.$store.dispatch("contracts/getContracts");
          _.$store.dispatch("others/setPlusButton", true);
          _.$store.dispatch("departments/listenEvents");
        });
      }
    },
    data(){
      return {
        detailTable: 3,
        isAnimated: true,
        uri :'data:application/vnd.ms-excel;base64,',
        template:'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64: function(s){ return window.btoa(unescape(encodeURIComponent(s))) },
        format: function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
      }
    },
    methods: {
      ...mapActions("departments", ["nextPage", "prevPage"]),
          tableToExcel(table, name){

      if (!table.nodeType) table = this.$refs.table
      var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
      window.location.href = this.uri + this.base64(this.format(this.template, ctx))
    }
    },
    computed: {
      ...mapGetters({
        departments: "departments/departments",
        contracts: "contracts/contracts",
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

  .header-t {
    height: 50px;
  }

  @media screen and (max-width: 867px) {
    .navbar-brand {
      justify-content: center;
    }
  }
</style>
