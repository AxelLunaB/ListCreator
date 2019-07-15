<template>
  <div v-if="shouldShow === true">
    <div class="container-fluid">
      <div id="returntwo" @click="closeBtn()" :class="{ animate: isActive }">
      <span><i class="fas fa-reply" style="color:white;"></i>&nbsp;Return</span>
      </div>
        <div class="row row-one" :class="{ animate: isActive }">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3">
          <div class="card">
            <div class="card-body">
            <h4 class="m-b-30 m-t-0 text-center"><span style="font-size:2rem">{{detailTable.unitNumber != 0 ? detailTable.unitNumber : "-"}}</span> {{detailTable.cluster.name != null ? detailTable.cluster.name : "N/A"}}</h4>
              <div class="row fullh">
                <div class="col-12">
                  <table class="table table-hover table-modifier fullh">
                    <thead>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="txt-card">Level</td>
                        <td class="text-center">{{detailTable.level != 0 ? detailTable.level : "-"}}</td>
                      </tr>
                      <tr>
                        <td class="txt-card">Bedrooms</td>
                        <td class="text-center">{{detailTable.bedrooms != 0 ? detailTable.bedrooms : "-"}}</td>
                      </tr>
                      <tr>
                        <td class="txt-card">Lock Off (keys)</td>
                        <td class="text-center">{{detailTable.nkeys !=0 ? detailTable.nkeys : "-"}}</td>
                      </tr>
                      <tr>
                        <td class="txt-card">Bathrooms</td>
                        <td class="text-center">{{detailTable.bathrooms != 0 ? detailTable.bathrooms : "-"}}</td>
                      </tr>
                      <tr>
                        <td class="txt-card">Interior m2</td>
                        <td class="text-center">{{detailTable.interiorM2 !=0 ? detailTable.interiorM2 : "-"}}</td>
                      </tr>
                      <tr>
                        <td class="txt-card">Exterior m2</td>
                        <td class="text-center">{{detailTable.exteriorM2 != 0 ? detailTable.exteriorM2  : "-"}}</td>
                      </tr>
                      <tr>
                        <td class="txt-card">Total Interior m2</td>
                        <td class="text-center">{{detailTable.totalInteriorM2 != 0 ? detailTable.totalInteriorM2 : "-"}}</td>
                      </tr>
                      <tr>
                        <td class="txt-card">Total m2</td>
                        <td class="text-center">{{detailTable.totalM2Double != 0 ? detailTable.totalM2Double : "-"}}</td>
                      </tr>
                      <tr>
                        <td class="txt-card">$/m2 Interior</td>
                        <td class="text-center">{{toPrice(detailTable.priceInteriorM2 != 0 ? detailTable.priceInteriorM2 : "-")}}</td>
                      </tr>
                      <tr>
                        <td class="txt-card">$/m2 Total</td>
                        <td class="text-center">{{toPrice(detailTable.priceTotalM2 !=0 ? detailTable.priceTotalM2 : "-")}}</td>
                      </tr>
                      <tr>
                        <td class="txt-card">List Price</td>
                        <td class="text-center">${{toPrice(detailTable.priceTotal != 0 ? detailTable.priceTotal : "-")}}</td>
                      </tr>
                      <tr>
                        <td  class="txt-card">Status</td>
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
              <div class="row overflow fullh">
                <div class="col-12">
                  <table class="table table-hover table-modifier fullh">
                    <thead>
                    </thead>
                      <tbody>
                        <tr>
                          <td class="txt-card">01</td>
                          <td class="text-center"><span style="color:#35ce41;">06/15/2019</span></td>
                          <td><i class="far fa-list-alt"></i></td>
                        </tr>
                        <tr>
                          <td class="txt-card">02</td>
                          <td class="text-center"><span style="color:#35ce41;">07/15/2019</span></td>
                          <td><i class="far fa-list-alt"></i></td>
                        </tr>
                        <tr>
                          <td class="txt-card">03</td>
                          <td class="text-center"><span style="color:#35ce41;">08/15/2019</span></td>
                          <td><i class="far fa-list-alt"></i></td>
                        </tr>
                        <tr>
                          <td class="txt-card">04</td>
                          <td class="text-center"><span style="color:#cd110f;">09/15/2019</span></td>
                          <td><i class="far fa-envelope"></i></td>
                        </tr>
                        <tr>
                          <td class="txt-card">05</td>
                          <td class="text-center"><span style="color:#cd110f;">10/15/2019</span></td>
                          <td><i class="far fa-envelope"></i></td>
                        </tr>
                        <tr>
                          <td class="txt-card">06</td>
                          <td class="text-center">11/15/2019</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td class="txt-card">07</td>
                          <td class="text-center">11/15/2019</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td class="txt-card">08</td>
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
                <div class="row overflow fullh">
                  <div class="col-12">
                    <table class="table table-hover table-modifier fullh">
                      <thead>
                      </thead>
                        <tbody>
                          <tr>
                            <td class="text-center"><span style="color:#35ce41;">Offer letter</span></td>
                            <td><i class="far fa-list-alt"></i></td>
                          </tr>
                          <tr>
                            <td class="text-center"><span style="color:#35ce41;">Reserve sheet</span></td>
                            <td><i class="far fa-list-alt"></i></td>
                          </tr>
                          <tr>
                            <td class="text-center"><span style="color:#35ce41;">Reserve deposit</span></td>
                            <td><i class="far fa-list-alt"></i></td>
                          </tr>
                          <tr>
                            <td class="text-center"><span style="color:#35ce41;">First Draft Contract</span></td>
                            <td><i class="far fa-list-alt"></i></td>
                          </tr>
                          <tr>
                            <td class="text-center"><span style="color:#cd110f;">Final Contract</span></td>
                            <td><i class="far fa-list-alt"></i></td>
                          </tr>
                          <tr>
                            <td class="text-center"><span style="color:#cd110f;">ROI Contract</span></td>
                            <td><i class="far fa-list-alt"></i></td>
                          </tr>
                          <tr>
                            <td class="text-center"><span>Official ID</span></td>
                            <td><i class="far fa-list-alt"></i></td>
                          </tr>
                          <tr>
                            <td class="text-center"><span>Proof of Address</span></td>
                            <td><i class="far fa-list-alt"></i></td>
                          </tr>
                          <tr>
                            <td class="text-center"><span>Payment Checkbooks</span></td>
                            <td><i class="far fa-list-alt"></i></td>
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
              <div class="row fullh">
                <div class="col-md-12" style="display:flex;flex-direction:column;justify-content:space-around;">
                  <div class="m-b-30">
                    <form action="#">
                      <div class="fallback">
                        <input name="file" type="file" multiple="multiple" class="send">
                      </div>
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
        <div class="row row-two" :class="{ animate: isActive }">
          <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 fullh">
            <div class="card">
              <div class="card-body">
                <div class="row fullh">
                  <div class="col-12">
                  <table class="table table-hover table-modifier fullh">
                    <thead>
                    </thead>
                    <tbody>
                      <!-- <tr>
                      <td><b>Sale Price</b></td>
                      <td class="text-center"><b>{{contract.salesprice != 0 ? contract.salesprice : "-"}}</b></td>
                      </tr> -->
                      <tr>
                        <td style="border-top:none;"  class="txt-card">Currency</td>
                        <td class="text-center" style="border-top:none;"><b>{{contract.currency != null ? contract.currency : "N/A"}}</b></td>
                      </tr>
                      <!-- <tr>
                      <td>Payment Method</td>
                      <td class="text-center"><b>{{contract.paymentMethod != null ? contract.paymentMethod : "N/A" }}</b></td>
                      </tr> -->
                      <!-- <tr>
                      <td>Exchange Rate</td>
                      <td class="text-center"><b>{{contract.exchangerate != 0 ? contract.exchangerate : "-"}}</b></td>
                      </tr> -->
                      <tr>
                        <td class="txt-card">Sales Channel</td>
                        <td class="text-center">Internal</td>
                      </tr>
                      <tr>
                        <td class="txt-card">Sales Executive</td>
                        <td class="text-center">Alejandra Ruiz</td>
                      </tr>
                      <tr>
                        <td class="txt-card">Customer</td>
                        <td class="text-center">Mayabmex</td>
                      </tr>
                      <tr>
                        <td class="txt-card">Man Comm</td>
                        <td class="text-center"><span style="color:#cd110f;">2%</span></td>
                      </tr>
                      <tr>
                        <td class="txt-card">Sales Ex Comm</td>
                        <td class="text-center"><span style="color:#cd110f;">5%</span></td>
                      </tr>
                      <tr>
                        <td class="txt-card">Sales Adm/Comm</td>
                        <td class="text-center"><span style="color:#35ce41;">3%</span></td>
                      </tr>
                        <tr>
                          <td class="txt-card">Total Comm</td>
                          <td class="text-center">$16,900</td>
                      </tr>
                    </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 fullh">
            <div class="card">
              <div class="card-body">
                <div class="row fullh">
                  <div class="col-12">
                    <table class="table table-hover table-modifier fullh">
                      <thead>
                        <h5 class="m-b-30 m-t-0 text-left">ROI</h5>
                      </thead>
                      <tbody>
                      <tr>
                        <td class="txt-card">ROI</td>
                        <td class="text-center">{{contract.WROI != null ? contract.WROI : "N/A"}}</td>
                      </tr>
                      <tr>
                        <td class="txt-card">ROI %</td>
                        <td class="text-center">{{contract.percent != 0 ? contract.percent : "-"}}</td>
                      </tr>
                      <tr>
                        <td class="txt-card">Years</td>
                        <td class="text-center">{{contract.years != 0 ? contract.years : "-"}}</td>
                      </tr>
                      <tr>
                        <td class="txt-card">Closing Date</td>
                        <td class="text-center">{{contract.closingDate != 0 ? contract.closingDate : "-"}}</td>
                      </tr>
                      <tr>
                        <td class="txt-card">Renewal years</td>
                        <td class="text-center">{{contract.years != 0 ? contract.years : "-"}} </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
              </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 fullh">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-12" style="display:flex;flex-direction:column; align-items:center;">
                    <h5 class="m-t-0 m-b-30 text-left">AVAILABILITY</h5>
                    <div class="chart-container">
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
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 fullh">
            <div class="card">
              <div class="card-body">
                <h5 class="m-t-0 m-b-30 text-left">SALES</h5>
                <div class="chart-container-bars">
                  <chartjs-bar
                  :beginzero="myboolean"
                  :backgroundcolor="mybackgroundcolor"
                  :bordercolor="mybordercolor"
                  :datalabel="mylabel"
                  :labels="mylabels"
                  :data="mydata"
                  v-bind:option="myoption">
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
      mywidth: 2,
      myheight: 2,
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
      }
      else {
        return  'ffffff'
      }
    }
  }
}
</script>

<style>

  @import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

  /* body {
    background: #2a333c!important;
  } */

    .container-fluid {
    text-align:center;
    background:#2a333c;
    position:fixed;
    top:67px;
    left:0;
    z-index:1;
    height: 100%;
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
    margin-bottom:0!important;
  }

  .table-modifier  tbody tr td {
    color:white;
  }

  .card .card-body h4,
  .card .card-body h5 {
    color:white;
  }

  .card-body {
    padding:10px;
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
    right: 20px;
    bottom:20px;
    z-index: 30;
    cursor:pointer;
    background:#a7a7a7;
    border-radius: 5px;
    width:100px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items:center;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.60);
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
    background: #516f4d;
    height: 200px;
    width:100%;
    border-radius: 6px;
    border:2px dashed rgb(246, 255, 247);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
  }

#dropFileForm #fileInput {
  display: none
}
  .txt-card {
    text-align:left;
    color:#a0a0a0!important;
    font-weight:600;
  }

  .fullh {
    height:97%;
  }

  .row-one,
  .row-two {
    max-width: 1800px;
    margin: 0 auto!important;
  }

  .chart-container {
    width:250px;
  }

  .chart-container-bars {
    margin-bottom:50px;
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
    overflow-x: scroll;
  }
}

  @media screen and (min-width: 1200px) {
  .row-one {
    height: 56%;
  }

  .row-two {
    height:35%;
  }
}

</style>
