<template>
<div v-if="shouldShow === true" id="fadeOutAnimation">
  <div class="container-fluid" v-bind:class="{ active: show}">
      <div id="returntwo" @click="closeBtn()">
        <span><i class="fas fa-level-up-alt"></i> &nbsp; RETURN</span>
      </div>
  <div class="row row-one" :class="{ animate: isActive }" style="margin:0 auto;">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3">
        <div class="card">
            <div class="card-body">
                <h4 class="m-b-30 m-t-0 text-center"><span style="font-size:2rem">{{detailTable.unitNumber != 0 ? detailTable.unitNumber : "-"}}</span> {{detailTable.cluster.name != null ? detailTable.cluster.name : '-'}}</h4>
                <div class="row fullh">
                    <div class="col-12">
                        <table class="table table-hover table-modifier fullh">
                            <thead>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="textalign">Level</td>
                                <td class="text-right">{{detailTable.level != 0 ? detailTable.level : "-"}}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Bedrooms</td>
                                <td class="text-right">{{detailTable.bedrooms != 0 ? detailTable.bedrooms : "-"}}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Lock Off (keys)</td>
                                <td class="text-right">{{detailTable.nkeys !=0 ? detailTable.nkeys : "-"}}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Bathrooms</td>
                                <td class="text-right">{{detailTable.bathrooms != 0 ? detailTable.bathrooms : "-"}}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Interior m2</td>
                                <td class="text-right">{{detailTable.interiorM2 !=0 ? detailTable.interiorM2 : "-"}}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Exterior m2</td>
                                <td class="text-right">{{detailTable.exteriorM2 != 0 ? detailTable.exteriorM2  : "-"}}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Total Interior m2</td>
                                <td class="text-right">{{detailTable.totalInteriorM2 != 0 ? detailTable.totalInteriorM2 : "-"}}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Total m2</td>
                                <td class="text-right">{{detailTable.totalM2Double != 0 ? detailTable.totalM2Double : "-"}}</td>
                            </tr>
                            <tr>
                                <td class="textalign">$/m2 Interior</td>
                                <td class="text-right">{{toPrice(detailTable.priceInteriorM2 != 0 ? detailTable.priceInteriorM2 : "-")}}</td>
                            </tr>
                            <tr>
                                <td class="textalign">$/m2 Total</td>
                                <td class="text-right">{{toPrice(detailTable.priceTotalM2 !=0 ? detailTable.priceTotalM2 : "-")}}</td>
                            </tr>
                            <tr>
                                <td class="textalign">List Price</td>
                                <td class="text-right">${{toPrice(detailTable.priceTotal != 0 ? detailTable.priceTotal : "-")}}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Status</td>
                                <td class="text-center" v-bind:style="{color: getColor }"><slot></slot>{{detailTable.status.name != null ? detailTable.status.name : '-'}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3">
  <div class="card">
            <div class="card-body">
                <h5 class="m-b-30 m-t-0 text-left">PAYMENTS</h5>
                <div class="row fullh">
                    <div class="col-12">
                        <table class="table table-hover table-modifier fullh">
                            <thead>
                            </thead>
                            <tbody>
                            <tr  v-for="(u,index) in (contract.payments ? contract.payments.paymentsDetails : 12)" :key="u.id">
                                <td class="textalign">{{contract.payments ? u.paymentNo : index +1}}</td>
                                <td class="text-center"><span v-bind:style="{color:contract.payments ? u.status.color_hex : 'white'}">{{contract.payments ? u.dueDate : '-'}}</span></td>
                                <td class ="text-right"><i class="fas fa-file-alt"></i></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3">
  <div class="card">
            <div class="card-body">
                <h5 class="m-b-30 m-t-0 text-left">DOCUMENTS</h5>
                <div class="row fullh">
                    <div class="col-12">
                        <table class="table table-hover table-modifier fullh">
                            <thead>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="text-left"><span style="color:green;font-weight:bolder;text-align:left;">Offer letter</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-left"><span style="color:green;font-weight:bolder">Reserve sheet</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-left"><span style="color:green;font-weight:bolder">Reserve deposit</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-left"><span style="color:green;font-weight:bolder">First Draft Contract</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-left"><span style="color:red;font-weight:bolder">Final Contract</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-left"><span style="color:red;font-weight:bolder">ROI Contract</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-left"><span>Official ID</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-left"><span>Proof of Address</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-left"><span>-</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-left"><span>-</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-left"><span>-</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-left"><span>-</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-left"><span>-</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3">
        <div class="card">
          <div class="card-body">
            <h5 class="m-b-30 m-t-0 text-left">UPLOAD DOCUMENTS</h5>
            <div class="row" style="height:100%;">
              <div class="col-md-12" style="display:flex;flex-direction:column;justify-content:space-around;">
                <div class="m-b-30">
                  <form id="dropFileForm" action="#">
                    <input type="file" name="files[]" id="fileInput" multiple>
                    <label for="fileInput" id="fileLabel">
                      Drop files here to upload
                    </label>
                  </form>
                </div>
                <div class="text-center m-t-15" style="margin:26px 0 0 0;">
                  <button type="button" class="btn btn-info">Send Files</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row row-two" :class="{ animate: isActive }"  style="margin:0 auto;">
  <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3" style="height:100%;">
  <div class="card">
            <div class="card-body">
                <div class="row" style="height:100%;">
                    <div class="col-12">
                        <table class="table table-hover table-modifier" style="height:95%;margin-bottom:0;">
                            <thead>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="textalign" style="border:none!important;">Currency</td>
                                <td class="text-right" style="border:none!important"><b>{{contract.currency != null ? contract.currency : '-'}}</b></td>
                            </tr>
                            <tr>
                                <td class="textalign">Sales Channel</td>
                                <td class="text-right">{{contract.salesDetails != undefined ? contract.salesDetails.salesChannel != null ? contract.salesDetails.salesChannel : '-' : '-' }}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Sales Executive</td>
                                <td class="text-right">{{contract.commission.executive != undefined ? contract.commission.executive.name != null ? contract.commission.executive.name : '-' : '-' }}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Customer</td>
                                <td class="text-right">{{contract.customer !=undefined ? contract.customer.name != null? contract.customer.name : '-' : '-'}}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Man Comm</td>
                                <td class="text-right"><span style="color:red;font-weight:bolder">{{contract.commission.managementCommissions != null ? contract.commission.managementCommissions + ' %' : '-'}}</span></td>
                            </tr>
                            <tr>
                                <td class="textalign">Sales Ex Comm</td>
                                <td class="text-right"><span style="color:red;font-weight:bolder">{{contract.commission.salesExecutivesCommissions != null ? contract.commission.salesExecutivesCommissions + ' %' : '-'}}</span></td>
                            </tr>
                            <tr>
                                <td class="textalign">Sales Adm/Comm</td>
                                <td class="text-right"><span style="color:green;font-weight:bolder">{{contract.commission.salesAdministrativeCommissions != null ? contract.commission.salesAdministrativeCommissions + ' %' : '-'}}</span></td>
                            </tr>
                            <tr>
                                <td class="textalign">Total Comm</td>
                                <td class="text-right">{{contract.commission.totalCommissions != 0 && contract.commission.totalCommissions != null ? '$ ' + contract.commission.totalCommissions : getTotalCommission}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3" style="height:100%;">
      <div class="card">
          <div class="card-body">
              <div class="row" style="height:100%">
                  <div class="col-12">
                      <table class="table table-hover table-modifier" style="height:100%">
                          <thead>
                              <h5 class="m-b-30 m-t-0 text-left">ROI</h5>
                          </thead>
                          <tbody>
                          <tr>
                              <td class="textalign">ROI</td>
                              <td class="text-right">{{contract.WROI != null ? contract.WROI : '-'}}</td>
                          </tr>
                          <tr>
                              <td class="textalign">ROI %</td>
                              <td class="text-right">{{contract.percent != 0 && contract.percent != null ? contract.percent : "-"}}</td>
                          </tr>
                          <tr>
                              <td class="textalign">Years</td>
                              <td class="text-right">{{contract.years != 0 && contract.years != null ? contract.years : "-"}}</td>
                          </tr>
                          <tr>
                              <td class="textalign">Closing Date</td>
                              <td class="text-right">{{contract.closingDate != 'null' && contract.closingDate != null ? contract.closingDate : "-"}}</td>
                          </tr>
                          <!-- <tr>
                              <td class="textalign">Renewal</td>
                              <td class="text-center">{{contract.years != 0 && contract.percent != null ? contract.years : "-"}} </td>
                          </tr>
                          <tr>
                              <td class="textalign">Renewal years</td>
                              <td class="text-center">{{contract.years != 0 ? contract.years : "-"}} </td>
                          </tr> -->
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3" style="height:100%;">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12" style="flex-direction:column;">
                <h5 class="m-t-0 m-b-30 text-left">AVAILABILITY</h5>
                <div style="width:100%;display:flex;justify-content:center;">()
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
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3" style="height:100%;">
        <div class="card">
          <div class="card-body" style="display:flex; flex-direction:column;">
            <h5 class="m-t-0 m-b-30 text-left">SALES</h5>
          <div style="width:100%;display:flex;justify-content:center;height:100%;align-items:center;">
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

import returnPage from "./returnPage.vue";
import swal from "sweetalert";
import { mapGetters } from "vuex";

export default {
  mounted: function() {
    this.$eventHub.$on("show-detailTable-detail-tower-modal", details => {
      this.detailTable = details.detailUnit;
      this.contract = details.detailContract;
      this.show = true;
    });
  },
  components: {
    returnPage
  },
  data() {
    return {
      mywidth: 200,
      myheight: 200,
      show: false,
      isActive: true,
      detailTable: {},
      contract: {},
      labels: ["Available", "Reserved", "Sold"],
      datasets: [{
        data:[1,2,3],
        backgroundColor:["rgb(5,162,179)", "rgb(235,239,242)", "rgb(0,163,254)"]
      }],
      option: {
        title: {
          display:false,
          responsive:false,
        },
        legend: {
          position:'bottom',
          labels: {
            fontColor:'white'
          }
        },
      },
    myboolean : true,
    mybackgroundcolor : [
      'rgba(56,144,184)',
      'rgba(56,144,184)',
      'rgba(56,144,184)',
      'rgba(56,144,184)',
      'rgba(56,144,184)'
      ],
    mybordercolor : [
      'rgba(56,144,184)',
      'rgba(56,144,184)',
      'rgba(56,144,184)',
      'rgba(56,144,184)',
      'rgba(56,144,184)'
      ],
    mylabel : 'Sales',
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
              max:10,
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
    }
  },
  computed: {
    ...mapGetters({
          cAvailability: "departments/currentAvailability",
      }),
    shouldShow() {
      return this.show;
    },
    getColor() {
      if (this.detailTable.status.color_hex) {
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
      let percent = this.contract.commission.managementCommissions +
                    this.contract.commission.salesAdministrativeCommissions +
                    this.contract.commission.brokerCommissions +
                    this.contract.commission.salesExecutivesCommissions +
                    this.contract.commission.thirdPartyCommissions
      percent = percent / 100

      return this.contract.salesprice > 0 ? '$ ' + (this.contract.salesprice * percent).toFixed(2) : '-';
    },
    dynamicChart () {
      this.datasets[0].data[0] = this.cAvailability.available
      this.datasets[0].data[1] = this.cAvailability.reserved
      this.datasets[0].data[2] = this.cAvailability.sold
      return this.datasets
    },
    pastMonths(){ //prints current Month + last 3 months. If current month = January then last month loops to december.
      var monthName = m => new Date(0, m).toLocaleString('en-US', { month: 'long' })
      var month = new Date().getMonth();
      var c = (monthName(month))
      var lastMonth = (monthName(month-1))
      var PenMonth = (monthName(month-2))
      var anteMonth = (monthName(month-3))
      return [anteMonth,PenMonth,lastMonth,c]
    }
    ,
    dynamicBar(){
      this.mydata[0] = 4 //add dynamic data in this array
      this.mydata[1] = 2
      this.mydata[2] = 3
      this.mydata[3] = 1

      return this.mydata
    }
  }
}
</script>

<style>

  @import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

  body {
    background: #2a333c!important;
  }

    .container-fluid {
    text-align:center;
    background:#2a333c;
    height: 100%;
    position:fixed;
    top:47px;
    left:0;
    z-index:2;
    max-height: 97vh;
    padding-top: 18px;
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
    width: 150px;
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

#dropFileForm #fileInput {
  display: none
}

.textalign {
    text-align: left;
    color: #a8a8a8!important;
    font-weight: 600;
}

.fullh {
  height:95%;
}

td {
  border-top:1px solid #a8a8a896!important;
}

.row-one,
.row-two {
  max-width: 1600px;
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

</style>
