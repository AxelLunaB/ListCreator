<template>
  <div class="card-body col-md-5 col-sm-12 col-lg-4 col-xl-3 animate tower-card" @click="selectTower()">
    <router-link to="/detail" class="router">
      <h4 class="m-b-30 m-t-0 text-center" style = "margin: 30px 0;"> {{ cluster.name ? cluster.name : '-' }} </h4>
      <div class="card-upper">
        <div class="image-card">
        </div>
        <div class="info-card">
                <div class="row">
                    <div class="col-12" style="padding: 0px 25px;">
                        <table class="table">
                            <tbody class="colors-main">
                            <tr>
                                <td>Disponible</td>
                                <td style="color:#35CE41"><b>{{ cluster.available ? cluster.available.length : '-' }}</b></td>
                            </tr>
                            <tr>
                                <td>Vendido</td>
                                <td style="color:#CD110F"><b>{{ cluster.sold ? cluster.sold.length : '-' }}</b></td>
                            </tr>
                            <tr>
                                <td>Apartado</td>
                                <td style="color:#E89005"><b>{{ cluster.reserved ? cluster.reserved.length : '-' }}</b></td>
                            </tr>
                            <tr>
                                <td>Bloqueado</td>
                                <td style="color:#F5E02A"><b>{{ cluster.blocked ? cluster.blocked.length : '-' }}</b></td>
                            </tr>
                            <tr style="height:40px;">
                                <td style="vertical-align:middle;"><b>TOTAL</b></td>
                                <td style="vertical-align:middle;"><b>{{ cluster ? cluster.total : '-' }}</b></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
      </div>
     </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  mounted: function () {
  },
  props:['cluster'],
  data(){
    return {
      isActive: true,
      barData : {
        sold: 50,
        reserved: 80
      }
    }
  },
  methods: {

    selectTower() {
      // On clicking a tower we emit an event that fetches all units from that tower sending it the clusterId
      let cluster;
      this.cluster.clusterId !== null ? cluster = this.cluster.clusterId : cluster = null

      this.$eventHub.$emit("select-tower", cluster);
    },

    getStatus(cluster){
      switch(cluster){
        case 1:
          return this.unitsInfo[this.stage.stage].DISPONIBLE;
          break;
        case 2:
          return this.unitsInfo[this.stage.stage].VENDIDO;
          break;
        case 3:
          return this.unitsInfo[this.stage.stage].APARTADO;
          break;
        case 4:
          return this.unitsInfo[this.stage.stage].BLOQUEADO;
          break;
      }
    }

  },

  computed: {
      ...mapGetters({
      }),
    getDepsP(){

      if(this.tower !== undefined){
      let mData = this.barData

      for(var bData in mData) {
       let totalDeps = this.getUnits();

       let pSoldDeps = this.tower.statusCount[bData];
       let per = Math.ceil((parseFloat(100 * pSoldDeps) / totalDeps ));
        mData[bData] = per

      }

      return mData

      } else {
        return 0
      }
    }
  }
}
</script>

<style lang="scss">

  .card-body {
    background: #2b4969;
    margin:10px;
    border-radius: 3px;
    color: white;
    cursor: pointer;
  }

  .table {

    color: white;

  }

  .table td {
    padding: 0;
  }

  .info-card {
    width:100%;
  }

  .table-hover tbody tr:hover {
    color: #758daa;
    background-color: rgba(0,0,0,.075);
}

.image-card {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-upper {
  display: flex;
}

.animate {
  animation: fadeInAnimation 1s forwards;
}

.router {
  color:white;
}

.router:hover {
  text-decoration: none;
  color:white;
}

.tower-card tbody tr td:nth-child(1)  {
  text-align: left;
}

.tower-card tbody tr td:nth-child(2)  {
  text-align: right;
}

.tower-card tbody tr td {
  padding:0;
}

.tower-card .col-12 {
  padding: 0 12px 0 12px;
}

.tower-card {
  padding:0;
  max-width: 350px;
  margin:20px 50px;
}


.colors-main tr:nth-child(odd) {
  background: #36587a;
}

.colors-main tr td {
  border:none!important;
}


.myProgress {
    height: 25px;
    border-radius: 5px;
    margin-top: 7px;
    margin-bottom: 7px;
    animation: loadAnimation 1.5s forwards;
}

@keyframes loadAnimation {
  0%   {
    width:0%;
     }

  30% {
    width:0%;
  }

  100% {
    width:100%;
    }
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
</style>
