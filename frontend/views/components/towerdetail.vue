<template>
<div v-if="shouldShow === true" id="fadeOutAnimation">
  <div class="container-fluid cards-detail" v-bind:class="{ active: show}" id="container-fluid">
    <div v-if="loading" style="position: fixed;left: 0;right: 0;bottom: 0;top: 0;z-index: 2;display: flex;align-items: center;justify-content: center;">
      <div>
        <svg width="108px"  height="108px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none;"><circle cx="50" cy="50" fill="none" stroke="#2a333c" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(113.895 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>
      </div>
    </div>
      <div id="returntwo" @click="closeBtn()">
        <span><i class="fas fa-level-up-alt"></i> &nbsp; Regresar</span>
      </div>
  <div class="row row-one" :class="{ animate: isActive }" style="margin:0 auto;">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6">
        <div class="card">
            <div class="card-body">
                <h4 class="m-b-30 m-t-0 text-center"><span style="font-size:2rem"> Unidad #{{ detailTable ? detailTable[0].unit : ''}}</span></h4>
                <div class="row fullh">
                    <div class="col-12" style="display: flex;align-items: center;">
                        <table class="table table-hover table-modifier medh">
                            <thead>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="textalign">Manzana</td>
                                <td class="text-right">{{ detailTable[0] ? detailTable[0].suburb : '' }}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Etapa</td>
                                <td class="text-right">{{ detailTable[0] ? detailTable[0].stage : '' }}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Modelo</td>
                                <td class="text-right">{{ detailTable[0] ? detailTable[0].houseModel : ''}}</td>
                            </tr>
                            <tr>
                                <td class="textalign">m<sup>2</sup> Construcción</td>
                                <td class="text-right"> {{ detailTable[0] ? detailTable[0].m2Construction : ''}} </td>
                            </tr>
                            <tr>
                                <td class="textalign">m<sup>2</sup> Terreno</td>
                                <td class="text-right"> {{ detailTable[0] ? detailTable[0].m2Terrain : '' }}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Status</td>
                                <td class="text-right" style="padding-top:10px;">
                                  <select id="myList" v-on:change="status($event)">
                                    <option v-bind:style="{color: detailTable[1][1]}">{{ stateIndex ? stateIndex : detailTable[1][0] }}</option>
                                    <option value = "1" style="color:#35ce41;" v-if="detailTable[0].statusId != 1">DISPONIBLE</option>
                                    <option value = "2" style="color:#cd110f;" v-if="detailTable[0].statusId != 2">VENDIDO</option>
                                    <option value = "3" style="color:#e89005;" v-if="detailTable[0].statusId != 3">APARTADO</option>
                                    <option value = "4" style="color:#f5e02a;" v-if="detailTable[0].statusId != 4">BLOQUEADO</option>
                                  </select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6">
        <div class="card">
            <div class="card-body">
                <div class="row fullh">
                    <div class="col-12">
                        <table class="table table-hover table-modifier fullh">
                            <thead>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>

    </div>
    <div class="row row-two" :class="{ animate: isActive }"  style="margin:0 auto;">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6" style="height:100%;">
        <div class="card">
          <div class="card-body" style="padding-bottom:0;">
            <div class="row" style="height:242px;">
              <div class="col-12" style="flex-direction:column;">
                <h5 class="m-t-0 m-b-30 text-center">DISPONIBILIDAD</h5>
                <div style="width:100%;display:flex;justify-content:center;height:79%">
                  <chartjs-doughnut
                  v-bind:labels="labels"
                  v-bind:datasets="dynamicChart"
                  v-bind:option="option"
                  :width="mywidth"
                  :height="myheight"
                  style="height:226px;"
                   ></chartjs-doughnut>
                </div>
              </div>
            </div>
            <div class="labels">
              <div style="display:flex;flex-align:row;"><div class="chartdata" style="background:#70b84f;"></div><p>Disponible</p></div>
              <div style="display:flex;flex-align:row;"><div class="chartdata" style="background:#c5077e;"></div><p>Vendido</p></div>
              <div style="display:flex;flex-align:row;"><div class="chartdata" style="background:#dddc00;"></div><p>Reservado</p></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6" style="height:100%;">
        <div class="card">
          <div class="card-body" style="display:flex; flex-direction:column;">
            <h5 class="m-t-0 m-b-30 text-center">VENTAS</h5>
          <div class = "placeholder-card">
              <chartjs-bar
              :beginzero="myboolean"
              :backgroundcolor="mybackgroundcolor"
              :bordercolor="mybordercolor"
              :datalabel="mylabel"
              :labels="pastMonths"
              :data="dynamicBar"
              v-bind:option="myoption"
              style="width:100%;">
      </chartjs-bar>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import $ from "jquery";
import returnPage from "./returnPage.vue";
import swal from "sweetalert";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { file } from 'babel-types';
import { log } from 'util';

export default {

  mounted: function () {
    this.$eventHub.$on("show-detailTable-detail-tower-modal", details => {
      this.detailTable = details;
      this.show = true;
    });
  },

  components: {
    returnPage
  },

  data() {
    return {
      mywidth: 200,
      currentState: '',
      files: [],
      selectedExec:null,
      stateIndex:null,
      selectedLabel: '',
      userModal:false,
      myheight: 200,
      loading:false,
      show: false,
      isActive: true,
      detailTable: {},
      contract: {},
      labels: ["Disponible", "Reservado", "Vendido"],
      datasets: [{
        data:[1,2,3],
        backgroundColor:["#70b84f", "#dddc00", "#c5077e"]
      }],
      option: {

        title: {
          display:false,
          responsive:false,
        },

        legend: {
          display:false
        },

      },
    myboolean : true,
    mybackgroundcolor : [
      '#70b84f',
      '#dddc00',
      '#c5077e',
      '#70b84f',
      '#dddc00'
      ],
    mybordercolor : [
      '#70b84f',
      '#dddc00',
      '#c5077e',
      '#70b84f',
      '#dddc00'
      ],
    mylabel : 'Ventas',
    mydata : [],
        myoption: {
          legend: {
            display:false
        },
        toooltips: {
          callbacks: {
            label:function(tooltipItem){
              return tooltipItem.yLabel;
            }
          }
        },
        scales: {
          yAxes:[{
            ticks:{
              max:10, //add a computed here
              fontColor:'white',
              beginAtZero:true,
              userCallback:function(label,index,labels){
                if (Math.floor(label)=== label) {
                  return label
                }
              }
            }
          }],
          xAxes:[{
            ticks:{
              fontColor:'white'
            }
          }]
        }
      }
    }
  },

  methods: {

    closeBtn() {
      self = this
      document.getElementById("fadeOutAnimation").style.transition = "opacity 1s";
      document.getElementById("fadeOutAnimation").style.opacity = 0;
      setTimeout(function () {
        self.show = false;
      }, 250);
    },

    toPrice(x) {
      var r = x.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      return r;
    },

      status: function status(event) {
        this.selectedExec = null;
        this.stateIndex  = event.target[event.target.selectedIndex].label;

          swal({
            title: 'Confirmar estatus.',
            text: `¿Cambiar estatus a ${this.stateIndex} ?`,
            icon: "info",
            buttons:{
              cancel:true,
              confirm:true,
            }
          })
          .then(isConfirm => {
            if(isConfirm){
              const self = this;
              const unitId = this.detailTable[0].id
              const currentStatus = this.detailTable.statusId;
              const statusId = parseInt(document.getElementById("myList").value);
              const newStatus = {
                unitId: unitId,
                statusId: statusId,
              };

              // let open = true;
              // this.$eventHub.$emit("modal-bar", open);
              document.body.style.cursor = "wait";
              this.loading = true;

              this.$store.dispatch('departments/updateStatus', newStatus).then(updated => {
                if(updated){
                  document.body.style.cursor = "auto";
                  this.loading = false;
                  // this.$eventHub.$emit("modal-bar", this.loading);

                  swal({
                    title:'Unidad actualizada',
                    text:'Unidad #' + self.detailTable[0].unit + ' esta ' + this.stateIndex,
                    icon:'success'
                  })

                  if(document.getElementById("myList")){
                    document.getElementById('myList').selectedIndex = 0;
                    }

                      let stageName = this.detailTable[0].stage;
                      this.$store.dispatch("others/fetchUnitsByStage", stageName);

                  }
              });
            } else {
              this.stateIndex = '';
              if(document.getElementById("myList")){
                      document.getElementById('myList').selectedIndex = 0;
                      }
            }
          })

      },

  },

  computed: {
    ...mapGetters({
      cAvailability: "departments/currentAvailability",
      isAdmin: "users/isAdmin",
    }),

    shouldShow() {
      return this.show;
    },

    getColor() {
      // if (this.detailTable.status.color_hex) {
        if(this.detailTable){
        return this.detailTable.status.color_hex
      } else if(this.contract != null) {
        if(this.contract.commission){
          return this.contract.commission.status.color_hex;
        }
      }
      else {
        return  'ffffff'
      }
    },

    getTotalCommission () {
      let percent = 0

      if(this.contract != null ) {
        if(this.contract.commission != null) {
          percent = this.contract.commission.managementCommissions +
          this.contract.commission.salesAdministrativeCommissions +
          this.contract.commission.brokerCommissions +
          this.contract.commission.salesExecutivesCommissions +
          this.contract.commission.thirdPartyCommissions
          percent = percent / 100

         return this.contract.salesprice > 0 ? '$ ' + (this.contract.salesprice * percent).toFixed(2) : '-';
        }
      }

    },

    dynamicChart () {
      this.datasets[0].data[0] = 2
      this.datasets[0].data[1] = 3
      this.datasets[0].data[2] = 6
      return this.datasets
    },

    pastMonths(){
      var monthName = m => new Date(0, m).toLocaleString('es-MX', { month: 'long' })
      var month = new Date().getMonth();
      var c = (monthName(month))
      var lastMonth = (monthName(month-1))
      var PenMonth = (monthName(month-2))
      var anteMonth = (monthName(month-3))
      return [anteMonth,PenMonth,lastMonth,c]
    },

    dynamicBar(){
      this.mydata[0] = 3
      this.mydata[1] = 8
      this.mydata[2] = 4
      this.mydata[3] = 3

      return this.mydata
    }
  }}
</script>

<style>

  @import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

  body {
    background: #2a333c!important;
  }

  select {
  background:#252d33;
  border:none;
  border-radius: 4px;
  color:white;
  padding:5px;
  cursor:pointer;
}

select option {
  padding-bottom:100px;
  border-radius: 4px;
}
    .container-fluid {
    text-align:center;
    background:#2a333c;
    height: 100%;
    position:fixed;
    top:57px;
    left:0;
    max-height: 97vh;
    padding-top: 18px;
  }

  #container-fluid {
    z-index:3!important;
  }

  .card {
    background:#3c4857!important;
    margin:10px;
    flex:1;
    border:none!important;
  }

  .animate {
    animation: fadeInAnimation 1s forwards;
  }

  .animateOut {
    animation: fadeOutAnimation 1S forwards;
  }

  .send {
    width: 100%;
    height: 200px;
    border: 2px dashed rgb(185, 195, 186);
    border-radius: 3px;
    cursor:pointer;
  }

  .table-modifier {
    background: none;
  }

  .table-modifier  tbody tr td {
    color:white;
    padding:0;
  }

  .card .card-body h4,
  .card .card-body h5 {
    color:white;
  }

  .overflow {
  max-height: 400px;
  overflow-y: auto;
  overflow-x:hidden;
  }

  #returntwo {
    color: white;
    position: fixed;
    right:0;
    bottom:-3px;
    z-index: 2;
    cursor:pointer;
    background: #181d22;
    width: 100px;
    height: 50px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.63);
  }

  .active {
      animation: fadeInAnimation 1s forwards;
  }
  .col-12 {
    display:flex;
    padding-left: 0;
    padding-right:0;
  }

  #dropFileForm #fileLabel {
    background: #2a333c;
    height: 200px;
    width:100%;
    border-radius: 6px;
    border:2px dashed #a8a8a8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    color:#a8a8a8;
  }

  /* #dropFileForm #fileInput {
    display: none !important;
  } */

.textalign {
    text-align: left;
    color: #a8a8a8!important;
    font-weight: 600;
}

.medh{
  height:75%;
}

td {
  border-top:1px solid #d1d1d18a!important; /*table border*/
}

.row-one,
.row-two {
  max-width: 1000px;
}

.labels {
  display: flex;
  justify-content: space-around;
}

.labels p {
  margin-bottom:0;
  font-size: 12px;
}

 .chartdata {
  width:12px;
  height: 12px;
  margin-top:3px;
  margin-right:3px;
}

button.waves {
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  padding: 8px 18px;
  margin: 10px 1px;
  font-size: 14px;
  text-transform: uppercase;
  background: transparent;
  color: rgba(0, 0, 0, 0.87);
  background: #17a2b8;
  color: white;
  letter-spacing: 2px;
  font-weight: normal;
}
button.waves.ripple {
  overflow: hidden;
  position: relative;
  transition: background-color 0.3s linear, border 0.3s linear;
}
button.waves.ripple:after {
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
button.waves.ripple:active:after {
  transform: scale(0);
  opacity: .2;
  transition: 0s;
}
button.waves.default {
  background-color: #17a2b8;
  color: white;
  outline:none;
}

.table-modifier tbody tr td {
  vertical-align: middle;
}

.dropzone {
  background: #212c38;
  border-radius: 5px;
  border: 2px dashed #3285ca;
  -o-border-image: none;
  border-image: none;
  height: 300px;
  width: 400px;
  max-width: 400px;
  margin: 20px 0;
}

@keyframes fadeInAnimation {
    0%   {
      opacity: 0;
       }

    100% {
      opacity: 1;
      }
  }

    @keyframes fadeOutAnimation {
    0%   {
      opacity: 1;
       }

    100% {
      opacity: 0;
      }
  }

  @media screen and (max-width: 1200px) {
  .container-fluid {
    overflow-x: hidden;
    overflow-y:scroll;
  }
}

  @media screen and (min-width: 1200px) and (min-height: 800px) {
  .row-one {
    height: 60%;
  }

  .row-two {
    height: 37%;
  }
}

  @media screen and (max-height: 800px) {
    .container-fluid {
      overflow-y: scroll;
  }
}

@media screen and (max-width:867px) {
    .title-header {
    margin-bottom:10px;
  }
}

@media screen and (max-height:799px){
  .placeholder-card{
  width:100%;
  display:flex;
  justify-content:center;
  height:191px;
  align-items:center;
  }
}

@media screen and (max-width:991px) {
  .table-modifier tbody tr td {
    padding:8px 0;
  }
}


</style>
