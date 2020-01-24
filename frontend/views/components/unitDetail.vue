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
                <h4 class="m-b-30 m-t-0 text-center"><span style="font-size:2rem"> Residencia #{{ detailTable ? detailTable.unit : ''}}</span></h4>
                <div class="row">
                    <div class="col-12" style="display: flex;align-items: center;">
                        <table class="table table-hover table-modifier medh">
                            <thead>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="textalign">Precio</td>
                                <td class="text-right">$ {{ detailTable ? toPrice(detailTable.priceTotal) : '' }}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Manzana</td>
                                <td class="text-right">{{ detailTable ? detailTable.suburb : '' }}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Etapa</td>
                                <td class="text-right">{{ detailTable ? detailTable.stage : '' }}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Modelo</td>
                                <td class="text-right">{{ detailTable ? detailTable.houseModel : ''}}</td>
                            </tr>
                            <tr>
                                <td class="textalign">m<sup>2</sup> Construcción</td>
                                <td class="text-right"> {{ detailTable ? detailTable.m2Construction : ''}} </td>
                            </tr>
                            <tr>
                                <td class="textalign">m<sup>2</sup> Terreno</td>
                                <td class="text-right"> {{ detailTable ? detailTable.m2Terrain : '' }}</td>
                            </tr>
                            <tr @click="removeProp('userId')" style="cursor:pointer;">
                              <td class="textalign">Ejecutivo</td>
                              <td class="text-right"><span v-if="this.currentUser.type !== 'V' && this.detailTable.userId !== null ">×</span> <b>{{ detailTable.user ? detailTable.user.name : 'No Asignado' }}</b></td>
                            </tr>
                            <tr>
                                <td class="textalign">Status</td>
                                <td class="text-right" style="padding-top:10px;">
                                  <select id="myList" v-on:change="status($event)" :disabled="currentUser.type === 'V' ">
                                    <option v-bind:style="{color: getColor}">{{ stateIndex ? stateIndex : detailTable.status.name}}</option>
                                    <option value = "1" style="color:#35ce41;" v-if="detailTable.statusId != 1">DISPONIBLE</option>
                                    <option value = "2" style="color:#cd110f;" v-if="detailTable.statusId != 2">VENDIDO</option>
                                    <option value = "3" style="color:#e89005;" v-if="detailTable.statusId != 3">APARTADO</option>
                                    <option value = "4" style="color:#f5e02a;" v-if="detailTable.statusId != 4">BLOQUEADO</option>
                                  </select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--  assign customer or client-->
                    <div class="flex-center customer" v-if="currentUser.type === 'A'">
                      <button v-if="detailTable.customer || customer" style="border: none;background: none;color: white;text-decoration: underline;" @click="newClient = true;">Cambiar Cliente <i class="fas fa-exchange-alt" style="text-decoration:underline;"></i></button>
                      <button v-else style="background: none;border: none;margin: 0;padding: 0;color: white;text-decoration: underline;" @click="newClient = true;">Asignar Cliente <i class="fas fa-user-plus"></i></button>
                      <span v-if="currentUser.type !== 'V'">
                        <button v-if="detailTable.user" style="background: none;border: none;margin: 0;padding: 0;color: white;text-decoration: underline;" @click="assignExec()">Cambiar Ejecutivo <i class="far fa-address-card"></i> </button>
                        <button v-else style="background: none;border: none;margin: 0;padding: 0;color: white;text-decoration: underline;" @click="assignExec()">Asignar Ejecutivo <i class="far fa-address-card"></i></button>
                      </span>
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
              <div style="display:flex;flex-align:row;"><div class="chartdata" style="background:#cd110f;"></div><p>Vendido</p></div>
              <div style="display:flex;flex-align:row;"><div class="chartdata" style="background:#e89005;"></div><p>Apartado</p></div>
              <div style="display:flex;flex-align:row;"><div class="chartdata" style="background:#dddc00;"></div><p>Bloqueado</p></div>
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
  <!-- executive MODAL POPUP-->
  <div v-if="userModal" style="background:rgba(0, 0, 0, 0.57);position:fixed;left:0;right:0;top:0;bottom:0;display:flex;align-items:center;justify-content:center;z-index:2;">
      <span @click="closeUserModal()" style="color: white;font-size: 60px;position: absolute;top: 152px;cursor:pointer;">
        ×
      </span>
      <div class="userModal fadeEntry">
        <span>
          <p v-if="detailTable.user === null || !setExec">Asignar/Cambiar un ejecutivo a la residencia <b>{{ detailTable.unitNumber }}</b> ?</p>
          <p v-else> Cambiar el estado de la unidad a {{ this.stateIndex }} ? </p>
          <input  v-if="detailTable.user === null || !setExec" class="form-control" placeholder="Search Executive" autofocus v-model="filterExecutive">
          <div v-if="detailTable.user === null || !setExec" style="height: 150px;overflow: hidden;overflow-y: scroll;">
            <table class="executive-table" style="width:100%;">
              <tr v-for="(exec,index) in getExecutive"
              @click="setExecutive($event,exec)"
              :key="index">
                <th class="option-executive"> {{ exec.name }}</th>
              </tr>
            </table>
          </div>
        </span>
      <!--  <div style="text-align: center;margin: 30px 0 0 0;">
          <p>Assign/change payment plan <b>{{ detailTable.unitNumber }}</b> ?</p>
          <b-dropdown
          id="dropdown-pPlan"
          name="drop-plan"
          :text ="this.selectedPlan ? this.selectedPlan : this.unitContract ? this.unitContract.paymentPlan !== null ? this.unitContract.paymentPlan  : 'Select a payment Plan' : 'Select a payment Plan' ">
          <div style="height:125px;">
          <b-dropdown-item v-for="(plan ,index) in plans" :key="index" @click="selectedPlan = plan">
          {{ plan }}
          </b-dropdown-item>
          </div>
          </b-dropdown>
        </div> -->
        <div class="col-12" style="display: flex;align-items: center;justify-content: center;margin-top:18px;">
          <button type="button" class="waves ripple default" style="border-radius:0;width:150px;" @click="sendExec()">SEND</button>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="newClient">
        <new-customer :unitNumber="detailTable"/>
      </div>
    </transition>
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
import newCustomer from "./newCustomer.vue";


export default {
  props:['totalUnits'],

  mounted: function () {
    this.$eventHub.$on("show-detailTable-detail-tower-modal", details => {
      this.detailTable = details;
      this.show = true;
    });

    this.$store.dispatch("users/getExecutives");

    this.$eventHub.$on("close-userModal", () => {
      console.log('receving')
      this.newClient = false;
    });

  },

  components: {
    returnPage,
    newCustomer
  },

  data() {
    return {
      mywidth: 200,
      newClient: false,
      currentState: '',
      files: [],
      setExec: false,
      selectedExec:null,
      stateIndex:null,
      filterExecutive: null,
      selectedLabel: '',
      userModal:false,
      myheight: 200,
      loading:false,
      show: false,
      isActive: true,
      detailTable: {},
      contract: {},
      customer:null,
      labels: ["Disponible", "Apartado", "Vendido","Bloqueado"],
      datasets: [{
        data:[1,2,3,4],
        backgroundColor:["#70b84f", "#e89005", "#cd110f","#dddc00"]
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
    removePropExecutive(){
      if(this.detailTable.user === null){
        console.log('has no user')
        return;
      }
      let user;
      this.selectedExec ? user = this.selectedExec.name : user = this.detailTable.user.name
        swal({
          title: 'Please confirm information',
          text:  'Remove ' + user + ' from this unit?',
          icon: "info",
          buttons: { cancel: true,
          delete: { text: 'Remove', value: true }
           }
        }).then(isConfirm => {
            if(isConfirm){
            let user = {
              userId: null
            };

              this.$store.dispatch('units/deleteExecutiveFromUnit', this.detailTable.id).then(updated => {
                this.executive = null;
                this.selectedExec = null;
                swal({
                  title: 'Unit updated',
                  text:  'This unit has no executive assigned!',
                  buttons: { cancel: true, confirm: true }
                })


                let info = {
                    tower: this.detailTable.clusterId,
                    user:this.currentUser.id,
                    type:this.currentUser.type
                  };
                  
                this.$store.dispatch("units/fetchUnitsByStage", this.detailTable.stage).then( r => {
                  this.selectedExec = null;
                  this.detailTable.user = null;
                  this.detailTable.userId = null;
                });

              })

              // this.$eventHub.$emit('updateDataDetail');





            }
        })
    },
    removePropCustomer(){
      if(this.detailTable.customer === null || this.currentUser.type !== 'SA'){
        console.log('has no client');
        return;
      }
      let customer;
      this.customer ? customer = this.customer : customer = this.detailTable.customer.name

        swal({
          title: 'Please confirm information',
          text:  'Remove ' + customer + ' from this unit?' + '\n' +
          'Please note all files and payments from this customer will be deleted',
          icon: "info",
          buttons: {
            cancel: true,
            delete: { text: 'Remove', value: true }
          }
        }).then(isConfirm => {
            if(isConfirm) {


              this.$store.dispatch('departments/deleteCustomerFromUnit', this.detailTable).then(updated => {
                this.customer = null;
                swal({
                  title: 'Unit updated',
                  text:  'This unit has no customer assigned!',
                  buttons: { cancel: true, confirm: true }
                })
              })

              this.$store.dispatch('commissions/deletePayments', this.paymentsByUnit).then(response => {
              // Retrieve all new payments
              this.$store.dispatch('commissions/getPaymentsByUnit', this.detailTable.id);
            }).catch(error => {
              console.log(error);
            });
              this.$store.dispatch('attachments/deleteAllFiles',this.attachmentsByUnit).then(response => {

              }).catch(error => {
                console.log(error)
              })

              // this.$eventHub.$emit('updateDataDetail');
              let info = {
                  tower: this.detailTable.clusterId,
                  user:this.currentUser.id,
                  type:this.currentUser.type
                };

              // Dispatch new customer
              this.$store.dispatch('departments/getDepartmentById', info).then(res =>{
              this.$store.dispatch('attachments/getAttachmentsByUnit', this.detailTable.id);
              });
            }
        })
    },
    removeProp(user){
    switch(user){
      case 'userId':
        this.removePropExecutive();
      break;
      case 'customerId':
        this.removePropCustomer();
      break;
    }
},
  sendExec() {
      // If you select "Assing executive" and try to send it withouth selecting one it will throw an swal
      if(this.selectedExec == null && this.setExec == true && this.detailTable.user == undefined) {

        swal({
          text:  'Seleccione un Ejecutivo para continuar.',
          icon: "error",
          buttons: { cancel: true, confirm: true }
        });

        return;
      }

        const currentStatus = this.detailTable.status.id;
        let exec = null;
        let status = null;
        //let plan = null;

        this.$eventHub.$emit("modal-bar", this.userModal);
        this.selectedExec ? exec = this.selectedExec.name : this.detailTable.user ? exec = this.detailTable.user.name : exec = "N/A"
        this.stateIndex ? status = this.stateIndex : status = this.detailTable.status.name;
      //  this.selectedPlan ? plan = this.selectedPlan : plan = 'N/A';

        swal({
          title: 'Confirmar informacion',
          text:  'Residencia No :  ' + this.detailTable.unit +  '\n' +
          'Ejecutivo: ' +  exec + '\n',
          icon: "info",
          buttons: { cancel: true, confirm: true }
        }).then(isConfirm => {
          //After you click accept

          if(isConfirm) {
            this.userModal = false;
            let executiveId = null;
            const self = this;
            const unitId = this.detailTable.id;
            let statusId = parseInt(document.getElementById("myList").value);

              // if you change executive withouth changing status it will return NaN so we assign statusId to the unit current status
              if(isNaN(statusId)) {
                statusId = this.detailTable.status.id;
              }

            if(this.selectedExec) {
              executiveId = this.selectedExec.id;
            } else {
              if(!this.detailTable.user)
               executiveId = null
              else if(this.detailTable.user) {
               executiveId = this.detailTable.userId
             }
            }

            console.log('Executive ID');
            console.log(executiveId);

            let newStatus = {
              unitId: unitId,
              statusId: statusId,
              currentStatus: currentStatus,
              userId: executiveId
            };

            document.body.style.cursor = "wait";
            this.loading = true;
            this.$eventHub.$emit("modal-bar", this.loading);
            console.log("---");
            console.log(newStatus);
            this.$store.dispatch('units/updateExecutive', newStatus).then(updated => {
              if(updated){

                  document.body.style.cursor = "auto";
                  this.loading = false;
                  this.$eventHub.$emit("modal-bar", this.loading);


                  swal({
                    title: `Residencia ${this.detailTable.unit} actualizada!`,
                    text: 'Estado: ' + status  + '\n'  +
                    'Ejecutivo: ' +  exec + '\n',
                    icon: "info",
                    buttons: {  confirm: true }
                  });

                  if(this.selectedExec !== null || this.selectedExec !== undefined) {
                    this.executive = this.selectedExec;
                  }



                  this.$store.dispatch("units/fetchUnitsByStage", this.detailTable.stage).then( r =>{
                    this.detailTable.user = this.selectedExec;
                    this.detailTable.userId = this.selectedExec.id;
                  });
                  //let uId = this.detailTable.id;
                  //this.detailTable = this.$store.dispatch("units/getUnitUpdatedById", uId);


              }
            }).catch(err => {

              console.log(err)
              swal({
                title: 'Error!',
                text:  `Contacte a un administrador.`,
                icon: "error",
                buttons: {  confirm: true }
              });

              document.body.style.cursor = "auto";
              this.loading = false;
              this.$eventHub.$emit("modal-bar", this.loading);

            });


          if(document.getElementById("myList")){
            document.getElementById('myList').selectedIndex = 0;
            }

          } else {
            this.selectedExec = null;
            this.current.style.fontWeight = 'normal';
            if(document.getElementById("myList")){
              document.getElementById('myList').selectedIndex = 0;
              }
          }

        })

    },
    setExecutive(evt,exec){
      this.selectedExec = exec;
      if (this.current == null) {
      	this.current = evt.srcElement;
        this.current.style.fontWeight = 'bold';
      } else {
      	this.last = this.current
        this.last.style.fontWeight = 'normal';
        this.current = evt.srcElement;
        this.current.style.fontWeight = 'bold';
      }
    },
    closeUserModal(){
     if(document.getElementById("myList")){
             document.getElementById('myList').selectedIndex = 0;
             }
     this.userModal = false;
     this.salesChannel = false;
     this.$eventHub.$emit("modal-bar", false);
   },
    assignExec(){
      this.detailTable.user ? this.setExec = false :  this.setExec = true;
      // Opens the executive modal withouth changing status
      this.userModal = true;
      this.$eventHub.$emit("modal-bar", true);
    },
    closeBtn() {
      self = this;
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
            const unitId = this.detailTable.id
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

            this.$store.dispatch('units/updateStatus', newStatus).then(updated => {
              if(updated){
                document.body.style.cursor = "auto";
                this.loading = false;
                // this.$eventHub.$emit("modal-bar", this.loading);

                swal({
                  title:'Unidad actualizada',
                  text:'Unidad #' + self.detailTable.unit + ' esta ' + this.stateIndex,
                  icon:'success'
                })


                if(document.getElementById("myList")){
                  document.getElementById('myList').selectedIndex = 0;
                  }

                    let stageName = this.detailTable.stage;
                    this.$store.dispatch("units/fetchUnitsByStage", stageName);

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
      cAvailability: "units/currentAvailability",
      isAdmin: "users/isAdmin",
      currentUser: "users/currentUser",
      executives: "users/executives",
    }),

    shouldShow() {
      return this.show;
    },
    getExecutive() {
        if(this.filterExecutive == null || this.filterExecutive == ""){
          return this.executives.sort(function (a, b) {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
        } else {
      //Removes special characters before filter with normalize and regEx
        let filteredClusters = this.executives.filter(executiveName => executiveName.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.filterExecutive));
          if(filteredClusters == 0){
            filteredClusters = this.executives.filter(executiveName => executiveName.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(this.filterExecutive));
          }
        return filteredClusters.sort(function (a, b) {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
        }
      },
    getColor() {
      // if (this.detailTable.status.color_hex) {
        if(this.detailTable){
        return this.detailTable.status.color_hex
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
      let disponible =[];
      let vendido =[];
      let apartado =[];
      let bloqueado =[];

      this.totalUnits.forEach(unit => {
        switch(unit.statusId){
          case 1:
            disponible.push(unit);
          break;
          case 2:
            vendido.push(unit);
          break;
          case 3:
            apartado.push(unit);
          break;
          case 4:
            bloqueado.push(unit);
          break;
        }
      });

      this.datasets[0].data[0] = disponible.length;
      this.datasets[0].data[1] = apartado.length;
      this.datasets[0].data[2] = vendido.length;
      this.datasets[0].data[3] = bloqueado.length;
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


  .userModal {
    background:#3c4857;
    color:white;
    padding:25px;
    border-radius: 4px;
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

  .fade-out {
  -webkit-animation: fade-out 0.7s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
          animation: fade-out 0.7s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
        }
.fade-in {
  -webkit-animation: fade-in 0.7s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
          animation: fade-in 0.7s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

  @keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
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

.option-executive {
  font-weight: normal;
  cursor:pointer;
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

.executive-table tr:nth-child(odd) {
  background:#425061;
}

.executive-table th {
  padding:5px;
 -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
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

.customer {
  display: flex;
  width:100%;
  margin-bottom:0;
  height:16px;
  justify-content:space-between!important;
}
@media screen and (max-width:450px){
  .customer {
    height: 60px;
    flex-direction: column;
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
