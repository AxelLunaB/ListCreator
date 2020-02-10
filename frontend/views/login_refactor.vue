<template>
  <div class="login-wrapper row" style="display:flex; align-items:center;">
      <div class="row main" style="width:104%;overflow:hidden;" v-if="user === undefined">
        <div class="card col-md-5 col-xl-4 col-sm-12 slide-in-bottom slide-in-bottom" id='main-select'>
          <div class="card-body">
            <h3 class="text-center">
              <img src="../assets/logo_bco_sm.png" alt="logo-img" width="250px">
            </h3>
            <h5 class="text-center" style="margin-bottom:36px;margin-top:27px;">Welcome,<br>Please tell us who are you.</h5>
              <div class="col-12 button-option">
                <button class="btn btn-primary btn-block btn-lg waves-effect waves-light button-mobile" @click="selectUser('exec')"> HOMIA </button>
              </div>
              <div class="col-12 button-option">
                <button class="btn btn-primary btn-block btn-lg waves-effect waves-light button-mobile" @click="selectUser('cli')"> Client </button>
              </div>
          </div>
        </div>
      </div>

    <div class="wrapper-page container fadeEntry" id="main-cards2" v-else-if="user === 'cli'">
      <div class="row main">
        <div class="card col-md-5 col-xl-4 col-sm-12 fadeEntry" id="login-cli">
          <div class="card-body">
            <h3 class="text-center" style="margin-bottom:36px;">
              <a href="index.html" class="logo"><img src="../assets/logo_bco_sm.png" alt="logo-img" width="250px"></a>
            </h3>
            <h5 style="text-align:center;font-size:1rem;">Welcome, client</h5>
            <form class="form-horizontal m-t-20" id="login_form_client">
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
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customCheck1">
                  <!-- <label class="custom-control-label" for="customCheck1">Remember me</label>-->
                </div>
              </div>
            </div>
            <div class="form-group text-center m-t-40">
              <div class="col-12">
                <button class="btn btn-primary btn-block btn-lg waves-effect waves-light button-mobile" @click="submitClient($event)" style="font-size:1rem;"> {{ logMessage }} </button>
              </div>
            </div>
            <!-- <div class="form-group row" style="margin-bottom:0;">
              <div class="col text-center">
                <a href="pages-recoverpw.html" class="text-white"><i class="fa fa-lock m-r-5"></i> Forgot your password?</a>
              </div>
            </div> -->
            </form>
          </div>
        </div>
        <!-- <div class="card col-md-5 col-sm-12 right-card fadeEntry" style="background:#3f4c5c">
           <h4 class="text-center">REAL-TIME UPDATES</h4>
           <hr style="margin:0;">
          <div class="row h-100">
            <div class="col-12">
              <table class="table table-striped table-dark">
                  <tbody>
                    <tr>
                        <td class="text-center" style="padding-top:14px;">Name</td>
                        <td class="text-center" style="padding-top:14px;">#1525</td>
                        <td class="text-center"><span style="color:#cd110f;">Sold</span><br> 26/05/2019</td>
                    </tr>
                    <tr>
                        <td class="text-center" style="padding-top:14px;">Name</td>
                        <td class="text-center" style="padding-top:14px;">#1535</td>
                        <td class="text-center"><span style="color:#cd110f;">Sold</span><br> 26/06/2019</td>
                    </tr>
                    <tr>
                        <td class="text-center" style="padding-top:14px;">Name</td>
                        <td class="text-center" style="padding-top:14px;">#1333</td>
                        <td class="text-center"><span style="color:#e89005;">Reserved</span><br> 26/06/2019</td>
                    </tr>
                    <tr>
                        <td class="text-center" style="padding-top:14px;">Name</td>
                        <td class="text-center" style="padding-top:14px;">#2232</td>
                        <td class="text-center"><span style="color:#cd110f;">Sold</span><br> 26/06/2019</td>
                    </tr>
                  </tbody>
              </table>
            </div>
          </div>
        </div> -->
      </div>
      <div class="note-user slide-in-bottom" @click="user = 'exec'">
        Not a client?
      </div>
    </div>

    <div class="wrapper-page container fadeEntry" id="main-cards" v-else-if="user === 'exec'">
      <div class="row main">
        <div class="card col-md-5 col-xl-4 col-sm-12" id="login-exec">
          <div class="card-body">
            <h3 class="text-center" style="margin-bottom:36px;">
              <a href="index.html" class="logo"><img src="../assets/logo_bco_sm.png" alt="logo-img" width="250px"></a>
            </h3>
            <h5 style="text-align:center;font-size:1rem;">Welcome, HOMIA</h5>
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
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customCheck2">
                  <!-- <label class="custom-control-label" for="customCheck1">Remember me</label> -->
                </div>
              </div>
            </div>
            <div class="form-group text-center m-t-40">
              <div class="col-12">
                <button class="btn btn-primary btn-block btn-lg waves-effect waves-light button-mobile" @click="submitForm($event)" style="font-size:1rem;"> {{ logMessage }} </button>
              </div>
            </div>
            <!-- <div class="form-group row" style="margin-bottom:0;">
              <div class="col text-center">
                <a href="pages-recoverpw.html" class="text-white"><i class="fa fa-lock m-r-5"></i> Forgot your password?</a>
              </div>
            </div> -->
            </form>
          </div>
        </div>
      </div>
        <div class="note-user slide-in-bottom" @click="user = 'cli'">
          Not a HOMIA Collaborator?
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
      logMessage: "Iniciar sesión",
      user:undefined
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
    selectUser(type){
      let modal = document.getElementById("main-select");
      modal.classList.remove("slide-in-bottom");
      modal.classList.remove("fadeEntry");
      setTimeout(() => modal.classList.add("fade-out"),0);
      if(type === 'exec') {
        setTimeout(() => this.user ='exec', 700);
      } else {
        setTimeout(() => this.user ='cli', 700);
      }

    },
    submitForm(e) {
      e.preventDefault();
      const self = this;
      document.getElementById("main-cards").classList.remove('fadeEntry');
      document.getElementById("main-cards").style.opacity = "0.5";
      document.getElementById("main-cards").style.transition = "all 0.2s"
      document.body.style.cursor = "wait";
      const loginData = $("#login_form").serializeArray();
      self.logMessage = "Logging..."

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
          document.body.style.cursor = "auto";
          self.logMessage = "Logged!"
          setTimeout(function(){
            window.location.replace("/");
          },500)
        },
        error: function (error) {
          document.getElementById("main-cards").style.opacity = "1";
          document.body.style.cursor = "auto";
          if (error.status === 401) {
            swal("wrong email or password");
            self.logMessage = "Log in"
          } else if (error.status === 400) {
            swal("wrong email or password");
            self.logMessage = "Log in"
          } else {
            swal("Unexpected error, please try again later.");
            self.logMessage = "Log in"
          }
        }
      });
    },
    submitClient(e){
      e.preventDefault();
      const self = this;
      document.getElementById("main-cards2").classList.remove('fadeEntry');
      document.getElementById("main-cards2").style.opacity = "0.5";
      document.getElementById("main-cards2").style.transition = "all 0.2s"
      document.body.style.cursor = "wait";

      const loginData = $("#login_form_client").serializeArray();
      self.logMessage = "Logging..."

      $.ajax({
        url: "/authentication",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          strategy: "client",
          email: loginData[0].value,
          password: loginData[1].value
        }),

        success: function (data) {
          document.body.style.cursor = "auto";
          self.logMessage = "Logged!"
          setTimeout(function(){
            window.location.replace("/user");
          },500)
        },
        error: function (error) {
          document.getElementById("main-cards2").style.opacity = "1";
          document.body.style.cursor = "auto";

          if (error.status === 401) {
            swal("Something went wrong, please try again later.");
            self.logMessage = "Log in";
          } else if (error.status === 400) {
            swal("Wrong email or password");
            self.logMessage = "Log in"
          } else {
            swal("Unexpected error, please try again later.");
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
@import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');

html,
body {
  height: 100%;
}

/*Color background*/
:root{
  --fondo:#2b4969;
}

.custom-control-label:after,
.custom-control-label:before {
  background: var(--fondo);
  border:1px solid #687c94;
  border-radius: 2px;
}

.button-option{
  margin:30px 0 30px 0;
}

.login-wrapper {
  min-height:100%;
  background:url('../assets/background.jpg');
  background-size:cover;
  box-shadow:inset 0 0 0 2000px rgba(0, 23, 0, 0.1);
  height: 104%;
  font-family: 'Raleway', sans-serif!important;
}

.button-mobile {
    width: 140px;
    margin: 0 auto;
}

.card {
  background: var(--fondo);
  color:white!important;
  border: none;
}

h4 {
  color: white!important;
}


.btn {
  background: #14304a;
  border:none;
}

.btn:hover {
  background: #10263a;
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

.form-control {
  background:var(--fondo);
  border:none;
  border-bottom:1px solid #FFFFFF46;
  border-radius: 0;
  color:white!important;
}

.form-control:focus {
  box-shadow:none!important;
  border: none!important;
  background: none!important;
  border-bottom:1px solid #FFFFFF!important;
  color:white!important;
}

@keyframes autofill {
    to {
        color: white;
        background: var(--fondo);
    }
}

input:-webkit-autofill {
    animation-name: autofill;
    animation-fill-mode: both;
    -webkit-animation-name: autofill;
    -webkit-animation-fill-mode: both;
}

::placeholder {
  color:rgba(255, 255, 255, 0.432)!important;
}

.btn-primary:active,
.btn-primary:focus  {
    color: #fff;
    background-color:#14304a!important;
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

#main-select .card-body h5,
#main-select .card-body button{
  font-size: 1rem;
}


.table td {
  padding: 0;
}

.slide-in-bottom {
	-webkit-animation: slide-in-bottom 1.1s ease-out both;
	        animation: slide-in-bottom 1.1s ease-out both;
}

.slide-out-bottom {
	-webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) reverse both;
	        animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) reverse both;
}

.fade-out {
	-webkit-animation: fade-in 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) reverse both;
	        animation: fade-in 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) reverse both;
}

.note-user {
    color: #fff;
    background: var(--fondo);
    position: fixed;
    bottom: 10px;
    left:10px;
    border-radius: 3px;
    padding: 10px 15px;
    cursor:pointer;
    text-align:center;
}

@-webkit-keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
            transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
            transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}

@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fadeEntry {
  animation: fadeInEntry 0.5s forwards;
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

@media (min-width:768px){
  #main-select,
  #login-exec,
  #login-cli{
    max-width: 350px;
  }

  body{
    overflow: hidden;
  }
}

</style>
