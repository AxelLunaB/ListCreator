<template>
  <div class="login-wrapper row" style="display:flex; align-items:center;">
    <div class="wrapper-page container fadeEntry" id="main-cards">
      <div class="row main">
        <div class="card col-md-5 col-xl-4 col-sm-12" id="login">
          <div class="card-body">
            <h3 class="text-center" style="margin-bottom:36px;">
              <a href="index.html" class="logo"><img src="../assets/logo.jpg" alt="logo-img" width="250px"></a>
            </h3>
            <h5 style="text-align:center;font-size:1rem;">Welcome to Open Market <br> Wishlist Creator</h5>
            <form class="m-t-20" id="login_form">
            <div class="form-group inputs">
              <div class="col-12">
                <input class="form-control" type="text" required="" name="email" placeholder="axel@openmarket.com" value="axel@openmarket.com">
              </div>
            </div>
            <div class="form-group">
              <div class="col-12">
                <input class="form-control" type="password" required="" name="password" placeholder="1234" value="1234">
              </div>
            </div>
            <div class="form-group text-center m-t-40">
              <div class="col-12">
                <button class="btn btn-primary btn-block btn-lg waves-effect waves-light button-mobile" @click="submitForm($event)" style="font-size:1rem;"> {{ logMessage }} </button>
              </div>
            </div>
            </form>
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
      logMessage: "Log in"
    }
  },
  mounted: function () {
    this.$store.commit("resetState");

    const _ = this;
    $(document).ready(function () {
      $("#login_form").on("submit", function (e) {
        e.preventDefault();
        _.submitForm();
      });
    });
    var slideIndex = 0;
  },
  methods: {
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
          self.logMessage = "Log in";
          let errorMsg;
          if (error.status === 401) {
            errorMsg = "Wrong email or password";
          } else if (error.status === 400) {
            errorMsg = "Wrong email or password";
          } else {
            errorMsg = "Unexpected error, please try again later.";
          }
          swal(errorMsg);
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
  --fondo:#100c31;
}

.custom-control-label:after,
.custom-control-label:before {
  background: var(--fondo);
  border:1px solid #687c94;
  border-radius: 2px;
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

.main {
  display:flex;
  justify-content: space-around;
  height:100%;
  align-items: center;
}

.wrapper-page {
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
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

.btn.btn-primary.btn-block.btn-lg.waves-effect.waves-light.button-mobile {
  border-radius: 30px;
  border:1px solid white;
  background:none;

}

.btn.btn-primary.btn-block.btn-lg.waves-effect.waves-light.button-mobile:hover {
  background: #fbfbfb;
  border:none;
  border:1px solid #10263a;
  color: #100c31;
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


@media (min-width:768px){
  #login{
    max-width: 350px;
  }

  body{
    overflow: hidden;
  }
}

</style>
