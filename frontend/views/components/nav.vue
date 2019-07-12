<template>
  <nav class="navbar navbar-expand-lg navbar-custom">
    <a class="navbar-brand" href="#"><img src="../../assets/logo_bco_sm.png" width="180px" height="43px"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fas fa-bars"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <!-- <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul> -->
      <!-- <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form> -->
      <ul class="navbar-nav ml-auto icons-bar">
        <div class="notifications-bar">
          <i class="far fa-bell"></i>
        </div>
        <div class="fullscreen-bar" @click="goFullscreen">
          <i class="fas fa-compress"></i>
        </div>
        <div class="image-bar">
          <i class="fas fa-user"></i>
        </div>
        </ul>
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
  border:2px solid white;
  margin-left: 10px;
  cursor:pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fas, .far {
  color: white;
}

</style>
