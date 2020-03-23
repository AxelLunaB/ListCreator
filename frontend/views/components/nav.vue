<template>
  <nav class="navbar navbar-expand-lg navbar-custom" style="z-index: 3;">
    <a class="navbar-brand grow" href="/"><img src="../../assets/logo-transparent-white.png" width="160px" height="53px"></a>
    <div class="mobile-container-flex" style="display:flex;">
      <ul class="navbar-nav ml-auto icons-bar">
          <div class="fullscreen-bar hide" @click="goFullscreen">
            <i class="fas fa-compress grow"></i>
          </div>
        <div class="image-bar" data-toggle="collapse" href="#notifications" data-target="#menu" style="border-radius:50px;">
        <img class="grow" style="width: 18px;border-radius:50px;" src="../../assets/avatar.png"/>
        </div>
        <span class="main-menu collapse" style="position:fixed; top:80px; right:14px" id="menu">
          <p style="color: white; margin: 0">Welcome!, {{currentUser.name}}</p>
          <li class="dropdown-divider"></li>
          <router-link to="/">My Wishlists</router-link>
          <li class="dropdown-divider"></li>
          <a href="/logout"><b>Logout</b></a>
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

    $(document).on('click',function(){
      $('.collapse').collapse('hide');
    })
  },
  data() {
    return {
      isFullscreen: false
    };
  },
  computed: {
    ...mapGetters({
      isAdmin: "users/isAdmin",
      currentUser: "users/currentUser",
    })
  },
  methods: {
    ...mapActions({

    }),

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
  background:#100c31;
}

.main-menu {
  background: #310c2d;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: left;
  width: 140px;
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

.grow {
  transition: all .2s ease-in-out;
}
.grow:hover {
  transform: scale(1.2);
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
