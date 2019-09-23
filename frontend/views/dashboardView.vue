<template>
    <div class="main">
          <div class="wrapper-page row cards-container" style="background:#2a333c" id="wrapper-page">
                  <development  v-for="(tower,index) in getTowers" :key="index" :tower="tower" :clusterId="index" ></development>
          </div>
    </div>

</template>

<script>
import development from "./components/development.vue";
import { mapGetters } from "vuex";

export default {
  mounted:function(){

  },
  components: {
    development
  },
  mounted: function () {
      // logic
      var isAuthenticated = this.$store.state.others.isAuthenticated;
      if (isAuthenticated) {
        // Dispatch actions &&  subscribe to rt events.
        this.$store.dispatch("countByCluster/getCountByCluster", {id: 1});

        // listen to authenticated event
      } else {
        const _ = this;

        this.$eventHub.$on("authenticated", function() {
          _.$store.dispatch("countByCluster/getCountByCluster", {id: 1});
        });
      }
  },
  data() {
    return {
    }
  },
  methods:{
  },
  computed:{
      ...mapGetters({
        countByCluster: "countByCluster/countByCluster"
      }),
      getTowers(){
        let clusters = []
        clusters.push(this.countByCluster['BRAVA TOWER'])
        clusters.push(this.countByCluster['GIADA TOWERS A'])
        clusters.push(this.countByCluster['GIADA TOWERS B'])
        return clusters
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
  background: #2a333c;
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
}

// .page-link {
//     background: rgb(98, 134, 94)!important;
//     border: 1px solid rgb(62, 85, 60)!important;
//     color: white!important;
// }

// .page-link:hover {
//     z-index: 2;
//     text-decoration: none!important;
//     color: rgb(230, 255, 228)!important;
//     background:#50657a!important;
// }


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

@media (min-width: 768px) {
  .main {
    height: 100vh;
    }
  }

@media (max-width: 576px) {
  .wrapper-page .row  {
    padding-top: 60px!important;
  }
}

 @media screen and (min-width:768px) and (max-width:992px) {
    .cards-container {
      margin-top: 57px;
      overflow-y: auto;
    }
  }

 @media screen and (min-width:1000px) and (max-width:1199px) {
    .wrapper-page {
      padding-top:30vw;
    }
  }

@media screen and (max-width:768px) {
  .wrapper-page{
    padding-top:56px;
  }
}
</style>
