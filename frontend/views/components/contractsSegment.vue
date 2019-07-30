<template>
<div v-if="shouldShow === true" id="fadeOutAnimation">
  <div class="container-fluid" v-bind:class="{ active: show}" id="container-fluid" style="height:95%">
      <div id="returntwo" @click="closeBtn()">
        <span><i class="fas fa-level-up-alt"></i> &nbsp; RETURN</span>
      </div>
  <div class="row row-full" :class="{ animate: isActive }" style="margin:0 auto;">
      <div class="col-sm-0 col-md-1 col-lg-1 col-xl-3">
      </div>
      <div class="col-sm-12 col-md-10 col-lg-10 col-xl-6" style="display:flex;align-items:center;">
        <div class="card">
            <div class="card-body">
              <h4 class="page-title">Contract Application</h4>
              <div class="form-group" role="form">
              <div class="row">
                <div class="col-lg-3">
                  <!-- <label class="control-label" for="label-executive"><p>Development</p></label> -->
                  <b-dropdown id="dropdown-clusters" name="drop-clusters" :text="formData.sCluster == null ? 'Select development' : formData.sCluster" class="m-md-2">
                  <b-dropdown-item v-for="option in clusters" :key="option.id" :value="option.id" @click="setData('sCluster',option.name)">{{option.name}} </b-dropdown-item>
                  </b-dropdown>
                </div>

                <div class="col-lg-3">
                  <!-- <label class="control-label" for="label-executive">Executive</label> -->
                  <b-dropdown id="dropdown-executives" name="drop-executive" :text="formData.sExecutive == null ? 'Select executive' : formData.sExecutive" class="m-md-2">
                  <b-dropdown-item v-for="option in executives" :key="option.id" :value="option.id"  @click="setData('sExecutive',option.name)">{{option.name}}</b-dropdown-item>
                  </b-dropdown>
                </div>

                <div class="col-lg-3">
                  <!-- <label class="control-label" for="label-executive"><p>Unit</p></label> -->
                  <b-dropdown id="dropdown-unit" name="drop-unit" :text="formData.sUnit == null ? 'Select Unit' : formData.sUnit" class="m-md-2">
                  <b-dropdown-item v-for="option in getAvailableDepartments" :key="option.id" :value="option.id" @click="setData('sUnit',option.unitNumber);setUnitPrice(option.priceTotal)">{{option.unitNumber}} </b-dropdown-item>
                  </b-dropdown>
                </div>
                <div class="col-lg-3">
                  <!-- <label class="control-label" for="label-executive"><p>Currency</p></label> -->
                  <b-dropdown id="dropdown-currency" name="drop-currency" :text="formData.sCurrency == null ? 'Select currency' : formData.sCurrency" class="m-md-2">
                  <b-dropdown-item value="USD" @click="setData('sCurrency','USD')">USD</b-dropdown-item>
                  <b-dropdown-item value="MXN" @click="setData('sCurrency','MXN')">MXN</b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
                  <p style="text-align:left;">Unit price</p>
                  <div class="row" style="align-items:center;">
                    <input type="text" class="form-control col-sm-12 col-lg-6" placeholder="Unit price" value="" id="unit-price-input">
                    <div class="col-sm-12 col-lg-6">
                      <label class="control-label" for="label-executive"><p>Client</p></label>
                    <b-dropdown id="dropdown-customer" name="drop-customer" :text="formData.sCustomer == null ? 'Select Client' : formData.sCustomer" class="m-md-2">
                    <b-dropdown-item v-for="option in customers.data" :key="option.id" :value="option.id" @click="setData('sCustomer',option.name)">{{option.name}} </b-dropdown-item>
                    </b-dropdown>
                    <button type="button" class="btn btn-light btn-sm waves-effect"><i class="fas fa-plus" style="color:#2a333c;"></i></button>
                    </div>
                  </div>

                  <div style="text-align:left;">
                    <!-- <label class="control-label" for="label-executive"><p>Client</p></label>
                    <b-dropdown id="dropdown-customer" name="drop-customer" :text="formData.sCustomer == null ? 'Select Client' : formData.sCustomer" class="m-md-2">
                    <b-dropdown-item v-for="option in customers.data" :key="option.id" :value="option.id" @click="setData('sCustomer',option.name)">{{option.name}} </b-dropdown-item>
                    </b-dropdown>
                    <button type="button" class="btn btn-light btn-sm waves-effect"><i class="fas fa-plus" style="color:#2a333c;"></i></button> -->
                  </div>
                    <label class="control-label col-12" for="label-executive"><p>Payment Method</p></label>
                    <input type="text" class="form-control col-md-6 col-sm-12" value="" placeholder="Payment method" id="payment-method">

                <label class="control-label col-12" for="label-executive"><p>Signature date</p></label>
                  <input type="text" class="form-control col-md-6 col-sm-12" :value="new Date().toDateString()" readonly="readonly"  id="date-signatures">
                    <div style="text-align:left;">
                      <label><p>Date of Payment</p></label>
                    </div>
                    <div class="col-md-6 col-sm-12" style="padding:0;">
                      <date-picker v-model="date" :config="options"></date-picker>
                    </div>
                  </div>

                  <div class="form-group row">
                    <div class="checkbox checkbox-primary col-12" style="text-align:left;align-items:center;">
                      <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customCheck1">
                        <label class="custom-control-label" for="customCheck1"></label>
                      </div>
                      <label for="Furniture">
                          Furniture
                      </label>
                    </div>

                    <div class="checkbox checkbox-primary col-md-4 col-sm-12">
                      <div class="custom-control custom-checkbox text-left" style="padding-left:9px!important;">
                        <input type="checkbox" class="custom-control-input" id="customCheck2">
                        <label class="custom-control-label" for="customCheck2"></label>
                        <label for="Contract">
                          ROI contract
                      </label>
                      </div>
                    </div>

                    <div class="col-md-8 col-sm-12 row">
                      <label class="control-label col-6"># of years</label>
                      <input @click='touchSpin'
                      id="demo3"
                      name="demo3"
                      type="text"
                      value="0"
                      data-bts-min="0"
                      data-bts-max="100"
                      data-bts-init-val=""
                      data-bts-step="1"
                      data-bts-decimal="0"
                      data-bts-step-interval="100"
                      data-bts-force-step-divisibility="round"
                      data-bts-step-interval-delay="500"
                      data-bts-prefix=""
                      data-bts-postfix=""
                      data-bts-prefix-extra-class=""
                      data-bts-postfix-extra-class=""
                      data-bts-booster="true"
                      data-bts-boostat="10"
                      data-bts-max-boosted-step="false"
                      data-bts-mousewheel="true"
                      data-bts-button-down-class="btn btn-primary"
                      data-bts-button-up-class="btn btn-primary"/>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-2 control-label" for="example-textarea-input">Comments</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" rows="5" id="example-textarea-input"></textarea>
                    </div>
                   </div>
               </div>
            </div>
      </div>
      <div class="col-sm-0 col-md-1 col-lg-1 col-xl-3">
      </div>
    </div>
</div>
  </div>

</template>

<script>

import returnPage from "./returnPage.vue";
import swal from "sweetalert";
import { mapGetters } from "vuex";
import $ from "jquery";
import moment from "moment";
import datePicker from 'vue-bootstrap-datetimepicker';

export default {
  mounted: function() {
      this.$eventHub.$on("show-contractsSegment-modal", details => {
      //this.detailTable = details.detailUnit;
      this.departments = details.departments;
      this.$store.dispatch("users/getUsers");
      this.$store.dispatch("others/getClusters");
      this.$store.dispatch("others/getCustomers");
      this.show = true;
    });

    $( document ).ready(function() {
      $("input[name='demo3']").TouchSpin();
      });


  },
  components: {
    returnPage
  },
  data() {
    return {
      show: false,
      isActive: true,
      contract: {},
      formData: {
        sExecutive: null,
        sCluster : null,
        sUnit: null,
        sCustomer: null,
        sCurrency: null
      },
      departments: {},
      options: {
          format: 'DD/MM/YYYY',
          useCurrent: false,
      },
      date:new Date()
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
    setUnitPrice(x) {
      document.getElementById('unit-price-input').value = x;
    },
    toPrice(x) {
      var r = x.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      return r;
    },
    setData (who, nVal) {
      this.formData[who] = nVal;
    },
    touchSpin(){
        $("input[name='demo3']").TouchSpin();
      }
  },

  computed: {
    ...mapGetters({
          cAvailability: "departments/currentAvailability",
          executives: "users/users",
          clusters: "others/clusters",
          customers: "others/customers"
      }),
    shouldShow() {
      return this.show;
    },
    getAvailableDepartments () {
      let res = null
      res = this.departments.length > 0 ? res = this.departments.filter(dep => dep.statusId == 1) : null

      return res
    },
    getColor() {
      // if (this.detailTable.status.color_hex) {
      //   return this.detailTable.status.color_hex
      // } else if(this.contract != null) {
      //   if(this.contract.commission){
      //     return this.contract.commission.status.color_hex;
      //   }
      // }
      // else {
      //   return  'ffffff'
      // }
    },
    getTotalCommission () {
      // let percent = this.contract.commission.managementCommissions +
      //               this.contract.commission.salesAdministrativeCommissions +
      //               this.contract.commission.brokerCommissions +
      //               this.contract.commission.salesExecutivesCommissions +
      //               this.contract.commission.thirdPartyCommissions
      // percent = percent / 100
      //
      // return this.contract.salesprice > 0 ? '$ ' + (this.contract.salesprice * percent).toFixed(2) : '-';
      }
    }
  }
</script>

<style>

  @import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  @import '../../../node_modules/pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

  body {
    background: #2a333c!important;
  }

  #dropdown-clusters .dropdown-item:hover,
  .dropdown-item:focus {
      text-decoration: none;
      background-color: none!important;
  }

  #dropdown-clusters .container-fluid {
    text-align:center;
    background:#2a333c;
    height: 100%;
    position:fixed;
    top:57px;
    left:0;
    max-height: 97vh;
    padding-top: 18px;
  }

  .form-group p {
    margin-top:8px;
    margin-bottom:8px;
  }

  .custom-control-label::before {
    background:#3c4857;
    border-color: #687c94;
  }

  .bootstrap-touchspin-injected {
    width: 50%;
  }

  .bootstrap-touchspin-up,
  .bootstrap-touchspin-down {
    background: rgb(255, 251, 251);
    border:1px solid white;
    color: black;
  }

  .form-control:disabled,
  .form-control[readonly] {
      background-color: #2a333c;
      opacity: 1;
      color:#757b80!important;
  }

  .form-control:focus {
    background: #2a333c;
  }

  textarea:focus,
  input[type="text"]:focus,
  input[type="password"]:focus,
  input[type="datetime"]:focus,
  input[type="datetime-local"]:focus,
  input[type="date"]:focus,
  input[type="month"]:focus,
  input[type="time"]:focus,
  input[type="week"]:focus,
  input[type="number"]:focus,
  input[type="email"]:focus,
  input[type="url"]:focus,
  input[type="search"]:focus,
  input[type="tel"]:focus,
  input[type="color"]:focus,
  textarea,
  .uneditable-input:focus {
    border-color: #687c94;
    box-shadow: none;
    outline: 0 none;
  }

  input.form-control {
    color: #757b80!important;
  }

  input#demo3 {
    background:#2a333c;
    border:1px solid #4a5869;
    color: #757b80;
    padding:4px;
  }

  .bootstrap-datetimepicker-widget {
    background: #2a333c;
    color:white;
  }

  .form-control {
    background-color: #2a333c;
    border-radius: 2px;
    border: 1px solid #4a5869;
    box-shadow: none;
    height: 38px;
    color: #ffffff !important;
    font-size: 14px;
  }
  #container-fluid {
    z-index:3!important;
  }

    .dropdown ul li a:hover {
      background:none;
      color:white;
  }

    .dropdown ul li {
      padding:5px;
    }

    .dropdown ul li a {
      color: white;
      border-bottom: 1px solid #4a5869;
      text-align: center;
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
    border-top:1px solid #d1d1d18a!important; /*table border*/
  }

  .row-full {
    height: 100%;
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

    .col-sm-12 {
      padding: 0;
    }
    .col-lg-3 {
      margin:10px;
    }
  }

</style>
