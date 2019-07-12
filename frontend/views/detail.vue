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
          <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-outline-light">Reports</button>
          <button type="button" class="btn btn-outline-light">Other</button>
          <button type="button" class="btn btn-outline-light">Other</button>
          </div>
        </div>
      </div>
      <div class="card-body" id="printMe" style= "max-width:1000px; margin:0 auto;">
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
                <td style="text-align:center;vertical-align:middle;"><b>STATUS</b></td>
            </tr>
            </tbody>
        </table>
              <detail-table v-for="(e, index) in departments" :key="e.index" :detailTable="e" :contracts="contracts[index]"></detail-table>
              </div>
          </div>
        </div>
      </div>
      <towerdetail></towerdetail>
      <div class="navbar-container" style="max-width:1000px; margin:25px auto;">
          <div class="navbar-brand">
            <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-light">Dowload sheet</button>
            <button type="button" class="btn btn-outline-light" v-print="'#printMe'" id="sendtopdf">Print PDF</button>
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
  import xlsx from 'xlsx';
  // import filesaver from 'file-saver';


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
        isAnimated: true
      }
    },
    mount:function(){
      var wb = xlsx.utils.table_to_book(document.getElementById('printMe'),{sheet:"Departments"});

      function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<s.length; i++)
        view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
        }
        $("#sendtopdf").click(function(){
          saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'departments.xlsx');
          });
    },
    methods: {
      ...mapActions("departments", ["nextPage", "prevPage"]),
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
    background: #2a333c;
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
      background: #3c4857;
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
    max-width: 1000px;
    margin:0 auto;
    padding-bottom:25px;
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
