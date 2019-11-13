<template>
  <div class="main-tables-container animate" id="main-tables-container">
    <div class="loading" v-if="loading" style="color:white;position:fixed;left:0;top:0;right:0;bottom:0;display: flex;align-items: center;justify-content: center;z-index: 2;background: #2a333c;">
      <div>
        <svg width="108px"  height="108px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none;"><circle cx="50" cy="50" fill="none" stroke="#425061" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(113.895 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>
      </div>
    </div>
    <div class="col-11"  style="margin-top:80px;">
      <div class="title-header">
        <div style="width:100px;height:100px;margin-left:10px;display:flex;align-items: center;justify-content: center;"></div>
        <h2 :title="title" style=" display: flex;align-items: center;">Etapa {{ clusterId ? clusterId : ''}}</h2>
        <div class="buttons-header" style="z-index:0;">
        </div>
      </div>
      <filter-table />
      <div class="card-body" id="printMe" style= "max-width:800px; margin:0 auto;" ref="table">
        <div class="row">
          <div class="col-12">
            <div>
              <table class="table table-hover" style="table-layout: fixed;margin-bottom:0;margin-top:0;">
                  <tbody>
                  <tr>
                      <td class="header-t" style="text-align:center;vertical-align:middle;"><b> No. UNIDAD</b></td>
                      <td class="header-t tablet" style="text-align:center;vertical-align:middle;"><b>MODELO</b></td>
                      <td class="header-t tablet" style="text-align:center;vertical-align:middle;"><b>AREA M<sup>2</sup> TERRENO</b></td>
                      <td class="header-t" style="text-align:center;vertical-align:middle;"><b>MANZANA</b></td>
                      <td class="header-t mobile" style="text-align:center;vertical-align:middle;"><b> AREA CONST. M<sup>2</sup></b></td>
                      <td class="header-t mobile" style="text-align:center;vertical-align:middle"><b> ESTATUS </b></td>
                  </tr>
                  </tbody>
              </table>
              <detail-table v-for="(e, index) in filterStages" :key="index" :unit="e"></detail-table>
              </div>
            </div>
          </div>
        </div>
      <towerdetail></towerdetail>
      <full-list-view :title="this.title"></full-list-view>
      <contractsSegment :clusterId="clusterId"></contractsSegment>
      <div class="navbar-container" style="max-width:800px; margin:25px auto;">
          <div class="navbar-brand">
            <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn waves-white ripple"  id="tosheet" @click="tableToExcel">Descargar Excel</button>
            <button type="button" class="btn waves-white ripple" id="sendtopdf" v-print="'#printMe'">Imprimir PDF</button>
            </div>
          </div>
        </div>
    </div>
    <references-list :title="title" :departments ="departments" :clusterId="clusterId" :openReference="openReference" v-on:closeReferences="closeReferences($event)" />
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import { mapGetters } from "vuex";
  import detailTable from "./components/detail-table.vue";
  import towerdetail from "./components/towerdetail.vue";
  import fullListView from "./components/fullListView.vue"
  import contractsSegment from "./components/contractsSegment.vue"
  import referencesList from "./components/referencesList.vue"
  import XLSX from 'xlsx';
  import $ from "jquery";
  import filterTable from "./components/filterTable.vue"
  import swal from "sweetalert";

  export default {
    components: {
      detailTable,
      contractsSegment,
      towerdetail,
      fullListView,
      filterTable,
      referencesList
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

    this.$eventHub.$on("select-tower", stage => {
      this.$store.dispatch("others/fetchUnitsByStage", stage.stage);
      this.clusterId = stage.stage;
    });




      this.$eventHub.$on("updateDataDetail", () => {
        this.$store.dispatch("others/setPlusButton", true);
        this.$store.dispatch("departments/listenEvents");
      });

      var isAuthenticated = this.$store.state.others.isAuthenticated;

      if (isAuthenticated) {
        this.$store.dispatch("others/setPlusButton", true);
        this.$store.dispatch("departments/listenEvents");

        // listen to authenticated event
      } else {
        let _ = this;
        this.$eventHub.$on("authenticated", function() {
          _.$store.dispatch("others/setPlusButton", true);
          _.$store.dispatch("departments/listenEvents");
        });
      }
    },

    data() {
      return {
        openReference:false,
        detailTable: 3,
        isAnimated: true,
        sDepartments:[],
        fDepartments:[],
        depsAndContracts:[],
        title:null,
        tower:null,
        clusterId: undefined,
        modelFilter: null,
        blockFilter: null,
        statusFilter:null,
        filteredUnits: [],
        loading:true
      }
    },

    methods: {
      ...mapActions("departments", ["nextPage", "prevPage"]),

      tableToExcel(){
        var downloadTime = new Date();
        var day = downloadTime.getDate();
        day < 10 ? day = "0"+day : day;
        var month = downloadTime.getMonth()+1;
        month < 10 ? month = "0" + month : month;
        var year = downloadTime.getFullYear();
        var dom = document.getElementById('printMe');
        const wb = XLSX.utils.table_to_book(dom, { sheet: 'Departments' })

        return XLSX.writeFile(wb, 'BT-'+'units-'+day+'/'+month+'/'+year+'.xlsx')
    },

    showList() {
      let info = {
         departments: this.departments,
         contracts: this.contracts
      }
        this.$eventHub.$emit("show-fullView-detail-tower-modal", info);
        document.getElementById('listView').style.display='inline';
        document.getElementById("listView").style.opacity = 0;
        setTimeout(function () {
          document.getElementById("listView").style.transition = "opacity 0.5s";
          document.getElementById("listView").style.opacity = 1;
            }, 100);
      },

      showContracts() {
        let info = {
          departments : this.departments
        }

        this.$eventHub.$emit("show-contractsSegment-modal", info);
      },

      getUnitId(idunit){
       let c = null;
       for(let i = 0; i < this.contracts.length ; i ++) {
         if(this.contracts[i].unitId != null){
           if(this.contracts[i].unitId == idunit){
             c = this.contracts[i];
           }
         }
       }
       return c
     },

     closeReferences(x){
       this.openReference = x
     }

    },

    computed: {
      ...mapGetters({
        departments: "departments/departments",
        commissions: "commissions/commissions",
        searchQuery: "departments/query",
        filteredValue: "departments/filterValue",
        specialSort: "departments/specialSort",
        isAdmin: "users/isAdmin",
        encinosByStage: "others/encinosUnitsByStage"
      }),

      currentAvailability () {
          var cData= {}
          var available = 0
          var reserved = 0
          var sold =  0

        if(this.departments.length > 0) {
           for(let i = 0 ; i < this.departments.length ; i++) {
             var cDep = this.departments[i].status.name

            if ( cDep == 'AVAILABLE' ) {
              available = available + 1
             } else if ( cDep == 'SOLD') {
               sold = sold +1
             } else {
               reserved = reserved +1
             }
           }

        }
             cData = {
             available: available,
             sold: sold,
             reserved: reserved
           }

         return cData
         },

      sortedArray() {
        let s =  this.filteredValue.toString()
        function compare(a, b) {
          if (a[s] < b[s])
          return -1;
          if (a[s] > b[s])
          return 1;
          return 0;
      }

        var verify = null

         if(this.sDepartments.length > 0) {

           verify = this.sDepartments.sort(compare)

         } else if( this.specialSort[0].value == null && this.specialSort[1].value == null && this.specialSort[2].value == null) {

           verify = this.departments.sort(compare)

         } else {
            verify = this.sDepartments.sort(compare)
            swal({
              text: "No departments within range.",
              icon: "warning",
              buttons: false,
              timer: 3000
          });
         }

         return verify
    },

     filterStages () {

       // Update filter data to use Watch
       this.modelFilter = this.specialSort[0].value;
       this.blockFilter = this.specialSort[2].value;
       this.statusFilter = this.specialSort[1].value;

       // Return every unit that belongs to the stage
       if(this.modelFilter === null && this.blockFilter === null && this.statusFilter === null) {
         return this.encinosByStage.data;
       } else {
        return this.filteredUnits;
       }
      },

    },
      watch : {
        currentAvailability(newVal) {
           this.$store.dispatch("departments/setCurrentAvailability",newVal);
        },

        modelFilter: function(newVal, oldVal) {
          if(this.blockFilter !== null && this.statusFilter !== null) {
            return this.filteredUnits = this.encinosByStage.data.filter(unit => unit.houseModel === this.modelFilter && unit.suburb === this.blockFilter && unit.statusId === this.statusFilter);
          }
          return this.filteredUnits = this.encinosByStage.data.filter(unit => unit.houseModel === newVal);
        },

        blockFilter: function(newVal, oldVal) {
          if(this.modelFilter !== null && this.statusFilter != null) {
            return this.filteredUnits = this.encinosByStage.data.
            filter(unit => unit.houseModel === this.modelFilter && unit.suburb === this.blockFilter && unit.statusId === this.statusFilter);
          }
            return this.filteredUnits = this.encinosByStage.data.filter(unit => unit.suburb === newVal);
        },

        statusFilter: function(newVal, oldVal) {
          if(this.modelFilter !== null && this.blockFilter !== null) {
            return this.filteredUnits = this.encinosByStage.data.filter(unit => unit.houseModel === this.modelFilter && unit.suburb === this.blockFilter && unit.statusId === this.statusFilter);
          }
            return this.filteredUnits = this.encinosByStage.data.filter(unit => unit.statusId === newVal);
        },

        filterStages(newVal, oldVal){
          if(this.loading == true){
            return this.loading = false
          }
        }
      },
  }

</script>

<style lang="scss">

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

    .animate {
    animation: fadeInAnimation 1s forwards;
  }

  .header-t {
    height: 50px;
    text-align:center!important;
    vertical-align:middle!important;
    font-size: 0.8rem;
  }

  .navbar-container {
    max-width: 1200px;
    margin:0 auto;
  }

button.waves-white {
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid white;
  padding: 8px 18px;
  margin: 10px 1px;
  font-size: 14px;
  font-weight: 500;
  background: transparent;
  background-color: none;
  color: white;
}

button.waves-white:hover {
  background:white;
  color:#2a333c;
}
button.waves-white.ripple {
  overflow: hidden;
  position: relative;
  transition: background-color 0.3s linear, border 0.3s linear;
}
button.waves-white.ripple:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #000000 10%, rgba(0, 0, 0, 0) 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10);
  opacity: 0;
  transition: transform .5s, opacity 1s;
}
button.waves-white.ripple:active:after {
  transform: scale(0);
  opacity: .2;
  transition: 0s;
}

.btn.focus, .btn:focus {
    outline: 0;
    box-shadow: none;
}

#toReferences {
  margin-bottom: 15px;
}

#printMe .row {
  margin-left:0;
  margin-right:0;
}

#printMe td {
  padding:0
}

button.btn.waves-white.ripple#createContract {
  border-radius: 0px 5px 5px 0px;
}

  @media screen and (max-width: 867px) {
    .navbar-brand {
      justify-content: center;
    }
    .btn-group {
      display: flex;
      flex-direction: column;
    }
    .navbar-container {
    text-align: center;
    }


    #newContract,
    #sendtopdf,
    #tosheet,
    #toReferences,
    button.btn.waves-white.ripple#createContract {
      border-radius: 5px;
      width:150px;
      }

    #newContract {
      padding-left:8px;
    }
  }

      @keyframes fadeInAnimation {
      0%   {
        opacity: 0;
         }

      100% {
        opacity: 1;
        }
    }
</style>
