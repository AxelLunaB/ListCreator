<template>
  <div v-if="shouldShow === true" id="fadeOutAnimation">
    <div class="container-fluid" :class="{ active: show}" id="container-fluid" style="height:95%">
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
              <form id="new-contract-form">
                <div class="form-group">
                  <div class="row">
                    <div class="col-12">
                      <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                        </ul>
                      </p>
                    </div>
                    <div class="col-lg-3" id="dropdown-validation0" >
                    <!-- <label class="control-label" for="label-executive"><p>Development</p></label> -->
                      <b-dropdown
                      id="dropdown-clusters"
                      name="drop-clusters"
                      :text="formData.clusterId.name == null ? 'Development' : formData.clusterId.name" class="m-md-2">
                      <b-dropdown-item v-for="option in clusters"
                      :key="option.id"
                      :value="option.id"
                      @click="selectDev(option.name),setData('clusterId',{id :option.id, name: option.name})">{{option.name}} </b-dropdown-item>
                      </b-dropdown>
                    </div>

                    <div class="col-lg-3">
                    <!-- <label class="control-label" for="label-executive">Executive</label> -->
                    <!-- @click="setData('executive',{id :option.id, name: option.name})"> -->
                    <b-dropdown
                    id="dropdown-executives"
                    name="drop-executive"
                    :text="formData.executive.name == null ? 'Executive' : formData.executive.name"
                    class="m-md-2">
                    <b-dropdown-item v-for="option in executives"
                    :key="option.id"
                    :value="option.id"
                    @click="selectExec(option.name),setData('executive',{id :option.id, name: option.name})">
                      {{option.name}}
                    </b-dropdown-item>
                    </b-dropdown>
                    </div>

                    <div class="col-lg-3">
                    <!-- <label class="control-label" for="label-executive"><p>Unit</p></label> -->
                    <b-dropdown
                    id="dropdown-unit"
                    name="drop-unit"
                    :text="formData.unitId.name == null ? 'Unit' : formData.unitId.name" class="m-md-2">
                    <b-dropdown-item v-for="option in getAvailableDepartments"
                    name="salePrice"
                    :key="option.id"
                    :value="option.id"
                    @click="selectUnit(option.unitNumber),setData('unitId',{id :option.id, name: option.unitNumber});setUnitPrice(option.priceTotal)">{{option.unitNumber}} </b-dropdown-item>
                    </b-dropdown>
                    </div>

                    <div class="col-lg-3">
                    <!-- <label class="control-label" for="label-executive"><p>Currency</p></label> -->
                    <b-dropdown
                    id="dropdown-currency"
                    :text="formData.currency.name == null ? 'Currency' : formData.currency.name" class="m-md-2">
                    <b-dropdown-item value="USD"
                    @click="selectCurr('USD'),setData('currency',{id: 1,name: 'USD'})">
                      USD
                    </b-dropdown-item>
                    <b-dropdown-item value="MXN"
                    @click="selectCurr('MXN'),setData('currency',{id: 2,name: 'MXN'})">
                      MXN
                    </b-dropdown-item>
                    </b-dropdown>
                    </div>

                  </div>

                  <p style="text-align:left;">Unit price</p>

                  <div class="row" style="align-items:center;">
                    <input
                    type="text"
                    class="form-control disabled-option col-sm-12 col-lg-6"
                    placeholder="Select unit"
                    name="salesprice"
                    value=""
                    id="unit-price-input"
                    readonly="readonly">

                    <div class="col-sm-12 col-lg-6">

                      <!-- <label class="control-label" for="label-executive"><p>Client</p></label> -->
                      <b-dropdown
                      id="dropdown-customer"
                      name="drop-customer"
                      :text="formData.customerId.name == null ? 'Select Client' : formData.customerId.name" class="m-md-2">
                      <div style="overflow-y:scroll;height:200px;">

                       <b-dropdown-item v-for="option in customers.data"
                       :key="option.id"
                       :value="option.id"
                       @click="selectClient(option.name),setData('customerId',{id :option.id, name: option.name})">
                       {{option.name}}
                       </b-dropdown-item>
                      </div>
                      </b-dropdown>
                      <button type="button" class="btn btn-light btn-sm"><i class="fas fa-plus" style="color:#2a333c;"></i></button>
                    </div>
                  </div>

                <label
                class="control-label col-12"
                for="label-executive">
                  <p>Payment Method</p>
                </label>

                <input
                type="text"
                class="form-control col-md-6 col-sm-12"
                value=""
                placeholder="Payment method"
                name="PaymentMethod"
                id="payment-method"
                v-model.trim="$v.paymentMethod.$model"
                :class="{ 'form-group--error': $v.paymentMethod.$error }">
                <div class="error" v-if="!$v.paymentMethod.alpha && $v.paymentMethod.required && $v.paymentMethod.$dirty">Numbers not allowed</div>
                <div class="error" v-if="$v.paymentMethod.$dirty && $v.paymentMethod.$invalid">Payment method must be letters only</div>
                <label class="control-label col-12" for="label-executive"><p>Signature date</p></label>

                <input
                type="text"
                class="form-control col-md-6 col-sm-12 disabled-option"
                :value="getFormatDate()"
                readonly="readonly"
                name="signatureDate"
                id="date-signatures">

                <div style="text-align:left;">
                  <label><p>Date of Payment</p></label>
                </div>
                <div class="col-md-6 col-sm-12" style="padding:0;">
                  <date-picker
                  :config="options"
                  name="dateOfPayment"
                  :class="{ 'form-group--error': !$v.date.minValue && $v.date.$dirty }"
                  v-model.trim="$v.date.$model"></date-picker>
                  <div class="error" v-if="$v.date.$dirty && !$v.date.minValue">value must be a future date</div>

                                  <!-- <div style="text-align:left;">
                    <label><p>Date of Payment</p></label>
                  </div>
                  <div class="col-6" style="padding:0;">
                    <date-picker v-model="date" :config="options" name="dateOfPayment"></date-picker>
                  </div> -->
                </div>
                <div class="form-group row">
                  <div class="checkbox checkbox-primary col-12" style="text-align:left;align-items:center;">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="customCheck1" v-model="formData.furniture">
                      <label class="custom-control-label" for="customCheck1"></label>
                    </div>
                    <label for="Furniture">
                    Furniture
                    </label>
                  </div>
                  <div class="checkbox checkbox-primary col-12" style="text-align:left;align-items:center;">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="customCheck2" v-model="isROI">
                      <label class="custom-control-label" for="customCheck2"></label>
                      <label for="Contract">
                        ROI contract
                      </label>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-6 row" style="padding-left:0;">
                    <template v-if="isROI == true">
                    <label class="control-label col-6 text-left row"># of years</label>
                    <input @click='touchSpin'
                    id="years"
                    type="text"
                    v-model="formData.WROI.name"
                    value="0"
                    class="form-control row col-6"
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
                    <div style="font-weight: lighter;text-align: right;width: 100%;" >value must be numeric</div>
                    </template>
                    <!-- <div class="error col-12" v-if="!$v.years.numeric">value must be numeric</div>-->
                    <!--<div class="error col-12" v-if="!$v.years.between && $v.years.$dirty && $v.years.numeric">value must be between 1-99</div> -->
                                        <!-- :class="{ 'form-group-error': $v.years.$error }"
                    v-model.trim="$v.years.$model" -->
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 control-label control-label-text" for="example-textarea-input">Comments</label>
                  <div class="col-sm-10">
                    <textarea v-model="formData.comment" class="form-control" rows="5" id="example-textarea-input"></textarea>
                  </div>
                </div>
                </div>
                <div>
                <button type="button" class="btn btn-outline-light waves-light" @click="addNewContract()">Send</button>
                </div>
              </form>
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
import io from "socket.io-client";
import { required, minLength, between, numeric, alpha  } from 'Vuelidate/lib/validators';

var socket = io();

export default {
  mounted: function() {
      this.$eventHub.$on("show-contractsSegment-modal", details => {
      this.departments = details.departments;
      this.$store.dispatch("users/getUsers");
      this.$store.dispatch("others/getClusters");
      this.$store.dispatch("others/getCustomers");
      this.show = true;
    });

    // $( document ).ready(function() {
    //   $("input[id='ROIyears']").TouchSpin({
    //     verticalbuttons: true
    //     });
    //   });


  },
  components: {
    returnPage
  },
  data() {
    return {
      ids:[],
      isROI:false,
      errors:[],
      show: false,
      isActive: true,
      contract: {},
      validation:[],
      formData: { // findme
        id: 49,
        executive: {id: null, name: null},
        clusterId : {id: null, name: null},
        unitId: {id: null, name: null},
        customerId: {id: null, name: null},
        currency: {id: null, name: null},
        WROI: { name: 0},
        furniture:false,
        comment:null,
      },
      paymentMethod:"",

      departments: {},
      options: {
          format: 'YYYY-MM-DD'
      },
      date:new Date()
    }
  },
  validations:{
    paymentMethod: {
      required,
      alpha
    },
    date:{
      required,
      minValue: value => value > new Date().toISOString()
      }
  },
  methods: {
    getValue(k){
      switch(k){
      case 'executive':
        return this.formData.executive.id
      break;
      case 'clusterId':
        return this.formData.clusterId.id
      break;
      case 'unitId':
        return this.formData.unitId.id
      break;
      case 'customerId':
        return this.formData.customerId.id
      break;
      case 'currency':
        return this.formData.currency.id
      break;
      case 'WROI':
      return this.isROI == true ? parseInt(this.formData.WROI.name) : "No"
      break;
      case "comment":
        return this.formData.comment == undefined ||this.formData.comment == "" ? "No comments" : this.formData.comment
      break;
      case "id":
      return this.formData.id
      case "furniture":
      return this.formData.furniture == false  ? "NO" : "YES"

      }
    }
    ,
    selectExec(option){
      var exec = option
      if (exec != null && exec != undefined) {
        this.validation[1] = exec
        var clusterDropdown = document.getElementById("dropdown-executives__BV_toggle_");
        clusterDropdown.classList.remove("error");
      }
    },
    selectDev(option){
      var dev = option
      if (dev != null && dev != undefined) {
        this.validation[0] = dev
        var devDropdown = document.getElementById("dropdown-clusters__BV_toggle_");
        devDropdown.classList.remove("error");
      }
    },
    selectUnit(option){
      var unit = option
      if (unit != null && unit != undefined) {
        this.validation[2] = unit
        var unitDropdown = document.getElementById("dropdown-unit__BV_toggle_");
        unitDropdown.classList.remove("error");
      }
    },
    selectCurr(option){
      var curr = option
      if (curr != null && curr != undefined) {
        this.validation[3] = curr
        var currencyDropdown = document.getElementById("dropdown-currency__BV_toggle_");
        currencyDropdown.classList.remove("error");
      }
    },
    selectClient(option){
      var client = option
      if (client != null && client != undefined) {
        this.validation[4] = client
        var clientDropdown = document.getElementById("dropdown-customer__BV_toggle_");
        clientDropdown.classList.remove("error");
      }
    },
    touchSpin(){
        $("input[id='years']").TouchSpin();
      },
    closeBtn() {
      self = this
      document.getElementById("fadeOutAnimation").style.transition = "opacity 1s";
      document.getElementById("fadeOutAnimation").style.opacity = 0;
      setTimeout(function () {
        self.show = false;
        }, 250);
    },
    getFormatDate() {
      var now = new Date();
      var dateString = moment(now).format('DD/MM/YYYY');

      return dateString
    },
    setUnitPrice(x) {
      const self = this;
      var y = x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      document.getElementById('unit-price-input').value =  y + '.00 '
    },
    toPrice(x) {
      var r = x.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      return r;
    },
    setData (who, nVal) {
      this.formData[who].id = nVal.id;
      this.formData[who].name = nVal.name;
    },
    addNewContract () {


        if(this.isROI === true) {
          var selectYears = null
          if(this.formData.WROI.name === 0 || this.formData.WROI.name === null || isNaN(this.formData.WROI.name) ) {
            selectYears = document.getElementById("years");
            selectYears.classList.add("form-group--error");
          } else {
            selectYears = document.getElementById("years");
            selectYears.classList.remove("form-group--error");
          }
        }


        this.$v.$touch()
        if (this.$v.$invalid || this.validation.length !== 5 ) {
          for(let i = 0; i < 5; i++){
            if(this.validation[i] == undefined){

              switch(i){
                case 0:
                  var devDropdown = document.getElementById("dropdown-clusters__BV_toggle_");
                  devDropdown.classList.add("error");
                break;

                case 1:
                  var executiveDropdown = document.getElementById("dropdown-executives__BV_toggle_");
                  executiveDropdown.classList.add("error");
                break;

                case 2:
                  var unitDropdown = document.getElementById("dropdown-unit__BV_toggle_");
                  unitDropdown.classList.add("error");
                break;

                case 3:
                  var currencyDropdown = document.getElementById("dropdown-currency__BV_toggle_");
                  currencyDropdown.classList.add("error");
                break;

                case 4:
                  var clientDropdown = document.getElementById("dropdown-customer__BV_toggle_");
                  clientDropdown.classList.add("error");

              }
            }
          }

        } else {

          var clusterDropdown = document.getElementById("dropdown-clusters__BV_toggle_");
          var executiveDropdown = document.getElementById("dropdown-executives__BV_toggle_");
          var unitDropdown = document.getElementById("dropdown-unit__BV_toggle_");
          var currencyDropdown = document.getElementById("dropdown-currency__BV_toggle_");
          var clientDropdown = document.getElementById("dropdown-customer__BV_toggle_");
          clusterDropdown.classList.remove("error");
          executiveDropdown.classList.remove("error");
          unitDropdown.classList.remove("error");
          currencyDropdown.classList.remove("error");
          clientDropdown.classList.remove("error");
          if(this.isROI == true) {
            var selectYears = document.getElementById("years");
            selectYears.classList.remove("form-group--error");
          }

          const _ = this;
          var frm = $("#new-contract-form").serializeArray();
          var contract = {};
          var success = true;
          frm.forEach(element => {
            contract[element.name] = element.value;
            });
            Object.keys(this.formData).forEach(k => {
              frm.push({
                name: k,
                value:this.getValue(k)
                });

              });
              frm[0].value = (frm[0].value).replace(/\,/g,'');
              frm[0].value = parseInt(frm[0].value,10);

              var yyyy = frm[3].value.slice(0,4)
              var dd = frm[3].value.slice(8,10)
              var mm = frm[3].value.slice(5,7)
              frm[3].value = dd + "/" + mm + "/" + yyyy

              console.log(frm)
              var data = {};
              frm.map(function(m){
                data[m.name] = m.value;
              })
              console.log(data);
              swal({
                title: "Please confirm information",
                text: "Cluster" + " : " + this.formData.clusterId.name + "\n" + "Unit" + " : " + this.formData.unitId.name + "\n" + "Sold to : " + this.formData.customerId.name + "\n" + "Price" + " : " + frm[0].value + " " + this.formData.currency.name,
                icon: "info",
                buttons: {
                  cancel: true,
                  confirm: true,
                }

                })

                .then(function(isConfirm) {
                if (isConfirm) {
                  swal({
                    title: 'Success!',
                    text: 'Your contract has been created',
                    icon: 'success'
                  }).then(function() {
                    _.$store
                    .dispatch("contracts/newContract", data)
                  });
                } else {
                  swal("Cancelled", "did not create contract", "error");
                }

    })
      // this.formData.forEach(ele =>{
      //   frm.push({
      //     name: ele,
      //     value: ele.value
      //   });
      // })
        }
      }
    },
  computed: {
    ...mapGetters({
          cAvailability: "departments/currentAvailability",
          executives: "users/users",
          clusters: "others/clusters",
          customers: "others/customers",
          contracts: "contracts/contracts"
      }),
    shouldShow() {
      return this.show;
    },
    getAvailableDepartments () {
      let res = null
      res = this.departments.length > 0 ? res = this.departments.filter(dep => dep.statusId == 1) : null

      return res
    }
    ,
    getId(){
      for( var i = 0 ; i < this.contracts.length ; i++) {
        this.ids.push(this.contracts[i].id)
      }
      this.formData.id = Math.max.apply(null, this.ids) + 1
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

  #tosheet,
  #sendtopdf,
  #newContract {
    margin-bottom:15px;
  }
  .control-label-text {
    font-size: calc(0.2vw + 10px);
    display: flex;
    align-items: center;
  }

  .error {
    text-align: left;
    font-size: 12px;
    color: #D64933!important;
  }

  .alert_button {
    margin:10px 0 0 0;
    color: #D64933;

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

  input#years {
    color:#495057
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
    box-shadow: none;
    outline: 0 none;
  }


  input[type="text"] {
    background: #2a333c;
    border:1px solid #ffffff4b;
  }

  .form-control[readonly] {
    background-color: #3c4857;
    border:none;
    opacity: 1;
    padding-left: 0;
    font-weight: bolder;
}

  input#ROIyears {
    background:#2a333c;
    border:1px solid #4a5869;
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
    font-size: 14px;
  }
  #container-fluid {
    z-index:3!important;
    padding-top:0;
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


  .form-group--error {
    border: 1px solid #D64933!important;
  }

.disabled-option::placeholder {
  color: #ffffff;
  opacity: 1;
}

.disabled-option {
  color: white;
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
