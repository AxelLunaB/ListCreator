<template>
  <div class="add-new-user" style="z-index:2">
    <div class="container-fluid">
      <div id="returntwo" @click="closeModal()">
        <span> <i class="fas fa-level-up-alt"></i> &nbsp; Regresar</span>
      </div>
      <div class="row row-full margin-0">
        <div class="col-0 col-sm-1 col-lg-3 col-xl-4">
        </div>
      <div class="col-12 col-sm-10 col-lg-6 col-xl-4" style="display:flex;align-items:center;">
        <div class="card">
          <div class="card-body" style="padding-bottom:0;">
            <span style="display:flex;align-items: center;justify-content: space-evenly;padding-bottom:10px">
              <p @click="create = false" style="cursor:pointer" :style="{ fontWeight: create ? 'normal' : 'bolder' }">Cliente existente</p>
              <p @click="create = true" style="cursor:pointer" :style="{ fontWeight: create ? 'bolder' : 'normal' }">Cliente nuevo</p>
            </span>
            <form id="new-user-form" v-if="create">
              <h4 class="page-title" style="padding-bottom:20px;">Agregar nuevo cliente</h4>
              <div class="form-group">
              <div class="row margin-0">
                <div class="col-4">
                    Nombre(s)
                </div>
                <div class="col-8">
                  <input class="form-control col-12"  type="text" v-model="formData.name"  placeholder="Juan">
                </div>
              </div>
              <div class="row margin-0">
                <div class="col-4">
                    Apellidos
                </div>
                <div class="col-8">
                  <input class="form-control col-12"  type="text" v-model="formData.lastName"  placeholder="Pérez">
                </div>
              </div>
              <div class="row margin-0">
                <div class="col-4">
                  Edad
                </div>
                <div class="col-8">
                    <input class="form-control col-4 col-md-3"  type="number" min="18" max="100" v-model.number="formData.age" placeholder="18">
                </div>
              </div>
              <div class="error" v-if="!this.$v.formData.age.minValue && this.validation" style="text-align:center;padding:0 0 5px 0;">Cliente debe de tener 18 años o más.</div>
              <div class="error" v-if="!this.$v.formData.age.maxValue" style="text-align:center;padding:0 0 5px 0;">Por favor introduzca una edad válida.</div>
              <div class="row margin-0">
                <div class="col-4">
                    Domicilio
                </div>
                <div class="col-8">
                  <input class="form-control col-12"  type="text" v-model="formData.address" placeholder="Street/Number/Zip code">
                </div>
              </div>
              <div class="row margin-0">
                <div class="col-4">
                  País
                </div>
                <div class="col-8" style="display:flex;">
                  <b-dropdown
                  id="dropdown-country"
                  name="drop-country"
                  :text ="formData.country == null ? 'Select country' : formData.country">
                  <div>
                    <b-dropdown-item v-for="(country,index) in countries" :key="index" @click="formData.country = country">
                    {{ country }}
                    </b-dropdown-item>
                  </div>
                  </b-dropdown>
                </div>
              </div>
              <div class="row margin-0">
                <div class="col-4">
                    Estado
                </div>
                <div class="col-8" style="display:flex;">
                  <b-dropdown
                  v-if="formData.country != 'Other'" id="dropdown-state"
                  name="drop-state"
                  :text ="formData.state != null ? formData.state : 'Select state'"
                  :disabled="formData.country == null">
                  <div style="overflow-y:scroll;height:200px;">
                    <b-dropdown-item v-for="(state,index) in formData.country == 'USA' ? statesUS : statesMX"
                    :key="index"
                    @click="formData.state = state">
                    {{ state }}
                    </b-dropdown-item>
                  </div>
                  </b-dropdown>
                  <input class="form-control col-12"  type="text" v-else v-model="formData.state" placeholder="State">
                </div>
              </div>
              <div class="row margin-0">
                <div class="col-4">
                  Ciudad
                </div>
                <div class="col-8">
                    <input class="form-control col-12"  type="text" v-model="formData.city" placeholder="City">
                </div>
              </div>
              <div class="row margin-0">
                <div class="col-4">
                    Teléfono
                </div>
                <div class="col-8">
                    <input class="form-control col-12"  type="tel" v-model="formData.contactNumber" placeholder="12 3456 7890">
                </div>
              </div>
              <div class="row margin-0">
                <div class="col-4">
                  E-mail
                </div>
                <div class="col-8">
                    <input class="form-control col-12"  type="email" v-model="formData.email" placeholder="your@email.com">
                </div>
              </div>
              <div class="error" v-if="this.$v.$invalid && this.validation" style="text-align:center;padding-top:20px;">Error: información incompleta.</div>
              <div class="error" v-if="!this.$v.formData.email && this.validation" style="text-align:center;padding-top:20px;">Por favor introduzca un correo valido.</div>
              <div style="margin-top:30px;">
                <button type="button" class="waves ripple default" @click="sendInfo()">Enviar</button>
              </div>
                </div>
            </form>
            <form v-else id="existing-user">
              <span>
                <input class="form-control" placeholder="Search Client" autofocus v-model="filterClient">
                <i class="fas fa-search" style="position: absolute;right: 43px;top: 91px;color: #606a71;"></i>
              </span>
              <div style="height: 254px;overflow-y: scroll;margin-top: 30px;">
                <table class="client-table" style="width:100%;" v-if="customers.data.length != 0">
                <tr v-for="(client,index) in getClient"
                @click="selectClient($event)"
                :key="index">
                  <th class="option-client" style="font-weight:normal;"> {{ client.name + ' ' + client.lastName }}</th>
                </tr>
               </table>
               <table v-else style="color: #ffffff52;display: flex;align-items: center;justify-content: center;">
                 No existen clientes.
              </table>
              </div>
              <div class="upload-files">
                <button type="button" class="waves ripple default" style="border-radius:0;" @click="assignClient()">Asignar Cliente <i class="fas fa-check"></i></button>
              </div>

            </form>
          </div>
        </div>
      </div>
        <div class="col-0 col-sm-1 col-lg-3 col-xl-4">
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import { mapGetters } from "vuex";
import { required , email , minValue , maxValue } from 'vuelidate/lib/validators';
import swal from "sweetalert";
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

export default {
  props: ["unitNumber"],
  mounted: function() {
      this.$store.dispatch("others/getCustomers");

      this.$eventHub.$on("show-users-modal", details => {
    //  this.departments = details.departments;
      this.$store.dispatch("users/getUsers");
    })
      this.formData.name = null
      this.formData.age = null
      this.formData.address = null
      this.formData.country = null
      this.formData.state = null
      this.formData.city = null
      this.formData.contactNumber = null
      this.formData.email = null

       window.onbeforeunload = function(event)
    {
        return confirm("Confirm refresh");
    };
  },
  data() {
    return {
      selectedCustomer:null,
      filterClient:null,
      current:null,
      last:null,
      create:false,
      ids:[],
      closeModalUser:false,
      validation:false,
      formData: { // findme
        name: { id:null, name:null},
        lastName:null,
        age:{ id:null, name:null},
        address:{ id:null, name:null},
        country:{ id:null, name:null},
        state:{ id:null, name:null},
        city:{ id:null, name:null},
        contactNumber:{ id:null, name:null},
        email:{ id:null, email:null}
      },
      countries:['México','USA','Other'],
      statesUS:[
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia'
        ],
        statesMX:[
        'Aguascalientes',
        'Baja California',
        'Baja California Sur',
        'Campeche','Chiapas',
        'Chihuahua',
        'Ciudad de México',
        'Coahuila de Zaragoza',
        'Colima',
        'Durango',
        'Estado de México',
        'Guanajuato',
        'Guerrero',
        'Hidalgo',
        'Jalisco',
        'Michoacán de Ocampo',
        'Morelos',
        'Nayarit',
        'Nuevo León',
        'Oaxaca',
        'Puebla',
        'Querétaro',
        'Quintana Roo',
        'San Luis Potosí',
        'Sin Localidad',
        'Sinaloa',
        'Sonora',
        'Tabasco',
        'Tamaulipas',
        'Tlaxcala',
        'Veracruz de Ignacio de la Llave',
        'Yucatán',
        'Zacatecas'
 ]
    }
  },
  methods: {
      assignClient() {

      if(!this.current){
        swal({
          text: "Por favor, seleccione un cliente para continuar.",
          icon: "warning",
          closeOnClickOutside: true,
          buttons: { cancel: false, confirm: false },
          timer:1000
        })
        return;
      }
      
      const user = this.customers.data.filter(customer => {
          let fullName = customer.name.trim() + ' ' + customer.lastName.trim();
          return fullName === this.current.innerText;
      })

      this.selectedCustomer = user;


      swal({
        title: "Por favor, confirme información.",
        text: "Asignar  " + this.selectedCustomer[0].name  + ' ' + this.selectedCustomer[0].lastName +  " a unidad " + this.unitNumber.unit + "?",
        icon: "info",
        closeOnClickOutside: false,
        buttons: { cancel: true, confirm: true }
        })
      .then(isConfirm => {

          if(isConfirm) {

          let infoClient = {
            unitId: this.unitNumber.id,
            customerId: this.selectedCustomer[0].id,
          };

          this.$store.dispatch('units/updateCustomer', infoClient).then(response => {

          let info = {
              tower:this.unitNumber.clusterId,
              user:this.currentUser.id,
              type:this.currentUser.type,
              customer:this.selectedCustomer[0].name
            }

            this.$eventHub.$emit("get-client", info);

            swal({
              title: 'Éxito!',
              text: user[0].name + " asignado a " + this.unitNumber.unit,
              icon: 'success',
            }).then(() => {
              this.$eventHub.$emit("close-userModal");
            });

            // Closes customer modal after is assigned a new one
            this.$eventHub.$emit('closeModal', false);
            this.$eventHub.$emit('sendClient', this.selectedCustomer[0]);


            }).catch(error => {

              console.log(error);
              // Something went wrong updating unit info
              swal({
                title: 'Oh oh!',
                text: 'Something went wrong!',
                icon: 'warning',
                timer: 2000
              });

            });
          };
      }); 

            /*Upload files process*/

            // const fileInput = document.createElement('input');
            // fileInput.setAttribute('type', 'file');
            // fileInput.setAttribute('name', 'files[]');
            // fileInput.setAttribute('accept', 'application/pdf, image/jpeg, image/png');
            // fileInput.setAttribute('required', 'true');
            // fileInput.setAttribute('id', 'file-input');
            // fileInput.addEventListener('change', self.readFiles);

            // const label = document.createElement('label');
            // label.setAttribute('class', 'input-files');
            // label.setAttribute('for', 'file-input');
            // label.innerText = 'Add File';

            // const span = document.createElement('span');
            // span.setAttribute('id', 'file-read');
            // span.setAttribute('class', 'file-selected');
            // span.innerText = 'Select an Official ID';

            // const container = document.createElement('div');
            // container.appendChild(fileInput);
            // container.appendChild(label);
            // container.appendChild(span);

            // container.innerHTML = `<label class="input-files" for="file-input">Add File</label>
            //                        <span id="file-read" class="file-selected">Select an Official ID</span>`;

            // <input type="file" name="files[]" accept="application/pdf, image/jpeg, image/png" required="true" id="file-input" onchange="self.readFiles">

            // swal({
            //   title: 'Upload Documents',
            //   text: `Before assigning a customer to an unit\n you have to upload the required documents. \n`,
            //   content: container,
            //   icon: 'info',
            //   closeOnClickOutside: false,
            //   buttons: {
            //     cancel: { text: 'Cancel', value: 'Cancel', visible: true },
            //     upload: { text: 'Upload', value: 'Upload', visible: true, closeModal: false }
            //   }
            // }).then(value => {

            //   // Check if user pressed Upload Button
            //   switch(value) {
            //     case 'Cancel':
            //       this.files = null;
            //       swal.close();
            //       break;

            //     case 'Upload':

            //       // Validate if files were already read
            //       if(this.files === null) {
            //         const fileSelection = document.getElementById('file-read');
            //         fileSelection.innerText = 'Please, select an Official ID';
            //         fileSelection.classList.add('file-text-anim');
            //         swal.stopLoading();
            //         break;
            //       }

            //       // First upload an Official ID
            //       this.sendFiles('Official ID').then(officialId => {

            //         // If Official ID was successfully uploaded
            //         if(officialId) {

            //           // Now show input for user to upload
            //           // a new Proof of Address
            //           swal({
            //             title: 'Upload Documents',
            //             text: `Please, now upload a Proof of Address`,
            //             content: container,
            //             icon: 'info',
            //             closeOnClickOutside: false,
            //             buttons: {
            //               cancel: 'Cancel',
            //               upload: { text: 'Upload', value: 'Upload', closeModal: false }
            //             }
            //           }).then(value => {

            //             // Now validate if user pressed upload
            //             // for a Proof of Address
            //             switch(value) {
            //               default:
            //                 // User pressed cancel when assigning a new customer
            //                 swal({
            //                   title: 'Upload Documents',
            //                   text: `Customer was not assigned, you must upload required files first.`,
            //                   icon: 'warning',
            //                   closeOnClickOutside: false,
            //                   buttons: false,
            //                   timer: 3200
            //                 });

            //                 break;

            //               case 'Upload':

            //                 // Validate if files were already read
            //                 if(this.files === null) {
            //                   const fileSelection = document.getElementById('file-read');
            //                   fileSelection.innerText = 'Please, select an Official ID';
            //                   fileSelection.classList.add('file-text-anim');
            //                   break;
            //                 }

            //                 this.sendFiles('Proof of Address').then(proofOfAddress => {

            //                   if(proofOfAddress) {
            //                     // Proof of Address was successfully uploaded
            //                     // Now assign a new customerId to Unit

            //                     console.log('proof of address uploaded!')

            //                     let info = {
            //                     unitId: self.unitNumber.id,
            //                     userId: this.selectedCustomer[0].id,
            //                   }



            //                   // Send customer info to patch unit
            //                   self.$store.dispatch('departments/assignClient', info).then(response => {

            //                   let info = {
            //                       tower:this.unitNumber.clusterId,
            //                       user:this.currentUser.id,
            //                       type:this.currentUser.type,
            //                       customer:this.selectedCustomer[0].name
            //                     }

            //                     self.$eventHub.$emit("get-client", info);

            //                     swal({
            //                       title: 'Success!',
            //                       text: user[0].name + " assigned to " + self.unitNumber.unitNumber,
            //                       icon: 'success',
            //                       timer: 2000
            //                     });

            //                     // Closes customer modal after is assigned a new one
            //                     self.$eventHub.$emit('closeModal', false);
            //                     self.$eventHub.$emit('updateDataDetail');


            //                     }).catch(error => {

            //                       console.log(error);
            //                       // Something went wrong updating unit info
            //                       swal({
            //                         title: 'Oh oh!',
            //                         text: 'Something went wrong!',
            //                         icon: 'warning',
            //                         timer: 2000
            //                       });

            //                     });

            //                   } // Closes Proof of Address
            //                 }).catch(error => {
            //                   console.log(error)
            //                 });

            //                 break;
            //             }
            //           });
            //         } // Closes Official ID boolean

            //       }).catch(error => {

            //       });
            //   }
            // });



        //   } else {
        //     self.current.style.fontWeight = 'normal';
        //   }
        // }); // Closes Swal
    },
    selectClient(evt){

            if (this.current == null) {
      	this.current = evt.srcElement;
        this.current.style.fontWeight = 'bold';
      } else {
      	this.last = this.current
        this.last.style.fontWeight = 'normal';
        this.current = evt.srcElement;
        this.current.style.fontWeight = 'bold';
      }

      // if(this.current == this.last && this.current != null && this.last != null){
      //   this.last.style.fontWeight = 'normal'
      // }

    },
    getValue(k) {

     switch(k) {

      case 'address':
        return this.formData.address
      break;

      case 'age':
        return this.formData.age
      break;

      case 'city':
        return this.formData.city
      break;

      case 'contactNumber':
        return this.formData.contactNumber
      break;

      case 'country':
        return this.formData.country
      break;

      case 'email':
        return this.formData.email
      break;

      case 'name':
        return this.formData.name
      break;

      case "state":
        return this.formData.state
      break;

      // case "id":
      // return this.formData.id

      case 'lastName':
        return this.formData.lastName
      }
    },
    closeModal(){
      this.$eventHub.$emit("close-userModal");


      // swal({
      //   text: "Information will not be saved." + "\n" + "Are you sure you want to exit?",
      //   icon: "info",
      //   buttons: {
      //     cancel: true,
      //     confirm: true,
      //   }
      //   })
      //   .then(function(isConfirm) {


      //     if(isConfirm) {

      //       self.closeModalUser = true

      //       self.formData.name = null
      //       self.formData.age = null
      //       self.formData.address = null
      //       self.formData.country = null
      //       self.formData.state = null
      //       self.formData.city = null
      //       self.formData.contactNumber = null
      //       self.formData.email = null

      //       // setTimeout(function () {
      //       //   self.$emit('closeModal', false)
      //       //   }, 500);
      //       // setTimeout(function() {
      //       //   self.closeModalUser = false
      //       // }, 1000)
            
      //     } else {

      //     }
      //   })
    },

    sendInfo() {

      this.validation = true;
      this.$v.$touch();

      if (!this.$v.$invalid) {

        const _ = this;
        var usr = $("#new-user-form").serializeArray();
        var user = {};

        usr.forEach(element => {
          user[element.name] = element.value;
        });

        function prefix(name) {
          return "" + name;
        }

        function property(p) {
          return p;
        }

        let obj = { userType: '0', password: bcrypt.hashSync('secreto1', salt), };

        Object.keys(this.formData).forEach(k => {
          obj[prefix(k)] = this.getValue(k);
          usr = obj;
        });

        swal({
          title: "Please confirm information",
          text: "Name" + " : " + this.formData.name + "\n" +
                "Age" + " : " + this.formData.age + "\n" +
                "Address " + " : " + this.formData.address + "\n" +
                "Country " + " : " + this.formData.country + "\n" +
                "State " + " : " + this.formData.state + "\n" +
                "City " + " : " + this.formData.city + "\n" +
                "Contact number " + " : " + this.formData.contactNumber + "\n" +
                "E-mail " + " : " + this.formData.email + "\n",
          icon: "info",
          buttons: {
            cancel: true,
            confirm: true,
          }
          })
          .then(function(isConfirm) {
            if(isConfirm) {

              _.$store.dispatch("others/setNewCustomer", usr)
                  swal({
                    title: 'Success!',
                    text: 'A new client has been created',
                    icon: 'success',
                    timer: 1500
                  }).then(res => {

                  _.$store.dispatch("others/getCustomers").then(res=> {
                    console.log('customers updated');
                    _.create = false;
                  })

                  }).catch(err => {
                    console.log('Error at getting customers', err);
                  })

                  _.formData.name = null
                  _.formData.age = null
                  _.formData.address = null
                  _.formData.country = null
                  _.formData.state = null
                  _.formData.city = null
                  _.formData.contactNumber = null
                  _.formData.email = null
                  _.validation = false

            }
          }).catch(e => {
            console.log(e);
          })

        } else {

        }
      }
    },
    computed: {
      ...mapGetters({
        customers: "others/customers",
        currentUser: "users/currentUser",
      }),
      getClient(){
        if(this.customers.data){
          if(this.filterClient == null || this.filterClient == ""){
            return this.customers.data.sort(function (a, b) {
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
        }
      // else {
      // //Removes special characters before filter with normalize and regEx
      //   let filteredClusters = this.customers.data.filter(clientName => clientName.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.filterClient));
      //     if(filteredClusters == 0){
      //       filteredClusters = this.customers.data.filter(clientName => clientName.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(this.filterClient));
      //     }
      //   return filteredClusters.sort(function (a, b) {
      //     if (a.createdAt > b.createdAt) {
      //       return -1;
      //     }
      //     if (a.createdAt < b.createdAt) {
      //       return 1;
      //     }
      //     // a must be equal to b
      //     return 0;
      //   });
      //   }
      }
    },
  validations:{
      formData:{
        name:{
          required
        },
        age:{
            required,
            minValue: value => value > 17,
            maxValue: value =>  value < 130
        },
        address:{
          required
        },
        country:{
          required
        },
        state:{
          required
        },
        city:{
          required
        },
        contactNumber:{
          required
        },
        email:{
          required,
          email
        }
      }
  }
}
</script>

<style>

.client-table tr:nth-child(odd) {
  background:#425061;
}

div.add-new-user {
    position: fixed;
    background: #2a333c;
    left: 0;
    top: 69px;
    bottom: 0;
    right: 0;
    color:white;
}

.margin-0 {
  margin-bottom:10px;
}

.col-4 {
  padding: 0;
}

input {
  padding-left: 10px!important;

}

div li a.dropdown-item {
  color:white;
}

.dropdown-item:hover {
  background:none;
  color:white;
}
</style>
