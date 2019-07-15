<template>
<div v-if="shouldShow === true">
  <div class="container-fluid">
      <div id="returntwo" @click="closeBtn()" v-bind:class="{ active: show }">
        <span><i class="fas fa-level-up-alt"></i> &nbsp; RETURN</span>
      </div>
  <div class="row" :class="{ animate: isActive }">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3">
        <div class="card">
            <div class="card-body">
                <h4 class="m-b-30 m-t-0 text-center"><span style="font-size:2rem">{{detailTable.unitNumber != 0 ? detailTable.unitNumber : "-"}}</span> {{detailTable.cluster.name != null ? detailTable.cluster.name : "N/A"}}</h4>
                <div class="row">
                    <div class="col-12">
                        <table class="table table-hover table-modifier">
                            <thead>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Level</td>
                                <td class="text-center">{{detailTable.level != 0 ? detailTable.level : "-"}}</td>
                            </tr>
                            <tr>
                                <td>Bedrooms</td>
                                <td class="text-center">{{detailTable.bedrooms != 0 ? detailTable.bedrooms : "-"}}</td>
                            </tr>
                            <tr>
                                <td>Lock Off (keys)</td>
                                <td class="text-center">{{detailTable.nkeys !=0 ? detailTable.nkeys : "-"}}</td>
                            </tr>
                            <tr>
                                <td>Bathrooms</td>
                                <td class="text-center">{{detailTable.bathrooms != 0 ? detailTable.bathrooms : "-"}}</td>
                            </tr>
                            <tr>
                                <td>Interior m2</td>
                                <td class="text-center">{{detailTable.interiorM2 !=0 ? detailTable.interiorM2 : "-"}}</td>
                            </tr>
                            <tr>
                                <td>Exterior m2</td>
                                <td class="text-center">{{detailTable.exteriorM2 != 0 ? detailTable.exteriorM2  : "-"}}</td>
                            </tr>
                            <tr>
                                <td>Total Interior m2</td>
                                <td class="text-center">{{detailTable.totalInteriorM2 != 0 ? detailTable.totalInteriorM2 : "-"}}</td>
                            </tr>
                            <tr>
                                <td>Total m2</td>
                                <td class="text-center">{{detailTable.totalM2Double != 0 ? detailTable.totalM2Double : "-"}}</td>
                            </tr>
                            <tr>
                                <td>$/m2 Interior</td>
                                <td class="text-center">{{toPrice(detailTable.priceInteriorM2 != 0 ? detailTable.priceInteriorM2 : "-")}}</td>
                            </tr>
                            <tr>
                                <td>$/m2 Total</td>
                                <td class="text-center">{{toPrice(detailTable.priceTotalM2 !=0 ? detailTable.priceTotalM2 : "-")}}</td>
                            </tr>
                            <tr>
                                <td>List Price</td>
                                <td class="text-center">${{toPrice(detailTable.priceTotal != 0 ? detailTable.priceTotal : "-")}}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td class="text-center" v-bind:style="{color: getColor }"></slot>{{detailTable.status.name != null ? detailTable.status.name : "N/A"}}</td>
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
                <div class="row overflow">
                    <div class="col-12">
                        <table class="table table-hover table-modifier">
                            <thead>
                            </thead>
                            <tbody>
                            <tr>
                                <td>01</td>
                                <td class="text-center"><span style="color:green;font-weight:bolder">06/15/2019</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td>02</td>
                                <td class="text-center"><span style="color:green;font-weight:bolder">07/15/2019</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td>03</td>
                                <td class="text-center"><span style="color:green;font-weight:bolder">08/15/2019</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td>04</td>
                                <td class="text-center"><span style="color:red;font-weight:bolder">09/15/2019</span></td>
                                <td><i class="far fa-envelope"></i></td>
                            </tr>
                            <tr>
                                <td>05</td>
                                <td class="text-center"><span style="color:red;font-weight:bolder">10/15/2019</span></td>
                                <td><i class="far fa-envelope"></i></td>
                            </tr>
                            <tr>
                                <td>06</td>
                                <td class="text-center">11/15/2019</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>07</td>
                                <td class="text-center">11/15/2019</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>08</td>
                                <td class="text-center">11/15/2019</td>
                                <td></td>
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
                <div class="row overflow">
                    <div class="col-12">
                        <table class="table table-hover table-modifier">
                            <thead>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="text-center"><span style="color:green;font-weight:bolder">Offer letter</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-center"><span style="color:green;font-weight:bolder">Reserve sheet</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-center"><span style="color:green;font-weight:bolder">Reserve deposit</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-center"><span style="color:green;font-weight:bolder">First Draft Contract</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-center"><span style="color:red;font-weight:bolder">Final Contract</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-center"><span style="color:red;font-weight:bolder">ROI Contract</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-center"><span>Official ID</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-center"><span>Proof of Address</span></td>
                                <td><i class="fas fa-file-alt"></i></td>
                            </tr>
                            <tr>
                                <td class="text-center"><span>Payment Checkbooks</span></td>
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
            <div class="row">
              <div class="col-md-12">
                <div class="m-b-30">
                  <form id="dropFileForm" action="#">
                    <input type="file" name="files[]" id="fileInput" multiple>
                    <label for="fileInput" id="fileLabel">
                      Drop files here to upload
                    </label>
                  </form>
                </div>
                <div class="text-center m-t-15" style="margin:26px 0 0 0;">
                  <button type="button" class="btn btn-outline-light">Send Files</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" :class="{ animate: isActive }">
  <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3">
  <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <table class="table table-hover table-modifier">
                            <thead>
                            </thead>
                            <tbody>
                            <tr>
                                <td><b>Sale Price</b></td>
                                <td class="text-center"><b>{{contract.salesprice != 0 ? contract.salesprice : "-"}}</b></td>
                            </tr>
                            <tr>
                                <td>Currency</td>
                                <td class="text-center"><b>{{contract.currency != null ? contract.currency : "N/A"}}</b></td>
                            </tr>
                            <tr>
                                <td>Payment Method</td>
                                <td class="text-center"><b>{{contract.paymentMethod != null ? contract.paymentMethod : "N/A" }}</b></td>
                            </tr>
                            <tr>
                                <td>Exchange Rate</td>
                                <td class="text-center"><b>{{contract.exchangerate != 0 ? contract.exchangerate : "-"}}</b></td>
                            </tr>
                            <tr>
                                <td>Sales Channel</td>
                                <td class="text-center">Internal</td>
                            </tr>
                            <tr>
                                <td>Sales Executive</td>
                                <td class="text-center">Alejandra Ruiz</td>
                            </tr>
                            <tr>
                                <td>Customer</td>
                                <td class="text-center">Mayabmex</td>
                            </tr>
                            <tr>
                                <td>Man Comm</td>
                                <td class="text-center"><span style="color:red;font-weight:bolder">{{contract.commission.managementCommissions}}%</span></td>
                            </tr>
                            <tr>
                                <td>Sales Ex Comm</td>
                                <td class="text-center"><span style="color:red;font-weight:bolder">{{contract.commission.salesExecutivesCommissions}}%</span></td>
                            </tr>
                            <tr>
                                <td>Sales Adm/Comm</td>
                                <td class="text-center"><span style="color:green;font-weight:bolder">{{contract.commission.salesAdministrativeCommissions}}%</span></td>
                            </tr>
                            <tr>
                                <td>3rd Party Comm</td>
                                <td class="text-center"><span style="color:green;font-weight:bolder">{{contract.commission.thirdPartyCommissions}}%</span></td>
                            </tr>
                            <tr>
                                <td>Broker Comm</td>
                                <td class="text-center"><span style="color:green;font-weight:bolder">{{contract.commission.brokerCommissions}}%</span></td>
                            </tr>
                            <tr>
                                <td>Total Comm</td>
                                <td class="text-center">$ {{contract.commission.totalCommissions != 0 ? contract.commission.totalCommissions : getTotalCommission}}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td class="text-center" v-bind:style="{color: getColor }">{{contract.commission.status.name}}</td>
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
              <div class="row">
                  <div class="col-12">
                      <table class="table table-hover table-modifier">
                          <thead>
                              <h5 class="m-b-30 m-t-0 text-left">ROI</h5>
                          </thead>
                          <tbody>
                          <tr>
                              <td>ROI</td>
                              <td class="text-center">{{contract.WROI != null ? contract.WROI : "N/A"}}</td>
                          </tr>
                          <tr>
                              <td>ROI %</td>
                              <td class="text-center">{{contract.percent != 0 ? contract.percent : "-"}}</td>
                          </tr>
                          <tr>
                              <td>Years</td>
                              <td class="text-center">{{contract.years != 0 ? contract.years : "-"}}</td>
                          </tr>
                          <tr>
                              <td>Closing Date</td>
                              <td class="text-center">{{contract.closingDate != 0 ? contract.closingDate : "-"}}</td>
                          </tr>
                          <tr>
                              <td>Renewal years</td>
                              <td class="text-center">{{contract.years != 0 ? contract.years : "-"}} </td>
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
            <div class="row">
              <div class="col-12" style="flex-direction:column;">
                <h4 class="m-t-0 m-b-30 text-left">AVAILABILITY</h4>
                  <chartjs-doughnut
                  v-bind:labels="labels"
                  v-bind:datasets="datasets"
                  v-bind:option="option"
                  :width="mywidth"
                  :height="myheight"
                   ></chartjs-doughnut>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3">
        <div class="card">
          <div class="card-body" style="display:flex; flex-direction:column;">
            <h4 class="m-t-0 m-b-30 text-left" style="flex-grow:3;">SALES</h4>
              <chartjs-bar :beginzero="myboolean" :backgroundcolor="mybackgroundcolor" :bordercolor="mybordercolor"  :datalabel="mylabel" :labels="mylabels" :data="mydata" v-bind:option="myoption" style="flex-grow:3;">
      </chartjs-bar>
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

export default {
  mounted: function() {
    this.$eventHub.$on("show-detailTable-detail-tower-modal", details => {
      this.detailTable = details.detailUnit;
      this.contract = details.detailContract;
      this.show = true;
      console.log (details);
    });
  },
  components: {
    returnPage
  },
  data() {
    return {
      mywidth: 300,
      myheight: 300,
      show: false,
      isActive: true,
      detailTable: {},
      contract: {},
      labels: ["Available", "Reserved", "Sold"],
      datasets: [{
        data:[3,15,30],
        backgroundColor:["#A6A867", "#E3DC95", "#E3DCC2"],
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
      'rgba(181, 255, 225, 0.50)',
      'rgba(181, 255, 225, 0.50)',
      'rgba(181, 255, 225, 0.50)',
      'rgba(181, 255, 225, 0.50)',
      'rgba(181, 255, 225, 0.50)'
      ],
    mybordercolor : [
      'rgba(181, 255, 225, 0.50)',
      'rgba(181, 255, 225, 0.50)',
      'rgba(181, 255, 225, 0.50)',
      'rgba(181, 255, 225, 0.50)',
      'rgba(181, 255, 225, 0.50)'
      ],
    mylabel : 'Sales',
    mylabels : ['January', 'February', 'March', 'June', 'July'],
    mydata : [14, 11, 7, 7 , 9],
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
              fontColor:'white',
              beginAtZero:true
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
      this.show = false;
    },
    toPrice(x) {
      var r = x.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      return r;
    }
  },
  computed: {
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

      return this.contract.salesprice * percent
    }
  }
}
</script>

<style>

  @import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

  body {
    background: #516f4d!important;
  }

    .container-fluid {
    text-align:center;
    background:#2a333c;
    height: 100%;
    position:fixed;
    top:47px;
    left:0;
    z-index:1;
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

  .table th, .table td {
    padding:0!important;
  }
  #returntwo {
    color: white;
    position: fixed;
    right: 60px;
    bottom:40px;
    z-index: 30;
    cursor:pointer;
    background: #a7a7a7;
    width: 150px;
    height: 50px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.63);
  }

  #returntwo:hover {
    transform: transa
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
    border:2px dashed #f6fff7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
  }

#dropFileForm #fileInput {
  display: none
}

  @keyframes fadeInAnimation {
    0%   {
      opacity: 0;
      transform: translateY(-5px);
       }

    40%   {
      opacity: 0;
      transform: translateY(-5px);
       }

    100% {
      opacity: 1;
      transform: translateY(5px);
      }
  }

  @media screen and (max-width: 1200px) {
  .container-fluid {
    overflow-x: hidden;
    overflow-y:scroll;
  }
}




</style>
