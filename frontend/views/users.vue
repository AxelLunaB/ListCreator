<template>
    <div class="app-container container has-navbar-fixed-top">
      <!-- <div class="columns is-multiline"> -->
      <!-- Buttons / Search -->
      <div class="buttons has-addons is-right">
        <span v-on:click="toggleUserUI()" class="button">{{plusIcon}}</span>
        <span class="button disabled">Buscar</span>
      </div>
      <!-- USERS TABLE -->
      <div class="box" v-if="!isCreating && !isEditting">
          <!-- header -->
        <div class="columns is-mobile">
          <div class="column is-4">NOMBRE</div>
          <div class="column is-4">EMAIL</div>
          <div class="column is-2">TIPO</div>
          <div class="column is-2"></div>
        </div>
        <div v-for="u in users" :key="u.id" class="columns is-mobile is-multiline">
          <div class="column is-4">{{u.name}}</div>
          <div class="column is-4 parent-overflow"><p class="">{{u.email}}</p></div>
          <div class="column is-2 has-text-centered"><span :class="`tag ${tagColor(u)}`">{{u.type}}</span></div>
          <div class="column is-2 has-text-centered">
            <span v-on:click="toggleEditUser(u)" class="icon has-text-info has-text-grey">
            <i class="fas fa-edit fa-lg"></i>
            </span>
            <span v-on:click="deleteUser(u.id)" class="icon has-text-info has-text-grey">
            <i class="fas fa-eraser fa-lg"></i>
            </span>
          </div>
        </div>
        <a v-on:click="prevPage" class="pagination-previous">Anterior</a>
        <a v-on:click="nextPage" class="pagination-next">Siguiente</a>
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
      </div>
      <!-- CREATE -->
      <div v-if="isCreating">
        <div class="columns is-centered is-mobile">
          <div class="column box padding-15 padding-correction is-three-fifths-tablet">
            <!-- <div class="container padding-15 padding-correction "> -->
              <h1 class="title is-1">Usuario nuevo</h1>
              <h1 class="title is-5">Llena los campos a continuación para crear un nuevo usuario.</h1>
              <form id="new-user-form">
                <!-- <div class="columns is-multiline"> -->
                  <!-- <div class="column is-half-tablet"> -->
                    <div class="field">
                      <label class="label">Nombre Completo</label>
                      <div class="control">
                        <input class="input" type="text" name="name" placeholder="" required>
                      </div>
                    </div>
                  <!-- </div> -->
                  <!-- <div class="column is-half-tablet"> -->
                    <div class="field">
                      <label class="label">Correo electrónico</label>
                      <div class="control">
                        <input class="input" type="email" name="email" placeholder="ejemplo@altozano.com.mx" required>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Contraseña</label>
                      <div class="control">
                        <input v-model="password" class="input" type="password" name="password" placeholder="" required>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Confirmar contraseña</label>
                      <div class="control">
                        <input v-model="password2" class="input" type="password" placeholder="" required>
                      </div>
                    </div>
                  <!-- </div> -->
                  <!-- <div class="column is-half-tablet"> -->
                    <div class="field">
                      <label class="label">Tipo</label>
                      <div class="control">
                        <div class="select">
                          <select name="type">
                            <option value="A">ADMINISTRADOR</option>
                            <option value="V">ASISTENTE DE VENTA</option>
                            <option value="P">PANTALLA INTERACTIVA</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  <!-- </div> -->
                <!-- </div> -->
              <div class="buttons">
                <button v-on:click="toggleUserUI()" class="button is-light button-width">
                  Cancelar
                </button>
                <button
                  class="button is-success button-width" :disabled="createDisabled">Crear</button>
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

//TODO: Validate fields.
//TODO: Add delete confirmation.
//TODO: Add creation & deletion success / error messages.
export default {
  mounted: function() {
    var isAuthenticated = this.$store.state.others.isAuthenticated;
    if (isAuthenticated) {
      // Dispatch actions &&  subscribe to rt events.
      this.$store.dispatch("users/getUsers");
      this.$store.dispatch("users/listenEvents");

      // listen to authenticated event
    } else {
      let _ = this;
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

      var userInfo = {};
      form.forEach(v => {
        userInfo[v.name] = v.value;
      });
      this.$store
        .dispatch("users/newUser", userInfo)
        .then(response => {
          _.isCreating = false;
          $("#new-user-form")[0].reset();
          _.password = "";
          _.password2 = "";
          swal({
            title: "Usuario añadido",
            text: `${response.name} añadido con èxito`,
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
};
</script>
<style lang="scss" src="../styles/main.scss">
</style>





