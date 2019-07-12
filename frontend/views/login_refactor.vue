<template>
  <div class="login-wrapper row" style="display:flex; align-items:center;">
<!-- Begin page -->
    <div class="wrapper-page container" id="main-cards">
      <div class="row main">
        <div class="card col-md-4 col-sm-12"  :class="{ fadeEntry: isLoaded }">
          <div class="card-body">
            <h3 class="text-center">
              <a href="index.html" class="logo"><img src="../assets/logo_bco.png" alt="logo-img" width="250px"></a>
            </h3>
            <h5 class="text-center">Sign In</h5>
            <form class="form-horizontal m-t-20" id="login_form">
            <div class="form-group inputs">
              <div class="col-12">
                <input class="form-control" type="text" required="" name="email" placeholder="Email">
              </div>
            </div>
            <div class="form-group">
              <div class="col-12">
                <input class="form-control" type="password" required="" name="password" placeholder="Password">
              </div>
            </div>
            <div class="form-group">
              <div class="col-12">
                <div class="checkbox checkbox-primary">
                  <input id="checkbox-signup" type="checkbox">
                  <label for="checkbox-signup" style="color:white;">
                  Remember me
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group text-center m-t-40">
              <div class="col-12">
                <button class="btn btn-primary btn-block btn-lg waves-effect waves-light" type="submit"> {{ logMessage }} </button>
              </div>
            </div>
            <div class="form-group row" style="margin-bottom:0;">
              <div class="col text-center">
                <a href="pages-recoverpw.html" class="text-white"><i class="fa fa-lock m-r-5"></i> Forgot your password?</a>
              </div>
            </div>
            </form>
          </div>
        </div>
        <div class="card col-md-5 col-sm-12 right-card" style="background:#3f4c5c"  :class="{ fadeEntry: isLoaded }">
           <h5 class="text-center">Real-time updates</h5>
           <hr style="margin:0;">
          <div class="row h-100">
            <div class="col-12">
              <table class="table">
                  <tbody>
                    <tr>
                        <td class="text-center">Name</td>
                        <td class="text-center">#1525</td>
                        <td class="text-center"><b style="color:#9e0000;">Sold</b><br> 26/05/2019</td>
                    </tr>
                    <tr>
                        <td class="text-center">Name</td>
                        <td class="text-center">#1535</td>
                        <td class="text-center"><b style="color:#9e0000;">Sold</b><br> 26/06/2019</td>
                    </tr>
                    <tr>
                        <td class="text-center">Name</td>
                        <td class="text-center">#1333</td>
                        <td class="text-center"><b style="color:#dad900;">Taken</b><br> 26/06/2019</td>
                    </tr>
                    <tr>
                        <td class="text-center">Name</td>
                        <td class="text-center">#2232</td>
                        <td class="text-center"><b style="color:#9e0000;">Sold</b><br> 26/06/2019</td>
                    </tr>
                  </tbody>
              </table>
            </div>
</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import swal from 'sweetalert';

export default {
  data() {
    return {
      logMessage: "Log in",
      isLoaded: true
    }
  },
  mounted: function () {
    this.$store.commit("resetState");
    // this.$store.commit("addButton", false);
    const _ = this;
    $(document).ready(function () {
      // console.log("ready");
      $("#login_form").on("submit", function (e) {
        e.preventDefault();
        _.submitForm();
      });
    });
    var slideIndex = 0;
  },
  methods: {
    submitForm() {
      const self = this;
      document.getElementById("main-cards").style.opacity = "0.5";
      document.getElementById("main-cards").style.transition = "all 0.2s"
      document.body.style.cursor = "wait";
      const loginData = $("#login_form").serializeArray();
      self.logMessage = "Logging..."
      // const v = this;
      $.ajax({
        url: "/authentication",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          strategy: "local",
          email: loginData[0].value,
          password: loginData[1].value
        }),
        success: function (data) {
          window.location.replace("/");
          document.body.style.cursor = "auto";
          self.logMessage = "Logged!"
        },
        error: function (error) {
          document.getElementById("main-cards").style.opacity = "1";
          document.body.style.cursor = "auto";
          if (error.status === 401) {
            swal("Correo o contraseña incorrectos");
            self.logMessage = "Log in"
          } else if (error.status === 400) {
            swal("Correo o contraseña incorrectos");
            self.logMessage = "Log in"
          } else {
            swal("Error inesperado, vuelve a intentarlo mas tarde.");
            self.logMessage = "Log in"
          }
        }
      });
    }
  }
};
</script>


<style lang="scss">

@import "~bulma/css/bulma.css";
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

html,
body {
  height: 100%;
}

.login-wrapper {
  min-height:100%;
  background:url('../assets/background.png');
  background-size:cover;
  box-shadow:inset 0 0 0 2000px rgba(0, 23, 0, 0.1);
  height: 100%;
}

.card {
  background: #3f4c5c;
  color:white!important;
  border: none;
}

h4 {
  color: white!important;
}


.btn {
  background: #2a333c;
  border:none;
}

.btn:hover {
  background: #1f262c;
  border:none;
}

.main {
  display:flex;
  justify-content: space-around;
  height:100%;
  align-items: center;
}

.text-white {
  font-size: 0.7rem;
}

.form-group a:hover {
  color: rgb(190, 190, 190)!important;
  text-decoration: none;
  transition: 0.6s;
}

.form-group a {
  transition: 0.6s;
}

.wrapper-page {
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.right-card {
  padding: 20px;
  box-sizing: content-box;
}

h5 {
  font-weight: lighter;
  margin: 20px 10px;
}

.form-control:focus {
  box-shadow:none!important;
  background: rgb(230, 244, 252);
  border: none!important;
}

.btn-primary:active,
.btn-primary:focus  {
    color: #fff;
    background-color:#1f262c!important;
    box-shadow:none!important;
    border:none!important;
}

.swal-button {
  background: #1f262c;
  color: white;
}

.table {
  background: none;
  color: white;
  height: 100%;

}

.table td {
  padding: 0;
}

.fadeEntry {
  animation: fadeInEntry 1s forwards;
}

@keyframes fadeInEntry {
  0%   {
    opacity: 0;
     }

  100% {
    opacity: 1;
    }
}

@media (min-width: 1200px) {
  .container {
      max-width: 1500px;
  }
}

@media (max-width: 768px) {
  .right-card {
    margin-top: 10px;
  }
}

</style>
