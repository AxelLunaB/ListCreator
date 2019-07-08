<template>
<div v-if="shouldShow === true">
  <div class="container-fluid">
      <div id="returntwo" @click="closeBtn()">
        <i class="fas fa-times fa-2x"></i>
      </div>
  <div class="row mobile-fix " :class="{ animate: isActive }">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3">
        <div class="card">
            <div class="card-body">
                <h4 class="m-b-30 m-t-0 text-left"><span style="font-size:2rem">{{detailTable.unitNumber}}</span> BRAVA TOWERS</h4>
                <div class="row">
                    <div class="col-12">
                        <table class="table table-hover table-modifier">
                            <thead>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Level</td>
                                <td class="text-center">{{detailTable.level}}</td>
                            </tr>
                            <tr>
                                <td>Bedrooms</td>
                                <td class="text-center">{{detailTable.bedrooms}}</td>
                            </tr>
                            <tr>
                                <td>Lock Off (keys)</td>
                                <td class="text-center">{{detailTable.nkeys}}</td>
                            </tr>
                            <tr>
                                <td>Bathrooms</td>
                                <td class="text-center">{{detailTable.bathrooms}}</td>
                            </tr>
                            <tr>
                                <td>Interior m2</td>
                                <td class="text-center">{{detailTable.interiorM2}}</td>
                            </tr>
                            <tr>
                                <td>Exterior m2</td>
                                <td class="text-center">{{detailTable.exteriorM2}}</td>
                            </tr>
                            <tr>
                                <td>Total Interior m2</td>
                                <td class="text-center">{{detailTable.totalInteriorM2}}</td>
                            </tr>
                            <tr>
                                <td>Total m2</td>
                                <td class="text-center">{{detailTable.totalM2Double}}</td>
                            </tr>
                            <tr>
                                <td>$/m2 Interior</td>
                                <td class="text-center">{{toPrice(detailTable.priceInteriorM2)}}</td>
                            </tr>
                            <tr>
                                <td>$/m2 Total</td>
                                <td class="text-center">{{toPrice(detailTable.priceTotalM2)}}</td>
                            </tr>
                            <tr>
                                <td>List Price</td>
                                <td class="text-center">${{toPrice(detailTable.priceTotal)}}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td class="text-center"><b>{{detailTable.status}}</b></td>
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
                                <td class="text-center"><b>{{contract.salesprice}}</b></td>
                            </tr>
                            <tr>
                                <td>Currency</td>
                                <td class="text-center"><b>{{contract.currency}}</b></td>
                            </tr>
                            <tr>
                                <td>Payment Method</td>
                                <td class="text-center"><b>{{contract.paymentMethod}}</b></td>
                            </tr>
                            <tr>
                                <td>Exchange Rate</td>
                                <td class="text-center"><b>{{contract.exchangerate}}</b></td>
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
                                <td class="text-center"><span style="color:red;font-weight:bolder">2%</span></td>
                            </tr>
                            <tr>
                                <td>Sales Ex Comm</td>
                                <td class="text-center"><span style="color:red;font-weight:bolder">5%</span></td>
                            </tr>
                            <tr>
                                <td>Sales Adm/Comm</td>
                                <td class="text-center"><span style="color:green;font-weight:bolder">3%</span></td>
                            </tr>
                            <tr>
                                <td>Total Comm</td>
                                <td class="text-center">$16,900</td>
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
                              <td class="text-center">{{contract.WROI}}</td>
                          </tr>
                          <tr>
                              <td>ROI %</td>
                              <td class="text-center">{{contract.percent}}</td>
                          </tr>
                          <tr>
                              <td>Years</td>
                              <td class="text-center">{{contract.years}}</td>
                          </tr>
                          <tr>
                              <td>Closing Date</td>
                              <td class="text-center">{{contract.closingDate}}</td>
                          </tr>
                          <tr>
                              <td>Renewal years</td>
                              <td class="text-center">{{contract.years}} </td>
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
                <h4 class="m-t-0 m-b-30 text-left">AVAILABILITY</h4>
                <canvas id="doughnut" height="260"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3">
        <div class="card">
          <div class="card-body">
            <h4 class="m-t-0 m-b-30 text-left">SALES</h4>
            <canvas id="bar" height="300"></canvas>
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
      show: false,
      isActive: true,
      detailTable: {},
      contract: {}
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
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:space-evenly;
    text-align:center;
    background:#516f4d;
    height: 100%;
    position:fixed;
    top:47px;
    left:0;
    z-index:1;
  }

  .card {
    background:#6a8e67!important;
    margin:10px;
    flex:1;
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
    left: 40px;
    top:80px;
    z-index: 30;
    cursor:pointer;
  }

  .col-12 {
    display:flex;
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

@media screen and (min-width: 769px) and (max-width: 1200px) {
      .mobile-fix {
    padding-top: 400px;
  }
}

@media screen and (min-width: 411px) and (max-width: 768px) {
      .mobile-fix {
    padding-top: 2027px;
  }
}

@media screen and (min-width: 321px) and (max-width: 512px) {
      .mobile-fix {
    padding-top: 2300px;
  }
}

  @media screen and (max-width: 320px) {
      .mobile-fix {
    padding-top: 2600px;
  }
}




</style>
