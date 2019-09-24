<template>
<div v-if="shouldShow === true" id="fadeOutAnimation">
  <div class="container-fluid cards-detail" v-bind:class="{ active: show}" id="container-fluid">
      <div id="returntwo" @click="closeBtn()">
        <span><i class="fas fa-level-up-alt"></i> &nbsp; RETURN</span>
      </div>
  <div class="row row-one" :class="{ animate: isActive }" style="margin:0 auto;">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6">
        <div class="card">
            <div class="card-body">
                <h4 class="m-b-30 m-t-0 text-center"><span style="font-size:2rem"> Unit # {{ detailTable ? detailTable.unit : ''}}</span></h4>
                <div class="row fullh">
                    <div class="col-12" style="display: flex;align-items: center;">
                        <table class="table table-hover table-modifier medh">
                            <thead>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="textalign">Block</td>
                                <td class="text-right">{{ detailTable ? detailTable.suburb : '' }}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Stage</td>
                                <td class="text-right">{{ detailTable ? detailTable.stage : '' }}</td>
                            </tr>
                            <tr>
                                <td class="textalign">House model</td>
                                <td class="text-right">{{ detailTable ? detailTable.houseModel : ''}}</td>
                            </tr>
                            <tr>
                                <td class="textalign">m<sup>2</sup> Construction</td>
                                <td class="text-right"> {{ detailTable ? detailTable.m2Construction : ''}} </td>
                            </tr>
                            <tr>
                                <td class="textalign">m<sup>2</sup> Terrain</td>
                                <td class="text-right"> {{ detailTable ? detailTable.m2Terrain : '' }}</td>
                            </tr>
                            <!-- <tr>
                                <td class="textalign">Exterior m2</td>
                                <td class="text-right"></td>
                            </tr> -->
                            <!-- <tr>
                                <td class="textalign">Total Interior m2</td>
                                <td class="text-right"></td>
                            </tr> -->
                            <!-- <tr>
                                <td class="textalign">Total m2</td>
                                <td class="text-right"></td>
                            </tr> -->
                            <!-- <tr>
                                <td class="textalign">$/m2 Interior</td>
                                <td class="text-right"></td>
                            </tr> -->
                             <!-- <tr>
                                <td class="textalign">$/m2 Total</td>
                                <td class="text-right"></td>
                            </tr> -->
                            <!-- <tr>
                                <td class="textalign">List Price</td>
                                <td class="text-right"></td>
                            </tr> -->
                            <!-- <tr>
                                <td class="textalign">Status</td>
                                <!-- <td v-if="detailTable.status.name !='RESERVED' || !isAdmin" class="text-right" v-bind:style="{color: getColor}"><slot></slot>{{detailTable.status.name != null ? detailTable.status.name : '-'}}</td>
                                <td v-else class="text-right">
                                  <!-- <select id="myList" v-on:change="status($event)" v-if="isAdmin">
                                    <option value = "3" style="color: rgb(232, 144, 5);">{{detailTable.status.name != null ? detailTable.status.name : '-'}}</option>
                                    <option value = "2" style="color: rgb(205, 17, 15);;">SOLD</option>
                                  </select>
                                </td>
                            </tr> -->
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
                <!-- <h5 class="m-b-30 m-t-0 text-center">PAYMENTS</h5> -->
                <div class="row fullh">
                    <div class="col-12">
                        <table class="table table-hover table-modifier fullh">
                            <thead>
                            </thead>
                            <tbody>
                            <!-- <tr  v-for="(u,index) in (contract ? contract.payments ? contract.payments.paymentsDetails : 12 : 12)" :key="u.id">
                                <td class="textalign">{{contract ? contract.payments ? u.paymentNo : index +1 : index +1}}</td>
                                <td class="text-center">
                                  <span v-bind:style="{color: contract ? contract.payments ? u.status ? u.status.color_hex : 'white' : 'white' : 'white'}">
                                    {{contract ? contract.payments ? u.dueDate : '-' : '-'}}
                                    </span>
                                    </td>
                                <td class ="text-right"><i class="fas fa-file-alt"></i></td>
                            </tr> -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <!--<div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3">
        <div class="card">
                  <div class="card-body">
                      <h5 class="m-b-30 m-t-0 text-left">DOCUMENTS</h5>
                      <div class="row fullh">
                          <div class="col-12">
                              <table class="table table-hover table-modifier fullh">
                                  <thead>
                                  </thead>
                                  <tbody>

                                  <tr v-on:click="selectedLabel = 'Offer Letter'">
                                      <td class="text-left"><label for="fileInput" style="color:green;font-weight:bolder;text-align:left;">Offer letter</label></td>
                                      <!-- <td class="text-left"><span style="color:green;font-weight:bolder;text-align:left;">Offer letter</span></td>
                                      <td><i class="fas fa-file-alt"></i></td>
                                  </tr>

                                  <tr v-on:click="selectedLabel = 'Reserve Sheet'">
                                      <td class="text-left"><label for="fileInput" style="color:green;font-weight:bolder">Reserve sheet</label></td>
                                      <td><i class="fas fa-file-alt"></i></td>
                                  </tr>
                                  <tr v-on:click="selectedLabel = 'Reserve Deposit'">
                                      <td class="text-left"><label for="fileInput" style="color:green;font-weight:bolder">Reserve deposit</label></td>
                                      <td><i class="fas fa-file-alt"></i></td>
                                  </tr>
                                  <tr v-on:click="selectedLabel = 'First Draft Contract'">
                                      <td class="text-left"><label for="fileInput" style="color:green;font-weight:bolder">First Draft Contract</label></td>
                                      <td><i class="fas fa-file-alt"></i></td>
                                  </tr>
                                  <tr v-on:click="selectedLabel = 'Final Contract'">
                                      <td class="text-left"><label for="fileInput" style="color:red;font-weight:bolder">Final Contract</label></td>
                                      <td><i class="fas fa-file-alt"></i></td>
                                  </tr>
                                  <tr v-on:click="selectedLabel = 'ROI Contract'">
                                      <td class="text-left"><label for="fileInput" style="color:red;font-weight:bolder">ROI Contract</label></td>
                                      <td><i class="fas fa-file-alt"></i></td>
                                  </tr>
                                  <tr v-on:click="selectedLabel = 'Official ID'">
                                      <td class="text-left"><label for="fileInput">Official ID</label></td>
                                      <td><i class="fas fa-file-alt"></i></td>
                                  </tr>
                                  <tr v-on:click="selectedLabel = 'Proof of Address'">
                                      <td class="text-left"><label for="fileInput">Proof of Address</label></td>
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
      </div>-->

      <!--<div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3">
        <div class="card">
          <div class="card-body">
            <h5 class="m-b-30 m-t-0 text-left">UPLOAD DOCUMENTS</h5>

            <div class="row" style="height:100%;">
              <div class="col-md-12" style="display:flex;flex-direction:column;justify-content:space-around;">
                <div class="m-b-30">
                  <form id="dropFileForm" method="POST" enctype="multipart/form-data">
                    <input @change="readFiles($event)" type="file" name="files[]" class="dropzone" id="fileInput" accept="application/pdf, image/jpeg, image/png" data-max-file-size="5MB">
                     <label for="fileInput" id="fileLabel">
                      Drop files here to upload
                    </label>
                     <input type="submit" value="Upload" name="submit" @click="sendFiles()" style="margin: 30px 0;" />
                  </form>
                </div>
                <div class="text-center m-t-15" style="margin:26px 0 0 0;">
                   <button type="submit" @click="sendFiles()" class="waves ripple">Send Files</button>

                   Loading Files Animation Wrapper
                  <div class="upload-window">
                    <div class="upload-window-progress"></div>
                    <span id="upload-window-title"></span>
                    <span id="upload-window-sub"></span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>-->

    </div>
    <div class="row row-two" :class="{ animate: isActive }"  style="margin:0 auto;">
  <!--<div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3" style="height:100%;">
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
                                <td class="text-right" style="border:none!important"><b>{{contract != undefined ? contract.currency : '-'}}</b></td>
                            </tr>
                            <tr>
                                <td class="textalign">Sales Channel</td>
                                <td class="text-right">{{contract != undefined ? contract.salesDetails != null ? contract.salesDetails.salesChannel : '-' : '-' }}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Sales Executive</td>
                                <td class="text-right">{{contract ? contract.commission != undefined ? contract.commission.executive != null ? contract.commission.executive.name : '-' : '-' : '-' }}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Customer</td>
                                <td class="text-right">{{contract !=undefined ? contract.customer != null? contract.customer.name : '-' : '-'}}</td>
                            </tr>
                            <tr>
                                <td class="textalign">Man Comm</td>
                                <td class="text-right"><span style="color:red;">{{contract != undefined ? contract.commission != null ? contract.commission.managementCommissions ? contract.commission.managementCommissions + ' %' : '-' : '-' : '-'}}</span></td>
                            </tr>
                            <tr>
                                <td class="textalign">Sales Ex Comm</td>
                                <td class="text-right"><span style="color:red;">{{contract != undefined ? contract.commission != null ? contract.commission.salesExecutivesCommissions ? contract.commission.salesExecutivesCommissions + ' %' : '-' : '-' : '-'}}</span></td>
                            </tr>
                            <tr>
                                <td class="textalign">Sales Adm/Comm</td>
                                <td class="text-right"><span style="color:green;">{{contract != undefined ? contract.commission != null ? contract.commission.salesAdministrativeCommissions ? contract.commission.salesAdministrativeCommissions + ' %' : '-' : '-' : '-'}}</span></td>
                            </tr>
                            <tr>
                                <td class="textalign">Total Comm</td>
                                <td class="text-right">{{contract != undefined ? contract.commission != undefined  && contract.commission.totalCommissions != 0 && contract.commission.totalCommissions != null ? '$ ' + contract.commission.totalCommissions : getTotalCommission : getTotalCommission}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>-->
      <!--<div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3">
      <div class="card" style="height:93%">
          <div class="card-body">
              <div class="row" style="height:100%">
                  <div class="col-12">
                      <table class="table table-hover table-modifier" style="height:100%;margin-bottom:0;">
                          <thead>
                              <h5 class="m-b-30 m-t-0 text-left">ROI</h5>
                          </thead>
                          <tbody>
                          <tr>
                              <td class="textalign">ROI</td>
                              <td class="text-right">{{contract != null ? contract.WROI : '-'}}</td>
                          </tr>
                          <tr>
                              <td class="textalign">ROI %</td>
                              <td class="text-right">{{contract != null ? contract.percent != null ? contract.percent : '-' : '-'}}</td>
                          </tr>
                          <tr>
                              <td class="textalign">Years</td>
                              <td class="text-right">{{contract != null ? contract.years != null ? contract.years : '-' : '-'}}</td>
                          </tr>
                          <tr>
                              <td class="textalign">Closing Date</td>
                              <td class="text-right">{{contract != null ? contract.closingDate != null ? contract.closingDate : '-' : '-'}}</td>
                          </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
      </div>-->
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6" style="height:100%;">
        <div class="card">
          <div class="card-body" style="padding-bottom:0;">
            <div class="row" style="height:242px;">
              <div class="col-12" style="flex-direction:column;">
                <h5 class="m-t-0 m-b-30 text-center">AVAILABILITY</h5>
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
              <div style="display:flex;flex-align:row;"><div class="chartdata" style="background:rgb(5,162,179);"></div><p>Available</p></div>
              <div style="display:flex;flex-align:row;"><div class="chartdata" style="background:rgb(0,163,254)"></div><p>Sold</p></div>
              <div style="display:flex;flex-align:row;"><div class="chartdata" style="background:rgb(235,239,242);"></div><p>Reserved</p></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6" style="height:100%;">
        <div class="card">
          <div class="card-body" style="display:flex; flex-direction:column;">
            <h5 class="m-t-0 m-b-30 text-center">SALES</h5>
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

function pushFile (file, array) {
  return array.push(file);
}

const isFileValid = fileType => {
  let valid = false;

  switch(fileType) {
    case 'application/pdf':
      return valid = true;

    case 'image/jpeg':
      return valid = true

    case 'image/png':
      return valid = true

    default:
      return valid
  }
};

async function getInputFiles (fileList) {
      let arrayOfFiles = [];

      fileList.forEach(file => {
          let fileObj = {};
          const reader = new FileReader();

          fileObj.fileName = file.name;
          fileObj.fileSize = file.size;
          fileObj.fileType = file.type;

          reader.onload = () => {
            fileObj.fileBody = reader.result;
            arrayOfFiles.push(fileObj);
          }

          reader.onerror = () => {
          }

          reader.readAsArrayBuffer(file);
      });

      return arrayOfFiles;
}

// function sendFiles () {
//       const _ = this;
//       const form = document.getElementById('dropFileForm');
//       // Get selected unitId
//       const unitId = this.detailTable.id;

//       form.addEventListener('submit', e => {
//         // Prevent default action from firing
//         e.preventDefault();

//         if(this.files.length === 0) {
//           return;
//         }

//         if(unitId === null || undefined) {
//           throw Error('unitId is null');
//         }

//         let file = { data: _.files[0], unitId: unitId, contentType: '', url: '', size: '', docType: this.selectedLabel  };
//         // Send files to server
//         _.$store.dispatch("attachments/getAWSSignature", file);

//         _.files = null;
//       });
// }

export default {

  mounted: function () {
    this.$eventHub.$on("show-detailTable-detail-tower-modal", details => {
      this.detailTable = details;
      this.show = true;
    });

    // Method added to get all contracts by Paid Ref
    this.$store.dispatch('contracts/getContractsByPaidRef');
  },

  components: {
    returnPage
  },

  data() {
    return {
      mywidth: 200,
      files: [],
      selectedLabel: '',
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
          // position:'bottom',
          // labels: {
          // fontColor:'white'
          // }
          display:false
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

    sendFiles() {
      // Vue Instance
      const _ = this;

      // Get selected unitId
      const unitId = this.detailTable.id;

      if(this.files.length === 0) {
        throw new Error('Please, select a file to upload.');
        return;
      }

      if(unitId === null || undefined) {
        // unitId cannot be null
        return;
      }

      let file = { data: _.files[0], unitId: unitId, contentType: '', url: '', size: '', docType: this.selectedLabel };
      console.log('File');
      console.log(file);

      // Send files to server
      _.$store.dispatch("attachments/getAWSSignature", file);
      _.files = null;
    },

      // form.addEventListener('submit', e => {
      //   // Prevent default action from firing
      //   e.preventDefault();

      //   if(this.files.length === 0) {
      //     console.log('Return Called');
      //     return;
      //   }

      //   if(unitId === null || undefined) {
      //     throw Error('unitId is null');
      //   }

      //   let file = { data: _.files[0], unitId: unitId, contentType: '', url: '', size: '', docType: this.selectedLabel };
      //   console.log('File');
      //   console.log(file);
      //   // Send files to server
      //   _.$store.dispatch("attachments/getAWSSignature", file);
      //   _.files = null;
      // });

    readFiles: function(event) {
      // Retrieve selected files
      const fileList = event.target.files;
      let validFiles = 0;

      // if(fileList.length === 0) {
      //   throw Error('Please, select a file to upload!');
      // }

      if(fileList !== undefined) {

        // Empty Files Array from Data Component
        // Before pushing File BLOB's
        this.files = [];

        // Get DOM Elements to show progress
        const uploadTitle = document.getElementById('upload-window-title');
        const uploadSubtitle = document.getElementById('upload-window-sub');
        const uploadProgress = document.getElementsByClassName('upload-window-progress');

        // Iterate every file &
        // Read each file
        Array.from(fileList).forEach(file => {

          if(isFileValid(file.type)) {
            const reader = new FileReader();
            let obj = {};

            reader.onload = () => {
              obj.name = file.name;
              obj.size = file.size;
              obj.type = file.type;
              obj.body = reader.result;

              // Push File to Files[] Array in the Data component
              this.files.push(obj);

              // Increment for each valid file read
              validFiles += 1;

              // Update Window Progress
              uploadTitle.innerText = validFiles === 1 ? `File uploaded!` : `${validFiles} files uploaded!`;

              // Show a Swal Alert
              swal(
                  {
                    title: 'Please confirm information',
                    text:  `Upload file: ${file.name} for ${this.selectedLabel}?`,
                    icon: "info",
                    buttons: {
                    cancel: true,
                    confirm: true,
                  }
              }).then(isConfirm => {
                if(isConfirm) {
                  // Upload file
                  this.sendFiles();
                } else {
                  // Cancel and
                  // Clear Array
                  this.files = [];
                }
              });
            }

            reader.onerror = () => {
              console.log('Error reading file!');
              console.log(reader.error);
            }

            reader.onprogress = e => {

              // Update Progress
              uploadTitle.innerText = fileList.length === 1 ? `Uploading ${fileList.length} file` : `Uploading ${fileList.length} files`;

              if(e.lengthComputable) {
                let percentLoaded = Math.round((e.loaded / e.total) * 100);
                console.log(`Loading ${percentLoaded}% ...`);
              }
            }

            // Read file as Array Buffer
            reader.readAsArrayBuffer(file);

          } else {
            console.log(`File: ${file.name} is not a supported valid file!`);
            uploadTitle.innerText = `File: ${file.name} is not a supported valid file!`;
          }

        });
      }

    },

      status: function status(event) {
        const _ = this;
        let state = event.target[event.target.selectedIndex].label
        if(state != 'Select...'){
        swal(
        {
          title: 'Please confirm information',
          text:  'Change status to ' + event.target[event.target.selectedIndex].label + ' ?',
          icon: "info",
          buttons: {
          cancel: true,
          confirm: true,
          }
        }).then(isConfirm => {
          if(isConfirm) {
            const unitId = this.detailTable.id
            const statusId = parseInt(document.getElementById("myList").value);
            const newStatus = {
              unitId: unitId,
              statusId: statusId
            };

            document.getElementById("myList").disabled = true;
            document.getElementById("myList").style.color = '#ffffff1f';

            this.$store.dispatch('departments/updateStatus', newStatus);

          } else {
            document.getElementById("myList").selectedIndex = 0
          }

        });
        }
      }
  },

  computed: {
    ...mapGetters({
      cAvailability: "departments/currentAvailability",
      monthlySales: "departments/monthlySales",
      contractsByPaidRef: "contracts/contractsByPaidRef",
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
      var monthName = m => new Date(0, m).toLocaleString('en-US', { month: 'long' })
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
