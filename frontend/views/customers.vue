<template>
  <div class="app-container container has-navbar-fixed-top" style="max-width:900px;">

    <transition name="fade">
      <div v-if="loading === false" style="background:#2A333C;width:100%;height:100%;position:fixed;left:0;top:0;right:0;bottom:0;z-index:3;display:flex;align-items:center;justify-content:center;">
        <div>
          <svg width="200px"  height="200px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none;"><circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(119.938 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>
        </div>
      </div>
    </transition>

    <!-- Edit User Modal -->
    <div v-if="modal" style="position: fixed; left: 0px; top: 0px; bottom: 0px; right: 0px; background: rgba(0, 0, 0, 0.58); z-index: 2; display: flex; align-items: center; justify-content: center;">
      <div class="modal-body fade-in" id="modal-body">
        <form style="padding: 18px; background: rgb(60, 72, 87); color: rgb(255, 255, 255);" id="new-customer-form">
          <h4 style="text-align: center; margin: 32px 0; font-weight: 300;">Editar Cliente</h4>

          <div class="form-row">
            <div class="col">
              <label style="font-weight: 500;" for="customer-name">Nombre</label>
              <input type="text" id="customer-name" v-model="customer.name">
            </div>

            <div class="col">
              <label style="font-weight: 500;" for="customer-lastName">Apellido</label>
              <input type="text" id="customer-lastName" v-model="customer.lastName">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col">
              <label style="font-weight: 500;" for="customer-number">Número de contacto</label>
              <input v-bind:style="[letters === false ? $v.tel.$model !== null ? $v.tel.$invalid !== true ? { 'border' : '1px solid green !important' } : { 'border' : '1px solid red !important' } : { } : { 'border' : '1px solid red !important' }]" type="text" id="customer-number" v-model="customer.contactNumber">
            </div>

            <div class="form-group col">
              <label style="display: block; font-weight: 500;" for="customer-age">Edad</label>
              <input type="number" id="customer-age" v-model="customer.age">
            </div>
          </div>

          <div class="form-row">
            <div class="col-6">
              <label style="font-weight: 500;" for="customer-email">Correo electrónico</label>
              <input type="text" id="customer-email" v-model="customer.email">
            </div>

          </div>

          <div class="form-row">
            <div class="form-group col">
              <label style="font-weight: 500;" for="customer-country">País de procedencia</label><br>
              <b-dropdown
              id="dropdown-country"
              name="country"
              :text ="customer.country">
              <div>
                <b-dropdown-item v-for="(c,index) in countries" :key="index" @click="customer.country = c, customer.state = null">
                {{ c }}
                </b-dropdown-item>
              </div>
              </b-dropdown>
            </div>

            <div class="form-group col">
              <!-- <label style="display: block; font-weight: 500;" for="customer-state">State</label>
              <input type="text" id="customer-state" v-model="customer.state"> -->
              <label style="font-weight: 500;" for="customer-state">Estado</label><br>
              <b-dropdown
              id="dropdown-state"
              name="state"
              v-if="customer.country != 'Other'"
              :disabled="customer.country != customer.country"
              :text ="customer.state ? customer.state : 'N/A'">
              <div style="height: 200px;overflow-y: scroll;">
                <b-dropdown-item v-for="(s,index) in customer.country == 'USA' ? statesUS : statesMX" :key="index" @click="customer.state = s">
                {{ s }}
                </b-dropdown-item>
              </div>
              </b-dropdown>
              <div v-else>
                <input type="text" id="customer-state" v-model="customer.state">
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col">
              <label style="font-weight: 500;" for="customer-city">Ciudad</label>
              <input type="text" id="customer-city" v-model="customer.city">
            </div>

            <div class="form-group col">
              <label style="display: block; font-weight: 500;" for="customer-address">Dirección</label>
              <input type="text" id="customer-address" v-model="customer.address">
            </div>
          </div>

          <div class="form-row">
            <!-- <div class="form-group col">
              <label style="display: block; font-weight: 500;" for="customer-password">Password</label>
              <input type="password" id="customer-password" v-model="customer.password">
            </div> -->

            <div class="form-group col-3">
              <label style="display: block; font-weight: 500;" for="zip-code">C.P.</label>
              <input type="number" id="zip-code" v-model="customer.zipcode">
            </div>

          </div>

          <!-- Form Buttons -->
          <div style="margin-top: 24px;" class="form-buttons">
            <button type="button" class="delete-button" @click="deleteCustomer()">Borrar</button>
            <button type="button" class="cancel-button" @click="cancelForm()">Cancelar</button>
            <button type="button" class="send-button" @click="sendForm()">Actualizar</button>
          </div>
        </form>
      </div>
    </div> <!-- Closes Edit User Modal -->

      <!-- <div class="columns is-multiline"> -->

      <!-- Buttons / Search -->
      <div style="position: relative; height: 50px;" class="buttons has-addons">
        <div style="position: relative; height: 50px; width: 80%;">
          <input style="background: #99a7b9;border: none;padding: 5px;border-radius: 3px;" type="text" name="search-user" id="search-user" class="search-user-input" @keyup="searchCustomer($event)" placeholder="Search by Name" />
          <span v-if="filteredCustomers != 0 || editInput && !isCreating " style="color: #ffffffb0;position: absolute;right: 19px;top: -14px;font-size: 3rem;cursor:pointer;" @click="deleteInput()">
          ×
          </span>
        </div>
        <span v-on:click="toggleUserUI()" class="button" style="font-weight: 900; font-size: 18px; font-weight: 800; position: absolute; font-size: 18px; right: 10px;">{{ plusIcon }}</span>
        <!-- <span class="button disabled">Search</span> -->
      </div>

      <!-- USERS TABLE -->
      <div class="box table" v-if="!isCreating && !isEditting" style="background: #3c4857; color: #FFFFFF;">

        <!-- header -->
        <div class="columns is-mobile" style="background: #2c36426b; border-radius: 6px;">
          <div class="column is-4 has-text-centered"><p class="table-head-color" style="font-weight: 600;">Name</p></div>
          <div class="column is-4 has-text-centered"><p class="table-head-color" style="font-weight: 600;">Email</p></div>
          <div class="column is-4 has-text-centered">
            <select id="type-selector" @change="filteredByType($event)">
              <option selected>Nationality</option>
              <option value="local">Local</option>
              <option value="foreign">Foreign</option>
            </select>
          </div>
          <!-- <div class="column is-4 has-text-centered"><p class="table-head-color" style="text-align: center; font-weight: 600;">Type</p></div> -->
        </div>

        <div v-for="u in getFilteredCustomers" :key="u.id" class="columns is-mobile is-multiline users">
          <div class="column is-1 has-text-centered" @click="ModifyCustomer(u)"><i class="far fa-edit fa-xs"></i></div>
          <div class="column is-4">{{u.name + ' ' + u.lastName}}</div>
          <div class="column is-4 parent-overflow"><p class="">{{u.email}}</p></div>
          <div class="column is-3 has-text-centered"><span>{{u.country}}</span></div>

        </div>
      </div>

        <div style="display: none;">
          <a v-on:click="prevPage" class="pagination-previous">Anterior</a>
          <a v-on:click="nextPage" class="pagination-next">Siguiente</a>
        </div>


      <!-- CREATE -->
    <transition name="fade">
      <div v-if="isCreating">
        <div class="columns is-centered is-mobile">
          <div class="column box padding-15 padding-correction is-three-fifths-tablet" style="background: rgb(60, 72, 87); color: rgb(255, 255, 255);">
            <!-- <div class="container padding-15 padding-correction "> -->
              <h1 class="titleFixed is-1 is-spaced" style="font-size:40px; font-weight: 600; margin-bottom: 18px;">Nuevo Cliente</h1>
              <h2 class="subtitle is-4" style="color: rgb(255, 255, 255); font-size: 20px;">Llene los campos de información para dar de alta un cliente.</h2>
              <form autocomplete="off" id="new-customer-form">
                <!-- <div class="columns is-multiline"> -->
                  <!-- <div class="column is-half-tablet"> -->
                    <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Nombre(s)</label>
                      <div class="control">
                       <input class="input" v-bind:style="[$v.name.$model !== null ? $v.name.$invalid !== true ? { 'border' : '1px solid green !important' } : { 'border' : '1px solid red !important' } : { }]" v-model="name" type="text" name="name" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Apellidos</label>
                      <div class="control">
                       <input class="input" v-bind:style="[$v.lastName.$model !== null ? $v.lastName.$invalid !== true ? { 'border' : '1px solid green !important' } : { 'border' : '1px solid red !important' } : { }]" v-model="lastName" type="text" name="lastName" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                      </div>
                    </div>
                  <!-- </div> -->
                  <!-- <div class="column is-half-tablet"> -->
                    <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Correo electrónico</label>
                      <div class="control">
                        <input class="input" v-bind:style="[$v.email.$model !== null ? $v.email.$invalid !== true ? { 'border' : '1px solid green !important' } : { 'border' : '1px solid red !important' } : { }]" v-model="email" type="email" name="email" placeholder="ejemplo@altozano.com.mx" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Edad</label>
                      <div class="control">
                        <input class="input" v-bind:style="[$v.age.$model !== null ? $v.age.$invalid !== true ? { 'border' : '1px solid green !important' } : { 'border' : '1px solid red !important' } : { }]"  v-model="age" type="number" min="18" max="100" name="age" placeholder="18" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Número de contacto</label>
                      <div class="control">
                        <input class="input" type="tel" v-bind:style="[letters === false ? $v.tel.$model !== null ? $v.tel.$invalid !== true ? { 'border' : '1px solid green !important' } : { 'border' : '1px solid red !important' } : { } : { 'border' : '1px solid red !important' }]" v-model="tel" name="contactNumber" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                      </div>
                      <span v-if="letters" style="font-size: 11px;color: red;">Solo números o símbolos</span>
                    </div>
                    <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">País de procedencia</label>
                      <div class="control">
                        <b-dropdown
                        id="dropdown-country"
                        name="country"
                        :text ="country == null ? 'Seleccionar País' : country">
                        <div>
                          <b-dropdown-item v-for="(c,index) in countries" :key="index" @click="country = c, state = null">
                          {{ c }}
                          </b-dropdown-item>
                        </div>
                        </b-dropdown>
                        <b-dropdown
                        v-if="country != 'Other'" id="dropdown-state"
                        name="state"
                        :text ="state != null ? state : 'Seleccionar Estado'"
                        :disabled="country == null">
                        <div style="overflow-y:scroll;height:200px;">
                          <b-dropdown-item v-for="(s,index) in country == 'USA' ? statesUS : statesMX"
                          :key="index"
                          @click="state = s">
                          {{ s }}
                          </b-dropdown-item>
                        </div>
                        </b-dropdown>
                        <div v-if ="country == 'Other'">
                          <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Other country</label>
                          <input class="input" type="text" v-model="otherCountry" name="other-country" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                          <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">State</label>
                          <input class="input" type="text" v-model="otherState" name="other-state" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">State</label>
                      <div class="control">
                        <input class="input" type="text" v-bind:style="[$v.state.$model !== null ? $v.state.$invalid !== true ? { 'border' : '1px solid green !important' } : { 'border' : '1px solid red !important' } : { }]" v-model="state" name="state" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                      </div>
                    </div> -->
                    <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Ciudad</label>
                      <div class="control">
                        <input class="input" type="text" v-bind:style="[$v.city.$model !== null ? $v.city.$invalid !== true ? { 'border' : '1px solid green !important' } : { 'border' : '1px solid red !important' } : { }]" v-model="city" name="city" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                      </div>
                    </div>
                    <div class="field" style="display: flex;justify-content: space-between;">
                      <div>
                        <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Dirección</label>
                        <div class="control">
                          <input class="input" type="text" v-bind:style="[$v.address.$model !== null ? $v.address.$invalid !== true ? { 'border' : '1px solid green !important' } : { 'border' : '1px solid red !important' } : { }]" v-model="address" name="address" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                        </div>
                      </div>
                      <div>
                        <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Código postal</label>
                        <div class="control" style="align-items: flex-start;justify-content: flex-start;">
                          <input class="input" type="number" v-bind:style="[$v.zipcode.$model !== null ? $v.zipcode.$invalid !== true ? { 'border' : '1px solid green !important' } : { 'border' : '1px solid red !important' } : { }]" v-model="zipcode" name="zipcode" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">ZIP code</label>
                      <div class="control" style="align-items: flex-start;justify-content: flex-start;">
                        <input class="input" type="text" v-bind:style="[$v.zipcode.$model !== null ? $v.zipcode.$invalid !== true ? { 'border' : '1px solid green !important' } : { 'border' : '1px solid red !important' } : { }]" v-model="zipcode" name="address" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                      </div>
                    </div> -->
                    <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Contraseña</label>
                      <div class="control">
                       <input v-model="password" class="input" v-bind:style="[ password === password2 ? $v.password2.$model !== '' ? $v.password2.$invalid !== true ? { 'border' : '1px solid green !important' } : { 'border' : '1px solid red !important' } : { } : { 'border' : '1px solid red !important' }]"  type="password" name="password" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" placeholder="" required>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Confirmar contraseña</label>
                      <div class="control">
                       <input v-bind:style="[ password === password2 ? $v.password2.$model !== '' ? $v.password2.$invalid !== true ? { 'border' : '1px solid green !important' } : { 'border' : '1px solid red !important' } : { } : { 'border' : '1px solid red !important' }]"  v-model="password2" class="input" type="password" placeholder="" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                      </div>
                    </div>
                    <span v-if="password !== password2" style="font-size: 11px;color: red;">Passwords don't match</span>

              <div class="buttons" style="margin-top: 32px;">
                <button v-on:click="toggleUserUI()" class="button is-light button-width">
                  Cancelar
                </button>
                <button class="button is-success" style="background: #17a2b8 !important;" :disabled="createDisabled">Añadir Usuario</button>
                <!-- <button class="button is-success button-width" :disabled="createDisabled">Add User</button> -->
              </div>
              </form>
              <br>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </transition>

      <!-- UPDATE -->
      <div class ="" v-if="isEditting">
          <div class="columns is-centered is-mobile">
            <div class="column box padding-15 padding-correction is-three-fifths-tablet">
              <!-- <div class="container padding-15 padding-correction "> -->
                <h1 class="title is-1">Modificar usuario</h1>
                <form id="edit-user-form">
                <!-- <form id="new-user-form"> -->
                  <!-- <div class="columns is-multiline"> -->
                    <!-- <div class="column is-half-tablet"> -->
                      <div class="field">
                        <label class="label">Nombre Completo</label>
                        <div class="control">
                          <input class="input" type="text" :value="selectedUserWrapper.name" name="name" placeholder="">
                        </div>
                      </div>
                    <!-- </div> -->
                    <!-- <div class="column is-half-tablet"> -->
                      <div class="field">
                        <label class="label">Correo electrónico</label>
                        <div class="control">
                          <input class="input" type="text" name="email"
                          :value="selectedUserWrapper.email" placeholder="ejemplo@altozano.com.mx">
                        </div>
                      </div>
                    <!-- </div> -->
                    <!-- <div class="column is-half-tablet"> -->
                      <div class="field">
                        <label class="label">Tipo</label>
                        <div class="control">
                          <div class="select">
                            <select name="type">
                              <option :selected="selectedUserWrapper.type === 'A'" value="A">ADMINISTRADOR</option>
                              <option :selected="selectedUserWrapper.type === 'V'" value="V">ASISTENTE DE VENTA</option>
                              <option :selected="selectedUserWrapper.type === 'P'" value="P">PANTALLA INTERACTIVA</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    <!-- </div> -->
                  <!-- </div> -->
                  <div class="buttons padding-15">
                    <button type="reset" v-on:click="toggleEditUser(null)" class="button is-light button-width">Cancelar</button>
                    <button type="submit" class="button is-success button-width">Guardar</button>
                  </div>
                </form>
                <br>
                <!-- <div class="buttons">
                  <button class="button is-light button-width">Cancelar</button>
                  <button
                    v-on:click="createUser()"
                    class="button is-success button-width" :disabled="createDisabled">Crear</button>
                </div> -->

              <!-- </div> -->
            </div>
          </div>
      </div>
  </div>
</template>
<script>
import { numeric, required, alpha, email, alphaNum  } from 'vuelidate/lib/validators';
import $ from "jquery";
import { mapGetters, mapActions } from "vuex";
import swal from "sweetalert";
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


export default {
  mounted: function() {

    const self = this;
    window.addEventListener('keyup', function(event) {
      if (event.keyCode === 27) {

        if(self.modal === false && self.isCreating === false){
          window.location.replace("/");
        }

        if(self.modal){
          swal({
            title:'Changes will not be saved',
            text:'Are you sure you want to exit?',
            icon:'warning',
            buttons:{
              cancel:true,
              confirm:true
            }
          })
          .then(function(isConfirm){
            if(isConfirm){
            let modal = document.getElementById("modal-body");
            modal.classList.remove("fade-in");
            modal.classList.add("fade-out");

            setTimeout(function(){
              self.modal = false;
              let state = false;
              self.$eventHub.$emit("modal-bar", state);

                },500);
              }
            })
          }
          if(self.isCreating){
            self.isCreating = false;
          }
        }
    });

    var isAuthenticated = this.$store.state.others.isAuthenticated;
    if (isAuthenticated) {
      // Dispatch actions && subscribe to rt events.
      this.$store.dispatch("users/getUsers");
      this.$store.dispatch("others/getCustomers");
      this.$store.dispatch("users/listenEvents");

      // listen to authenticated event
    } else {
      const _ = this;
      this.$eventHub.$on("authenticated", function() {
        _.$store.dispatch("users/getUsers");
        _.$store.dispatch("users/listenEvents");
      });
    }
  },

  components: {},
  data() {
    return {
      otherState:null,
      otherCountry:null,
      letters:false,
      editInput:false,
      types:['SA','A','B','C','D','E'],
      filteredUsers: [],
      filteredCustomers: [],
      isCreating: false,
      isEditting: false,
      selectedUser: null,
      password: "",
      password2: "",
      city:null,
      country:null,
      state:null,
      address:null,
      tel:null,
      name:null,
      lastName:null,
      email:null,
      age:null,
      nationalityFilter: "Nationality",
      user:{},
      customer:{},
      modal:false,
      loading:false,
      zipcode:null,
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
      ],
    };
  },

  methods: {
  /*  deleteInput() {
      document.getElementById('search-user').value = null;
      this.filteredCustomers = [];
      this.editInput = false;
    }, */
    ...mapActions("users", ["nextPage", "prevPage"]),
    deleteInput() {
      document.getElementById('search-user').value = null;
      if(this.nationalityFilter === 'Nationality') {
        this.filteredCustomers = [];
        this.editInput = false;
      } else {
        this.filteredByTypeReset()
        this.editInput = false;
      }

    },
    pageClass(n) {
      var cssClass = "pagination-link ";
      cssClass += n === this.index ? "is-current" : "";

      return cssClass;
    },
    ModifyUser(u){
      let C = JSON.parse(JSON.stringify(u));
      this.user = C;
      let state = true;
      this.$eventHub.$emit("modal-bar", state);
      this.modal = true;
    },
    ModifyCustomer(u){
      let C = JSON.parse(JSON.stringify(u));
      this.customer = C;
      let state = true;
      this.$eventHub.$emit("modal-bar", state);
      this.modal = true;
    },

    cancelForm(){
      const self = this;
      swal({
        title:'Are you sure you want to exit?',
        text:'Changes will not be saved',
        icon:'warning',
        buttons:{
          cancel:true,
          confirm:true
        }
      })
      .then(function(isConfirm){
        if(isConfirm){

            let modal = document.getElementById("modal-body");
            modal.classList.remove("fade-in");
            modal.classList.add("fade-out");

            setTimeout(function(){
              self.modal = false;
              let state = false;
              self.$eventHub.$emit("modal-bar", state);

            },500);

        }
      });
    },

    sendForm(){
      const self = this;
      if(self.customer.name === "" || self.customer.lastName === ""){
        swal({
            title: "Error",
            text: `Please provide a name for this customer`,
            icon: "warning",
            buttons: {
              cancel: false,
              confirm: true,
            }
        });
        return;
      }
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.customer.email) && !this.letters){

      // If an element doesn't exist, the swalAlert will return 'N/A'
      for (let el in this.customer){
        if(this.customer[el] == null){
          this.customer[el] = "N/A"
        }
      }
      swal({
          title: "Please confirm information",
          text: "Name" + " : " + this.customer.name + "\n" +
                "Age " + " : " + this.customer.age +  "\n" +
                "Email " + " : " + this.customer.email + "\n" +
                "Contact number " + " : " + this.customer.contactNumber + "\n" +
                "Country " + " : " + this.customer.country + "\n" +
                "State  " + " : " + this.customer.state + "\n" +
                "City  " + " : " + this.customer.city + "\n" +
                "Address  " + " : " + this.customer.address +  "\n",
          icon: "info",
          buttons: {
            cancel: true,
            confirm: true,
          }
          })
          .then(isConfirm => {

            if(isConfirm) {

              // Encrypt Password before sending
              if(typeof this.customer.password !== 'undefined') {
                const encrypted = bcrypt.hashSync(this.customer.password, salt);
                this.customer.password = encrypted;
              }
              console.log(this.customer);
              this.$store.dispatch("others/updateCustomer", this.customer).then(res => {
              this.$store.dispatch('others/getCustomers');
                swal({
                    title: "Customer Updated",
                    text: `${this.customer.name} has been updated!`,
                    icon: "success",
                    buttons: {
                      cancel: false,
                      confirm: false,
                    },
                    timer: 3200
                });


              let modal = document.getElementById("modal-body");
                modal.classList.remove("fade-in");
                modal.classList.add("fade-out");

                setTimeout(function(){
                  self.modal = false;
                  let state = false;
                  self.$eventHub.$emit("modal-bar", state);

                    },500);


              }).catch(error => {

              });

            } else {
              swal.close();
            }

          })

      } else {

      swal({
          title: "Error",
          text: "Please verify your information.",
          icon: "warning",
          timer:2000,
          buttons: {
            cancel: false,
            confirm: false,
          }
          })
      }
    },

    updateLot(uLot) {
      this.users.forEach(function(v, i) {
        v.forEach(function(lot, i) {
          if (lot.id === uLot.id) {
            for (var key in uLot) {
              lot[key] = uLot[key];
            }
          }
        });
      });
    },

    tagColor(u) {
      switch(u.type) {
        case 'SA':
          return 'background-color: #048C0F;padding: 2px 7px;border-radius: 3px;';
        case 'A':
          return 'background-color:#72CA0D;padding: 2px 11px;border-radius: 3px;';
        case 'B':
          return 'background-color:#8FB5FF;padding: 2px 11px;border-radius: 3px;';
        case 'C':
          return 'background-color:#E89005;padding: 2px 11px;border-radius: 3px;';
        case 'D':
          return 'background-color:#8A8A8A;padding: 2px 11px;border-radius: 3px;';
        case 'E':
          return 'background-color:#A99807;padding: 2px 11px;border-radius: 3px;';
      }
    },

    toggleUserUI() {
      // Clear form data
      if(document.getElementById('new-customer-form')){
          document.getElementById('new-customer-form').reset();
      }

        this.name = null;
        this.lastName = null;
        this.email = null;
        this.age = null;
        this.tel = null;
        this.state = null;
        this.country = null;
        this.city = null;
        this.address = null;
        this.password = '';
        this.password2 = '';
        this.zipcode = null;
      const _ = this;
      this.isCreating = !this.isCreating;
      this.isEditting = false;

      if(this.isCreating) {
        document.getElementById('search-user').style.display = 'none';
      } else {
        document.getElementById('search-user').style.display = 'block';
      }

      $(document).ready(function() {
        $("#new-customer-form").submit(function(e) {
          e.preventDefault();
          _.createUser();
          document.getElementById('search-user').style.display = 'block';
        });
      });
    },

    toggleEditUser(u) {
      const _ = this;
      this.isEditting = u === null ? false : true;
      this.selectedUser = u;
      this.isCreating = false;
      $(document).ready(function() {
        $("#edit-user-form").submit(function(e) {
          e.preventDefault();

          _.editUser(_.selectedUserWrapper.id);
        });
      });
    },

    createUser() {
      const _ = this;
      var form = $("#new-customer-form").serializeArray();

      let userInfo = {};

       if(!this.$v.invalid && this.letters == false) {

         form.forEach(input => {
         userInfo[input.name] = input.value;
      });
      userInfo["userType"] = "0";
      this.country != 'Other' ? userInfo["country"] = this.country : userInfo["country"] = this.otherCountry
      this.state != null ? userInfo["state"] = this.state : userInfo["state"] = this.otherState
      userInfo["zipcode"] = this.zipcode;

      this.loading = false;
      this.$store
        .dispatch("others/setNewCustomer", userInfo)
        .then(response => {
          _.isCreating = false;
          $("#new-customer-form")[0].reset();
          _.password = "";
          _.password2 = "";
            this.loading = true;
          swal({
            title: "Customer added!",
            text: `${response.name} has been added successfully!`,
            icon: "success",
            buttons: false,
            timer: 3300
          });

          // Clear form data
          document.getElementById('new-customer-form').reset();
          this.name = null;
          this.email = null;
          this.age = null;
          this.tel = null;
          this.state = null;
          this.country = null;
          this.city = null;
          this.address = null;
          this.password = '';
          this.password2 = '';
          this.zipcode = null;
          // Retrieve new customers
          this.$store.dispatch('others/getCustomers');
        })
        .catch(err => {
          this.loading = false;
          console.log('Error');
          console.log(err);
          swal({
            title: "¡Error!",
            text: `Something went wrong...`,
            icon: "error",
            buttons: false,
            timer: 2500
          });
        });

      } else {
        swal({
          title: "You entered unvalid info!",
          text: `Please, verify entered info.`,
          icon: "alert",
          buttons: false,
          timer: 3500
        });
      }

    },

    deleteUser() {

      swal.close();

      this.$store.dispatch("users/removeUser", { id: this.user.id }).then(response => {
          swal({
            title: "User Deleted",
            text: `${this.user.name} has been deleted`,
            icon: "success",
            buttons: false,
            timer: 3000
          });

          // Clear filteredUsers
          this.filteredUsers = [];

          // Retrieve new users
          this.$store.dispatch('users/getUsers');

        }).catch(err => {

          swal({
            title: "¡Oh oh!",
            text: `Something went wrong...`,
            icon: "error",
            buttons: false,
            timer: 2000
          });

        });
    },

    deleteCustomer() {

      const customerId = this.customer.id;
      const customerName = this.customer.name;
      const lastName = this.customer.lastName;
      console.log(customerId);
        swal({
          title: '¿Eliminar cliente?',
          text: `¿Estas seguro que quieres eliminar a ${customerName} ${lastName}?`,
          icon: 'warning',
          className:'prueba',
          buttons: {
            cancel:true,
            delete: { text: 'Delete', value: true }
          }
        }).then(value => {
          if(value) {

            console.log(customerId);
            // User pressed delete
            this.$store.dispatch("others/deleteCustomer", customerId).then(response => {
              swal({
                title: "Cliente eliminado",
                text: `¡${customerName} ha sido eliminado!`,
                icon: "success",
                buttons: false,
                timer: 3000
              });

                // Clear filteredUsers
                this.filteredCustomers = [];

                // Close Edit Modal
                // Close Edit User Modal
                let modal = document.getElementById("modal-body");
                  modal.classList.remove("fade-in");
                  modal.classList.add("fade-out");

                  setTimeout(() => { this.modal = false; let state = false; this.$eventHub.$emit("modal-bar", state); }, 500);

                // Retrieve new users
                this.$store.dispatch('others/getCustomers');

              }).catch(err => {

                console.log(err);

                swal({
                  title: "¡Oh oh!",
                  text: `Something went wrong...`,
                  icon: "error",
                  buttons: false,
                  timer: 2000
                });
            });
          }
        });
    },

    editUser() {
      const _ = this;
      const userId = this.selectedUserWrapper.id;
      var form = $("#edit-user-form").serializeArray();

      var userInfo = {};
      form.forEach(v => {
        userInfo[v.name] = v.value;
      });

      userInfo.id = userId;

      this.$store.dispatch("users/updateUser", userInfo).then(response => {
          _.isEditting = false;
          _.selectedUser = null;

          swal({
            title: "User Updated",
            text: `${response.name} has been updated!`,
            icon: "success",
            buttons: false,
            timer: 2000
          });

        }).catch(err => {
          swal({
            title: "¡Oh oh!",
            text: `Something went wrong...`,
            icon: "error",
            buttons: false,
            timer: 2000
          });
        });
    },

    searchCustomer(evt) {

      this.editInput = true;

      if(this.customers === null) {
        return;
      }



      // Check if user typed nothing
      if(typeof evt.target.value === 'number') {
        return;
      }

      if(evt.target.value === "" && this.nationalityFilter === "Nationality") {
        return this.filteredCustomers = [];
      }

      // Return an array with filtered value
      // It checks if user includes a name (Search by user)
        let  filteredCustomers2 = Array.from(this.customers.data);
      if(this.nationalityFilter && this.nationalityFilter !== "Nationality") {


          if(this.nationalityFilter === 'local') {
              if(evt.target.value !== ""){
                filteredCustomers2 = this.customers.data.filter(customer => customer.country ? customer.country.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("mexico") : false);
                filteredCustomers2 = filteredCustomers2.filter(customer => customer.name.toLowerCase().includes(evt.target.value.toLowerCase()));
                this.filteredCustomers = [...filteredCustomers2]
              } else {
                this.filteredCustomers = this.customers.data.filter(customer => customer.country ? customer.country.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("mexico") : false);
              }
          }
          else {
            if(evt.target.value !== ""){

              filteredCustomers2 = filteredCustomers2.filter(customer => customer.country !== null && customer.country !== "" ? !customer.country.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("mexico") : true);

              filteredCustomers2 = filteredCustomers2.filter(customer2 => customer2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(evt.target.value.toLowerCase()));

              this.filteredCustomers = [...filteredCustomers2]
            } else {
              this.filteredCustomers = this.customers.data.filter(customer => customer.country ? !customer.country.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("mexico") : true);
            }
          }

      } else {

         filteredCustomers2 =  this.customers.data.filter(user => user.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(evt.target.value.toLowerCase()));
         return this.filteredCustomers = [...filteredCustomers2]
      }
    },

    filteredByType(evt) {
      const nationality = evt.target.value;
      this.nationalityFilter = nationality;
      if(nationality === 'Nationality') {
        this.filteredCustomers = [];
        return;
      }

      if(nationality === 'local') {
        this.filteredCustomers = this.customers.data.filter(customer => customer.country ? customer.country.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("mexico") : false);
      }
      else {
        this.filteredCustomers = this.customers.data.filter(customer => customer.country ? !customer.country.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("mexico") : true);
      }
    },
    filteredByTypeReset() {


      if(this.nationalityFilter === 'Nationality') {
        this.filteredCustomers = [];
        return;
      }

      if(this.nationalityFilter === 'local') {
        this.filteredCustomers = this.customers.data.filter(customer => customer.country ? customer.country.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("mexico") : false);
      }
      else {
        this.filteredCustomers = this.customers.data.filter(customer => customer.country ? !customer.country.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("mexico") : true);
      }
    }

  },

  computed: {
    ...mapGetters({
      users: "users/users",
      customers: "others/customers"
    }),

    plusIcon() {
      return this.isCreating ? "×" : "+";
    },

    getFilteredUsers() {
      if(this.filteredUsers.length === 0) {
        return this.users;
      }

      return this.filteredUsers;
    },

    getFilteredCustomers() {
      /* if(this.filteredCustomers.length === 0) {

        if(this.customers.data.length > 0) {
          return this.customers.data.sort(function(a,b) {
            if(a.name < b.name) { return -1 }
            if(a.name > b.name) { return  1 }
          });
        }

      }

        return this.filteredCustomers.sort(function(a,b) {
          if(a.name < b.name) { return -1 }
          if(a.name > b.name) { return  1 };
        }); */

        if(this.filteredCustomers.length === 0 && this.nationalityFilter === 'Nationality') {
          if(this.customers.data) {
            if(this.customers.data.length > 0) {
              return this.customers.data.sort(function(a,b) {
                if(a.name < b.name) { return -1 }
                if(a.name > b.name) { return  1 };
              });
            } else {
              return this.customers.data
            }
          } else {
            return null
          }
        }

        return this.filteredCustomers.sort(function(a,b) {
          if(a.name < b.name) { return -1 }
          if(a.name > b.name) { return  1 };
        });

    },

    createDisabled() {
      if (
        this.password === this.password2 &&
        this.password !== "" &&
        this.password2 !== ""
      ) {
        return false;
      }
      return true;
    },

    selectedUserWrapper() {
      if (this.selectedUser == null) {
        return {
          id: 0,
          name: "",
          email: "",
          type: "",
          createdAt: "",
          updatedAt: ""
        };
      } else {
        return this.selectedUser;
      }
    }

  },
  watch:{
    users(oV, nV){
      this.loading = true;
    },
    'customer.contactNumber'(oV,nV){
      if(oV){
        if(oV.match(/([a-zA-Z])+([ -~])*/)){
          this.letters = true;
        } else {
          this.letters = false;
        }
      }
    },
    tel(oV,nV){
      if(oV.match(/([a-zA-Z])+([ -~])*/)){
        this.letters = true;
      } else {
        this.letters = false;
      }
    }
  },
  validations:{
    tel:{
      required,

    },
    zipcode:{
      required,
      numeric
    },
    name:{
      required
    },
    lastName:{
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
    address:{
      required
    },
    email:{
      required,
      email
    },

    age:{
      required,
      numeric
    },

    password:{
      required
    },

    password2:{
      required
    }
  }
}
</script>

<style scoped lang="scss" src="../styles/main.scss">
  @import "~bulma/css/bulma.css";
  @import 'node_modules/bootstrap/scss/bootstrap';
  @import 'node_modules/bootstrap-vue/src/index.scss';

  .buttons {
    margin-top: 32px;
  }

  .table-head-color {
    color: #FFFFFF !important;
    font-weight: 600;
  }

  strong[data-v-87f50644] {
    color: #FFFFFF !important;
  }

  .fa-edit {
    cursor:pointer;
  }

  .titleFixed {
    position: fixed !important;
    -webkit-box-pack: justify !important;
    -ms-flex-pack: justify !important;
    justify-content: space-between !important;
    color: #2a333c!important;
    z-index: 1;
  }

  @keyframes autofill {
      to {
          color: white;
          background: #3f4c5c;
      }
  }

  .input:-webkit-autofill {
      animation-name: autofill;
      animation-fill-mode: both;
      -webkit-animation-name: autofill;
      -webkit-animation-fill-mode: both;
  }

  @keyframes autofill {
      to {
          color: white;
          background: #3f4c5c;
      }
  }

  input:-webkit-autofill {
      animation-name: autofill;
      animation-fill-mode: both;
      -webkit-animation-name: autofill;
      -webkit-animation-fill-mode: both;
  }

  .delete-button:hover,
  .swal-button--delete {
    background: #9E1616!important;
  }

  button.swal-button.swal-button--delete {
    background:#b33737!important;
  }
</style>
