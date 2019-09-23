<template>
  <nav class="navbar navbar-expand-lg navbar-custom" style="z-index: 3;">
    <a class="navbar-brand" href="/"><img src="../../assets/logo_bco_sm.png" width="180px" height="43px"></a>
    <div class="mobile-container-flex" style="display:flex;">
      <ul class="navbar-nav ml-auto icons-bar">
          <div class="notifications-bar hide" data-toggle="collapse" href="#notifications" data-target="#notifications">
            <i class="far fa-bell"></i>
          </div>

          <div class="fullscreen-bar hide" @click="goFullscreen">
            <i class="fas fa-compress"></i>
          </div>

        <div class="image-bar" data-toggle="collapse" href="#notifications" data-target="#menu" style="border-radius:50px;">

          <!--<i class="fas fa-user"></i>-->
        <!-- <img v-if="isAdmin" style="width: 36px; height: 36px" :src="'https://giada-real.s3.us-east-2.amazonaws.com/u_i/'+ currentUser.id +'.png'"/> -->
        <img style="width: 38px; height: 36px:border-radius:50px;" src="../../assets/avatar.png"/>
        </div>
        <span class="main-menu collapse"  id="notifications" style="position:fixed; top:60px; right:120px">
          <a href="#">Notifications</a>
          <li class="dropdown-divider"></li>
          </span>
        <span class="main-menu collapse" style="position:fixed; top:60px; right:16px" id="menu">
          <p style="color: white; margin: 0">{{currentUser.name}}</p>
          <li class="dropdown-divider"></li>
          <router-link to="/">Home</router-link>
          <!-- <a href="/">Home</a> -->
          <li class="dropdown-divider"></li>
          <router-link v-if="isAdmin" to="/admin/users">Users</router-link>
          <li v-if="isAdmin" class="dropdown-divider"></li>
          <a href="/logout"><b>Log out</b></a>
          </span>

        </ul>
    </div>
  </nav>
</template>
<script>
import $ from "jquery";
import "../../../node_modules/bootstrap/js/dist/collapse"
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
    $(document).on('click',function(){
      $('.collapse').collapse('hide');
})
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
      searchActive: false,
      isFullscreen: false
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
    },
    goFullscreen: function() {
           this.isFullscreen = !this.isFullscreen
           if(this.isFullscreen == false) {
              if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
              } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
              } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
              }
           }
           if(this.isFullscreen == true) {
             var elem = document.documentElement;
              if (elem.requestFullscreen) {
                elem.requestFullscreen();
              } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
              } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                elem.webkitRequestFullscreen();
              } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen();
              }
           }
    }
  }
};
</script>

<style>

.icons-bar > div {
  width:40px;
  height:40px;
  border-radius: 30px;
  border:2px solid rgb(209, 218, 207);
  margin-left: 10px;
  cursor:pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fas, .far {
  color: white;
}

.navbar-custom {
  position: fixed!important;
  top: 0!important;
  left: 0!important;
  right: 0!important;
  background:#2a333c;
}

.main-menu {
  background: #a7a7a7;
  border-radius: 3px;
  text-align: left;
  width: 120px;
  padding: 10px;
}

.main-menu a {
  color: white;
}

.main-menu a:hover {
  color: white;
  text-decoration: none;
}

.icons-bar {
  flex-direction: row!important;
}

@media (min-width: 992px) {
  .mobile-container-flex {
    width: 100%;
    }
}

@media (max-width: 768px) {
  .hide {
    display:none!important;
    }
}

</style>
