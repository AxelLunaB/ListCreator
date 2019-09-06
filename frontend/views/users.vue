<template>
  <div class="app-container container has-navbar-fixed-top">
      <!-- <div class="columns is-multiline"> -->

      <!-- Buttons / Search -->
      <div class="buttons has-addons is-right">
        <span v-on:click="toggleUserUI()" class="button" style="font-weight: 900; font-size: 18px;">{{ plusIcon }}</span>
        <!-- <span class="button disabled">Search</span> -->
      </div>

      <!-- USERS TABLE -->
      <div class="box table" v-if="!isCreating && !isEditting" style="background: #3c4857; color: #FFFFFF;">

        <!-- header -->
        <div class="columns is-mobile" style="background: #2c36426b; border-radius: 6px;">
          <div class="column is-4"><p class="table-head-color" style="font-weight: 600;">Name</p></div>
          <div class="column is-4"><p class="table-head-color" style="font-weight: 600;">Email</p></div>
          <div class="column is-4"><p class="table-head-color" style="text-align: center; font-weight: 600;">Type</p></div>
        </div>

        <div v-for="u in users" :key="u.id" class="columns is-mobile is-multiline">
          <div class="column is-4">{{u.name}}</div>
          <div class="column is-4 parent-overflow"><p class="">{{u.email}}</p></div>
          <div class="column is-4 has-text-centered"><span :class="`tag ${tagColor(u)}`">{{u.type}}</span></div>
            <!-- <span v-on:click="toggleEditUser(u)" class="icon has-text-info has-text-grey">
            <i class="fas fa-edit fa-lg"></i>
            </span>
            <span v-on:click="deleteUser(u.id)" class="icon has-text-info has-text-grey">
            <i class="fas fa-eraser fa-lg"></i>
            </span> -->
        </div>
      </div>

        <div style="display: none;">
          <a v-on:click="prevPage" class="pagination-previous">Anterior</a>
          <a v-on:click="nextPage" class="pagination-next">Siguiente</a>
        </div>

        <!-- <div v-if="chunkedUsers.length > 1">
          <nav class="pagination is-centered" role="navigation" aria-label="pagination">
            <a v-on:click="prevPage" class="pagination-previous">Previous</a>
            <a v-on:click="nextPage" class="pagination-next">Next page</a>
            <ul class="pagination-list">
              <li v-for="n in pages" :key="n" v-on:click="goToPage(n)">
                <a :class="pageClass(n)" aria-label="Goto page 1">{{n+1}}</a>
              </li>
            </ul>
          </nav>
        </div> -->

      <!-- CREATE -->
      <div v-if="isCreating">
        <div class="columns is-centered is-mobile">
          <div class="column box padding-15 padding-correction is-three-fifths-tablet" style="background: rgb(60, 72, 87); color: rgb(255, 255, 255);">
            <!-- <div class="container padding-15 padding-correction "> -->
              <h1 class="titleFixed is-1 is-spaced" style="font-size:40px; font-weight: 600; margin-bottom: 18px;">New User</h1>
              <h2 class="subtitle is-4" style="color: rgb(255, 255, 255); font-size: 20px;">Fill out all the fields to add a new user.</h2>
              <form autocomplete="off" id="new-user-form">
                <!-- <div class="columns is-multiline"> -->
                  <!-- <div class="column is-half-tablet"> -->
                    <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Fullname</label>
                      <div class="control">
                        <input class="input" type="text" name="name" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                      </div>
                    </div>
                  <!-- </div> -->
                  <!-- <div class="column is-half-tablet"> -->
                    <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Email</label>
                      <div class="control">
                        <input class="input" type="email" name="email" placeholder="ejemplo@altozano.com.mx" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Age</label>
                      <div class="control">
                        <input class="input" type="number" min="18" max="100" name="age" placeholder="18" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Phone Number</label>
                      <div class="control">
                        <input class="input" type="number" min="18" max="15" name="contactNumber" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Password</label>
                      <div class="control">
                        <input v-model="password" class="input" type="password" name="password" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" placeholder="" required>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255); font-weight: 400;">Confirm Password</label>
                      <div class="control">
                        <input v-model="password2" class="input" type="password" placeholder="" style="background-color: #2a333c; border: 1px solid #4a5869; color: #797c80;" required>
                      </div>
                    </div>
                  <!-- </div> -->

                  <!-- <div class="column is-half-tablet"> -->
                    <div class="field">
                      <label class="label" style="color: rgb(255, 255, 255);">Type</label>
                      <div class="control">
                        <div class="select">
                          <select name="type" style="background: #2a333c; border: 1px solid rgb(74, 88, 105); color: white; font-size: 15px;">
                            <option value="A">Admin</option>
                            <option value="V">Sales Assistant</option>
                            <option value="P">Interactive Screen</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  <!-- </div> -->
                <!-- </div> -->

              <div class="buttons" style="margin-top: 32px;">
                <button v-on:click="toggleUserUI()" class="button is-light button-width">
                  Cancel
                </button>
                <button class="button is-success" style="background: #17a2b8 !important;" :disabled="createDisabled">Add User</button>
                <!-- <button class="button is-success button-width" :disabled="createDisabled">Add User</button> -->
              </div>
              </form>
              <br>
            <!-- </div> -->
          </div>
        </div>
      </div>

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
import $ from "jquery";
import { mapGetters, mapActions } from "vuex";
import swal from "sweetalert";

// TODO: Validate fields.
// TODO: Add delete confirmation.
// TODO: Add creation & deletion success / error messages.
export default {
  mounted: function() {
    var isAuthenticated = this.$store.state.others.isAuthenticated;
    if (isAuthenticated) {
      // Dispatch actions && subscribe to rt events.
      this.$store.dispatch("users/getUsers");
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
      isCreating: false,
      isEditting: false,
      selectedUser: null,
      password: "",
      password2: ""
    };
  },

  methods: {
    ...mapActions("users", ["nextPage", "prevPage"]),
    pageClass(n) {
      var cssClass = "pagination-link ";

      cssClass += n === this.index ? "is-current" : "";
      // console.log(n,cssClass);

      return cssClass;
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
      switch (u.type) {
        case "A":
          return "is-link";
        case "P":
          return "is-primary";
        case "V":
          return "is-success";
      }
    },

    toggleUserUI() {
      const _ = this;
      this.isCreating = !this.isCreating;
      this.isEditting = false;
      $(document).ready(function() {
        $("#new-user-form").submit(function(e) {
          e.preventDefault();
          _.createUser();
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
      var form = $("#new-user-form").serializeArray();

      let userInfo = {};

      form.forEach(input => {
        userInfo[input.name] = input.value;
      });

      console.log('User Info');
      console.log(userInfo);

      this.$store
        .dispatch("users/newUser", userInfo)
        .then(response => {
          _.isCreating = false;
          $("#new-user-form")[0].reset();
          _.password = "";
          _.password2 = "";
          swal({
            title: "User added!",
            text: `${response.name} has been added successfully!`,
            icon: "success",
            buttons: false,
            timer: 3300
          });
        })
        .catch(err => {
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
    },

    deleteUser(userId) {
      // console.log(userId);
      const _ = this;

      this.$store
        .dispatch("users/removeUser", { id: userId })
        .then(response => {
          swal({
            title: "Usuario eliminado",
            icon: "success",
            buttons: false,
            timer: 1500
          });
        })
        .catch(err => {
          swal({
            title: "¡Error!",
            text: `Error inesperado, vuelve a intentarlo mas tarde.`,
            icon: "error",
            buttons: false,
            timer: 1750
          });
        });
      // $.ajax({
      //   method: "DELETE",
      //   url: "/users/" + userId,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: vinst.cookie()
      //   },
      //   success: data => {
      //     var index = vinst.users.findIndex(element => {
      //       return element.id === userId;
      //     });
      //     vinst.users.splice(index, 1);
      //     alert("usuario eliminado");
      //   },
      //   error: err => {
      //     // console.log(err);
      //     if (err.status === 409) {
      //       alert("No puedes borrarte a ti mismo!");
      //     }
      //     // alert('Error');
      //   }
      // });
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

      this.$store
        .dispatch("users/updateUser", userInfo)
        .then(response => {
          _.isEditting = false;
          _.selectedUser = null;
          swal({
            title: "Usuario modificado",
            text: `${response.name} actualizado con èxito`,
            icon: "success",
            buttons: false,
            timer: 1500
          });
        })
        .catch(err => {
          swal({
            title: "¡Error!",
            text: `Error inesperado, vuelve a intentarlo mas tarde.`,
            icon: "error",
            buttons: false,
            timer: 1750
          });
        });
    }
  },

  computed: {
    ...mapGetters({
      users: "users/users"
    }),

    plusIcon() {
      return this.isCreating ? "x" : "+";
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

  .titleFixed {
    position: fixed !important;
    -webkit-box-pack: justify !important;
    -ms-flex-pack: justify !important;
    justify-content: space-between !important;
    color: #2a333c!important;
    z-index: 1;
  }

</style>