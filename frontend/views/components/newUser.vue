<template>
  <div class="add-new-user" style="z-index:2" v-if="addUser" :class= "{ animate : addUser, animateOut: closeModalUser }" >
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
            <h4 class="page-title">Add new user</h4>
            <form id="new-contract-form">
            <div class="form-group">
            <div class="row margin-0">
              <div class="col-4">
                  Name
              </div>
              <div class="col-8">
                <input class="form-control col-12"  type="text" v-model="formData.name.name">
              </div>
            </div>
            <div class="row margin-0">
              <div class="col-4">
                Age
              </div>
              <div class="col-8">
                  <input class="form-control col-4 col-md-3"  type="number" min="18" max="100" v-model.number="formData.age.name">
              </div>
            </div>
            <div class="error" v-if="!this.$v.formData.age.name.minValue && this.validation" style="text-align:center;padding:0 0 5px 0;">Client must be 18 or older</div>
            <div class="row margin-0">
              <div class="col-4">
                  Address
              </div>
              <div class="col-8">
                <input class="form-control col-12"  type="text" v-model="formData.address.name">
              </div>
            </div>
            <div class="row margin-0">
              <div class="col-4">
                Country
              </div>
              <div class="col-8">
                  <input class="form-control col-12"  type="text" v-model="formData.country.name">
              </div>
            </div>
            <div class="row margin-0">
              <div class="col-4">
                  State
              </div>
              <div class="col-8">
                <input class="form-control col-12"  type="text" v-model="formData.state.name">
              </div>
            </div>
            <div class="row margin-0">
              <div class="col-4">
                City
              </div>
              <div class="col-8">
                  <input class="form-control col-12"  type="text" v-model="formData.city.name">
              </div>
            </div>
            <div class="row margin-0">
              <div class="col-4">
                  Phone
              </div>
              <div class="col-8">
                  <input class="form-control col-12"  type="email" v-model="formData.contactNumber.name">
              </div>
            </div>
            <div class="row margin-0">
              <div class="col-4">
                E-mail
              </div>
              <div class="col-8">
                  <input class="form-control col-12"  type="email" v-model="formData.email.name">
              </div>
            </div>
            <div class="error" v-if="this.$v.$invalid && this.validation" style="text-align:center;padding-top:20px;">Please fill all missing data</div>
            <div class="error" v-if="!this.$v.formData.email.name.email && this.validation" style="text-align:center;padding-top:20px;">Please enter valid email</div>
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
import { required , email , minValue , maxValue } from 'vuelidate/lib/validators';
import swal from "sweetalert";
export default {
  props:['addUser'],
  data() {
    return {
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
        email:{ id:null, name:null}
      },
    }
  },
  methods: {
    closeModal(){
      const self = this

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

            self.formData.name.name = null
            self.formData.age.name = null
            self.formData.address.name = null
            self.formData.country.name = null
            self.formData.state.name = null
            self.formData.city.name = null
            self.formData.contactNumber.name = null
            self.formData.email.name = null

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
    sendInfo(){
      this.validation = true;
      this.$v.$touch()
      if (!this.$v.$invalid) {
        swal({
          title: "Please confirm information",
          text: "Name" + " : " + this.formData.name.name + "\n" +
                "Age" + " : " + this.formData.age.name + "\n" +
                "Address " + " : " + this.formData.address.name + "\n" +
                "Country " + " : " + this.formData.country.name + "\n" +
                "State " + " : " + this.formData.state.name + "\n" +
                "City " + " : " + this.formData.city.name + "\n" +
                "Contact number " + " : " + this.formData.contactNumber.name + "\n" +
                "E-mail " + " : " + this.formData.email.name + "\n",
          icon: "info",
          buttons: {
            cancel: true,
            confirm: true,
          }
          })
        }
      }
    },
  validations:{
      formData:{
        name:{
          name:{
            required
          }
        },
        age:{
          name:{
            required,
            minValue: value => value > 17,
            maxValue: value =>  value < 100
          }
        },
        address:{
          name:{
            required
          }
        },
        country:{
          name:{
            required
          }
        },
        state:{
          name:{
            required
          }
        },
        city:{
          name:{
            required
          }
        },
        contactNumber:{
          name:{
            required
          }
        },
        email:{
          name:{
            required,
            email
          }
        }
      }
  }
}
</script>

<style>

  @import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

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

</style>
