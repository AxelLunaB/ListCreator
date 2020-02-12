<template>
  <div>
    <div class="bar" style="width: 100%; height: 70px; position: relative;"></div>
      <div class="main" style="overflow-x: hidden;position: relative;height: 92vh;">
            <div class="wrapper-page row cards-container" style="position: relative;overflow:hidden;" id="wrapper-page">
                    <development  v-for="(cluster,index) in allUnits" :key="index" :cluster="getCluster(index)" ></development>
            </div>
            <!-- <nav aria-label="Page navigation" style = "margin-top:20px;">
              <ul class="pagination pg-blue">
                <li class="page-item"><a class="page-link" @click="prevPage()"><i class="fas fa-chevron-left"></i></a></li>
                <li class="page-item pages">{{pageNumber + 1 }} / 2 </li>
                <li class="page-item"><a class="page-link" @click="nextPage()"><i class="fas fa-chevron-right"></i></a></li>
              </ul>
            </nav> -->
      </div>
  </div>
</template>

<script>
import development from "./components/development.vue";
import { mapGetters } from "vuex";

export default {
  mounted:function(){
      var isAuthenticated = this.$store.state.others.isAuthenticated;
      if (isAuthenticated) {
        // Dispatch actions &&  subscribe to rt events.
        this.$store.dispatch("units/fetchUnitsInfo");

        // listen to authenticated event
      } else {
        const _ = this;
        this.$eventHub.$on("authenticated", function() {
          _.$store.dispatch("units/fetchUnitsInfo");
        });
      }
  },
  components: {
    development
  },

  data() {
    return {
      // pageNumber:0,
      // pageCount:6
    }
  },
  methods:{
    getCluster(c){
      // We use the name of the cluster (c) and returns all info from said cluster.
      return {
        name:c,
        available:this.allUnits[c].filter(u => u.statusId === 1),
        sold:this.allUnits[c].filter(u => u.statusId === 2),
        reserved:this.allUnits[c].filter(u => u.statusId === 3),
        blocked:this.allUnits[c].filter(u => u.statusId === 4),
        clusterId:this.allUnits[c][0] ? this.allUnits[c][0].clusterId : null,
        total:this.allUnits[c].length
      }
    }
    // prevPage(){
    //   const self = this;
    //   if(this.pageNumber >=1){
    //   let element = document.getElementById("wrapper-page");
    //   element.classList.add("slide-out-right");

    //   setTimeout(function () {
    //     element.classList.remove("slide-out-right");
    //     element.classList.add("slide-in-left")
    //     },700)

    //   setTimeout(function(){
    //     if(self.pageNumber >= 1)
    //     self.pageNumber -= 1;
    //   },500)

    //   setTimeout(function () {
    //     element.classList.remove("slide-in-left")
    //     },1400)
    //   }
    // },
    // nextPage(){
    //   const self = this;
    //   if(this.pageNumber < 1){
    //   let element = document.getElementById("wrapper-page");
    //   element.classList.add("slide-out-left");

    //   setTimeout(function () {
    //     element.classList.remove("slide-out-left");
    //     element.classList.add("slide-in-right")
    //     },700)

    //   setTimeout(function(){
    //     if(self.pageNumber < 1){
    //       self.pageNumber += 1;
    //       }
    //   },500)

    //   setTimeout(function () {
    //     element.classList.remove("slide-in-right")
    //     },1400)
    //   }
    // },

  },
  computed:{
      ...mapGetters({
        allUnits: "units/allUnits",
      }),
    paginatedData(){
      const start = this.pageNumber * this.pageCount
      const end = start + this.pageCount;
      return this.stages.slice(start, end);
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

.slide-out-left {
	-webkit-animation: slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	        animation: slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

.slide-in-right {
	-webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.slide-in-left {
	-webkit-animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.slide-out-right {
	-webkit-animation: slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	        animation: slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

@-webkit-keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
            transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
            transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}

@-webkit-keyframes slide-out-right {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
}
@keyframes slide-out-right {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
}



@-webkit-keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}



@-webkit-keyframes slide-out-left {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-1000px);
            transform: translateX(-1000px);
    opacity: 0;
  }
}
@keyframes slide-out-left {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-1000px);
            transform: translateX(-1000px);
    opacity: 0;
  }
}


.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.wrapper-page {
  display: flex;
  justify-content: space-around;
  width:100%;
  max-width:1500px;
}

// @media screen and (max-width: 1199px) and (min-width: 1000px){
//   .wrapper-page {
//     padding-top: 24vw!important;
//     }
// }

.pages {
  color: white;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
}

 .page-link {
    background: none!important;
    border: 1px solid #ffffff;
    color:white;
 }

.page-link:hover {
    z-index: 2;
    text-decoration: none;
    color: #e6ffe4;
    cursor:pointer;
}

.page-link:hover {
    z-index: 2;
    text-decoration: none;
    color: #e6ffe4;
}

.pagination-lg .page-link {
     padding: 0.7rem!important;
}

.progress-bar{
  background: #1b2025!important;
}

.progress {
  background: #50657a!important;
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

// @media (min-width: 768px) {
//   .main {
//     height: 100vh;
//     }
//   }

// @media (max-width: 576px) {
//   .wrapper-page .row  {
//     padding-top: 60px!important;
//   }
// }

//  @media screen and (min-width:768px) and (max-width:992px) {
//     .cards-container {
//       margin-top: 57px;
//       overflow-y: auto;
//     }
//   }

//  @media screen and (min-width:1000px) and (max-width:1199px) {
//     .wrapper-page {
//       padding-top:30vw;
//     }
//   }

// @media screen and (max-width:768px) {
//   .wrapper-page{
//     padding-top:56px;
//   }
// }
</style>
