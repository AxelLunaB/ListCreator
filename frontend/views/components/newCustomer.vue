<template>
  <div class="add-new-user" style="z-index:2" v-if="addClient" :class= "{ animate : addClient, animateOut: closeModalUser }" >
    <div class="container-fluid">
      <div id="returntwo" @click="closeModal()">
        <span><i class="fas fa-level-up-alt"></i> &nbsp; RETURN</span>
      </div>
      <div class="row row-full margin-0">
        <div class="col-0 col-sm-1 col-lg-3 col-xl-4">
        </div>
      <div class="col-12 col-sm-10 col-lg-6 col-xl-4" style="display:flex;align-items:center;">
        <div class="card">
          <div class="card-body" style="padding-bottom:0;">
            <h4 class="page-title" style="padding-bottom:20px;">Add new client</h4>
            <form id="new-user-form">
            <div class="form-group">
            <div class="row margin-0">
              <div class="col-4">
                  Name
              </div>
              <div class="col-8">
                <input class="form-control col-12"  type="text" v-model="formData.name"  placeholder="Jhon Doe">
              </div>
            </div>
            <div class="row margin-0">
              <div class="col-4">
                Age
              </div>
              <div class="col-8">
                  <input class="form-control col-4 col-md-3"  type="number" min="18" max="100" v-model.number="formData.age" placeholder="18">
              </div>
            </div>
            <div class="error" v-if="!this.$v.formData.age.minValue && this.validation" style="text-align:center;padding:0 0 5px 0;">Client must be 18 or older</div>
            <div class="error" v-if="!this.$v.formData.age.maxValue" style="text-align:center;padding:0 0 5px 0;">Please enter a valid age</div>
            <div class="row margin-0">
              <div class="col-4">
                  Address
              </div>
              <div class="col-8">
                <input class="form-control col-12"  type="text" v-model="formData.address" placeholder="Street/Number/Zip code">
              </div>
            </div>
            <div class="row margin-0">
              <div class="col-4">
                Country
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
                  State
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
                City
              </div>
              <div class="col-8">
                  <input class="form-control col-12"  type="text" v-model="formData.city" placeholder="City">
              </div>
            </div>
            <div class="row margin-0">
              <div class="col-4">
                  Phone
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
            <div class="error" v-if="this.$v.$invalid && this.validation" style="text-align:center;padding-top:20px;">Please fill all missing data</div>
            <div class="error" v-if="!this.$v.formData.email && this.validation" style="text-align:center;padding-top:20px;">Please enter valid email</div>
            <div style="margin-top:30px;">
              <button type="button" class="waves ripple default" @click="sendInfo()">Confirm info</button>
            </div>
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
  mounted: function() {
      this.$eventHub.$on("show-users-modal", details => {
    //  this.departments = details.departments;
      this.$store.dispatch("users/getUsers");
      this.$store.dispatch("others/getCustomers");
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
  props:['addClient'],
  data() {
    return {
      ids:[],
      closeModalUser:false,
      validation:false,
      formData: { // findme
        id: null,
        name: { id:null, name:null},
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

      case "id":
      return this.formData.id
      }
    },
    closeModal(){
      const self = this;

      swal({
        text: "Information will not be saved." + "\n" + "Are you sure you want to exit?",
        icon: "info",
        buttons: {
          cancel: true,
          confirm: true,
        }
        })
        .then(function(isConfirm) {
          if(isConfirm) {
            self.closeModalUser = true

            self.formData.name = null
            self.formData.age = null
            self.formData.address = null
            self.formData.country = null
            self.formData.state = null
            self.formData.city = null
            self.formData.contactNumber = null
            self.formData.email = null

            setTimeout(function () {
              self.$emit('closeModal', false)
              }, 750);
            setTimeout(function() {
              self.closeModalUser = false
            }, 1000)
          } else {

          }
        })
    },

    sendInfo() {

      for(let i = 0 ; i < this.customers.data.length ; i++) {
        this.ids.push(this.customers.data[i].id)
      }

      this.formData.id = Math.max.apply(null, this.ids) + 1

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

                  setTimeout(function () {
                    _.$emit('closeModal', false)
                    }, 500);
                    setTimeout(function() {
                      _.closeModalUser = false
                      }, 500)
            }
          })

        } else {

        }
      }
    },
    computed: {
      ...mapGetters({
        customers: "others/customers"
      })
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

div.add-new-user {
    position: fixed;
    background: #2a333c;
    left: 0;
    top: 69px;
    bottom: 0;
    right: 0;
    color:white;
}

.form-control {
  padding: 2px 0 2px 0;
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

button {
  border-radius: 4px;
}

.form-control:focus {
  color: #aeb9c4;
}
</style>
