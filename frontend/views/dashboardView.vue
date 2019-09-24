<template>
    <div class="main">
          <div class="wrapper-page row cards-container" style="background:#2a333c" id="wrapper-page">
                  <development  v-for="(stage,index) in paginatedData" :key="index" :stage="stage" ></development>
          </div>
          <nav aria-label="Page navigation" style = "margin-top:100px;">
            <ul class="pagination pg-blue">
              <li class="page-item"><a class="page-link" @click="prevPage()"><i class="fas fa-chevron-left"></i></a></li>
              <li class="page-item pages">{{pageNumber + 1 }} / 2 </li>
              <li class="page-item"><a class="page-link" @click="nextPage()"><i class="fas fa-chevron-right"></i></a></li>
            </ul>
          </nav>
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
        this.$store.dispatch("others/fetchUnitsByStage", "7");

        // listen to authenticated event
      } else {
        const _ = this;

        this.$eventHub.$on("authenticated", function() {
          _.$store.dispatch("others/fetchUnitsByStage", "7");

        });
      }
  },
  data() {
    return {
      stages:[
        {stage:'1-A',units:12},
        {stage:'1-B',units:18},
        {stage:'2',units:34},
        {stage:'3',units:54},
        {stage:'4',units:53},
        {stage:'5',units:53},
        {stage:'6',units:30},
        {stage:'7',units:41},
        {stage:'9',units:4},
        {stage:'10',units:18}
      ],
      pageNumber:0,
      pageCount:6
    }
  },
  methods:{
    prevPage(){
      if(this.pageNumber >= 1)
      this.pageNumber -= 1;
    },
    nextPage(){
      if(this.pageNumber < 1){
      this.pageNumber += 1;
      }
    },

  },
  computed:{
      ...mapGetters({
        fetchUnitsByStage: "others/encinosUnitsByStage"
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

.main {
  background: #2a333c;
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
