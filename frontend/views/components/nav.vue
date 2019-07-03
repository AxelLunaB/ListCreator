<template>
  <nav class="navbar is-transparent is-fixed-top navbar-height">
    <div class="navbar-brand">
      <router-link class="navbar-item logo" to="/">
          <img src="../../assets/logo_bco_sm.png" alt="Giada Real State" style="max-width:100%"   height="auto">
      </router-link>
      <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div id="navbarExampleTransparentExample" class="navbar-menu" >
      <div class="navbar-start">
         <router-link class="navbar-item" to="/">Giada Tulum</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item" style="padding:0;">
          <div class="field is-grouped" style="margin:0;">
            <!-- <p class="control"> -->
              <div class="navbar-item has-dropdown is-hoverable" style="width:100%;">
                <a class="navbar-link">{{currentUser.name}}</a>
                <div class="navbar-dropdown is-boxed"  style="background-color: #d4ebf0">
                  <hr class="navbar-divider">
                  <a href="/logout" class="navbar-item is-active" id="logout-btn" style="color:white;">Salir</a>
                </div>
              </div>
            <!-- </p> -->
          </div>
        </div>
      </div>
    </div>
    <!-- <div :class="`modal is-active`"> -->
    <div :class="`modal ${searchActive ? 'is-active' : ''}`">
      <div v-on:click="hideModal()" class="modal-background"></div>
      <div class="modal-content">
        <!-- Any other Bulma elements you want -->
      <div class="box">
          <form id="nav-search-form">
            <div class="columns">
              <div class="column is-6">
                <input class="input" type="text" placeholder="Nivel" name="level">
              </div>
              <div class="column is-6">
                <input class="input" type="text" placeholder="# de Departamento" name="deptnumber">
              </div>
            </div>
          </form>
          <br>
          <button class="button" v-on:click="triggerSearch()">Buscar</button>
        </div>
      </div>
</div>
  </nav>

</template>
<script>
import $ from "jquery";
import cookie from "../../utils/cookie";
import { mapGetters,mapActions } from "vuex";
export default {
  name: "appnav",
  mounted: function() {
    var _ = this;
    $(document).ready(function() {
      $("#nav-search-form").on("submit", function(event) {
        event.preventDefault();
        _.triggerSearch();
      });
    });
    this.$eventHub.$on("hide-search-modal", () => {
      _.searchActive = false;
    });
  },
  data() {
    return {
      fields: [
        ["division", "Sección"],
        ["cluster", "Clúster"],
        ["block", "Manzana"],
        ["lotnumber", "Número de Lote"],
        ["status", "Estado"]
      ],
      selectedFields: [],
      searchActive: false
    };
  },
  computed: {
    ...mapGetters({
      hasPlusButton: "others/hasPlusButton",
      isAdmin: "users/isAdmin",
      currentUser: "users/currentUser",
      clusters: "others/clusters",
    }),

    count() {
      // return this.$store.state.count;
    },
    username() {
      // return this.$store.state.user.name;
    },
    addButton() {
      // return this.$store.state.hasAddButton;
    }
  },
  methods: {
    ...mapActions({
      setView : 'departments/setListType'
    }),
    addFilter() {
      var i = $("#search-filter-select")[0];
      this.selectedFields.push(this.fields[i.value]);
    },
    removeFilter(i) {
      this.selectedFields.splice(i, 1);
    },
    showModal() {
      this.searchActive = true;
    },
    hideModal() {
      this.searchActive = false;
    },
    triggerSearch() {
      var data = $("#nav-search-form").serializeArray();
      var result = [];
      data.forEach(v => {
        result.push([v.name, v.value]);
      });
      this.$eventHub.$emit("go-search", result);
      this.searchActive = false;
    },
    triggerAddButton() {
      this.$eventHub.$emit("add-button-clicked");
    },
    setViewType() {
      this.$store.commit('viewType')
    }
  },
};
</script>

<style>

@import "~bulma/css/bulma.css";

.fa-list {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.navbar {
  background: rgb(81, 111, 77);
}

.logo {
  display: flex;
  justify-content: center;
  align-items:center;
}

.navbar-start a,
.navbar-item {
  color: white;
  transition:0.5s;
}

.navbar-start a:hover {
  color: rgb(230, 255, 232);
  transition:0.5s;
  text-decoration: none;
}

.navbar-dropdown {
  background:  rgb(185, 195, 184)!important;
  color:white;
}

.navbar-dropdown a:hover {
  color:rgb(230, 255, 232)!important;
  text-decoration: none!important;
}

a.navbar-item:hover {
  background: none;
}

a.navbar-item.is-active {
  background: none;
}

@media screen and (min-width: 1024px) {
.navbar-link::after {
    border: 3px solid #ffffff;
    border-right: 0;
    border-top: 0;
    }
}

@media screen and (max-width: 1024px) {
  .navbar-brand {
    display: flex!important;
    width: 100%;
  }

  .navbar-burger span {
    background: rgb(160, 214, 163);
  }

  .navbar-menu  {
  width: 100%;
  background: #728d70!important;
}
}

</style>
