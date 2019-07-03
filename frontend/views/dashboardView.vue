<template>
    <div class="main">
          <div class="wrapper-page row">
                  <development  v-for="d in development" :key="d" :development="d"></development>
          </div>
          <ul class="pagination pagination-lg m-0">
            <li class="page-item"> <a href="#" class="page-link"> <i class="fa fa-angle-left"></i> </a> </li>
            <li class="page-item" v-for="p in pagination" :key="p"> <a href="#" class="page-link">{{ p }}</a> </li>
            <li class="page-item"> <a href="#" class="page-link"> <i class="fa fa-angle-right"></i> </a> </li>
          </ul>
            <!-- <ul class="pagination pagination-lg m-0" :class="{ fadeInAnimate: isAnimated }">
                <li class="page-item"> <a href="#" class="page-link"> <i class="fa fa-angle-left"></i> </a> </li>
                <li class="page-item"> <a href="#" class="page-link active">1</a> </li>
                <li class="active"> <a href="#" class="page-link">2</a> </li>
                <li class="page-item"> <a href="#" class="page-link">3</a> </li>
                <li class="page-item"> <a href="#" class="page-link">4</a> </li>
                <li class="page-item"> <a href="#" class="page-link"> <i class="fa fa-angle-right"></i> </a> </li>
            </ul> -->
    </div>
</template>

<script>
import development from "./components/development.vue";

export default {
  components: {
    development
  },
  data() {
    return {
      development: [1, 2 ,3 ], //replace with the back end of developments
      isAnimated: true,
      pagination: [1, 2, 3,]
    }
  }
}
</script>

<style lang="scss">

@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

html,
body {
  height: 100%;
}

.main {
  background: rgb(81, 111, 77);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

}

.wrapper-page {
  display: flex;
  justify-content: space-around;
  width:100%;
  max-width:1500px;
  padding-top: 65px;
}

.page-link {
    background: rgb(98, 134, 94)!important;
    border: 1px solid rgb(62, 85, 60)!important;
    color: white!important;
}

.page-link:hover {
    z-index: 2;
    text-decoration: none!important;
    color: rgb(230, 255, 228)!important;
    background:rgb(106, 145, 101)!important;
}

.active {
    background: rgb(81, 111, 77)!important;
}

.page-link:hover {
    z-index: 2;
    text-decoration: none;
    color: #e6ffe4;
}

.fadeInAnimate {
  animation: fadeInAnimation 2s forwards;
}

.pagination-lg .page-link {
     padding: 0.7rem!important;
}

.progress-bar{
  background: rgb(36, 85, 30)!important;
}

.progress {
  background: #a8c7a4!important;
}



@keyframes fadeInAnimation {
  0%   {
    opacity: 0;
    transform: translateY(-5px);
     }

  40%   {
    opacity: 0;
    transform: translateY(-5px);
     }

  100% {
    opacity: 1;
    transform: translateY(5px);
    }
}

@media (min-width: 768px) {
  .main {
    height: 100vh;
    }
  }

</style>
