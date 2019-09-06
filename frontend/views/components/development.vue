<template>
  <div class="card-body col-md-5 col-sm-12 col-lg-4 col-xl-3 animate tower-card" @click="selectTower()">
    <router-link to="/detail" class="router">
      <h4 class="m-b-30 m-t-0 text-center"> {{ tower != null ? tower.name != null ? tower.name : '-' : '-'}} </h4>
      <div class="card-upper">
        <div class="image-card">
        </div>
        <div class="info-card">
                <div class="row">
                    <div class="col-12">
                        <table class="table">
                            <tbody class="colors-main">
                            <tr>
                                <td>Units</td>
                                <td>{{ tower != null ? tower.statusCount != null ? getUnits() : '-' : '-' }}</td>
                            </tr>
                            <tr>
                                <td>Keys</td>
                                <td>{{ tower != null ? tower.keys : '-' }} </td>
                            </tr>
                            <tr>
                                <td>1BR</td>
                                <td> {{ tower != null ? tower.oneBR != null ? tower.oneBR : '-' : '-'}} </td>
                            </tr>
                            <tr>
                                <td>2BR</td>
                                <td>{{ tower != null ? tower.twoBR != null ? tower.twoBR : '-' : '-'}}</td>
                            </tr>
                            <tr>
                                <td>3BR</td>
                                <td> {{ tower != null ? tower.threeBR != null ? tower.threeBR : '-':'-'}} </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
      </div>
      <div class="card-down">
        <div style="width: 100%;height: 140px;display: flex;flex-direction: column;justify-content: center;">
            <span v-if="getDepsP.sold != 0">
            <p style="margin-bottom:0;"> {{getDepsP.sold}} % SOLD </p>
            <div class="myProgress">
              <div :style="{width:getDepsP.sold + '%', height: '100%', backgroundColor: '#24303b'}"></div>
            </div>
          </span>
        <p style="margin-bottom:0;"> {{getDepsP.reserved}} % RESERVED </p>
        <div class="myProgress">
          <div :style="{width:getDepsP.reserved + '%', height: '100%', backgroundColor: '#24303b'}"></div>
        </div>
        </div>
        <table class="table tower-card" style="width:100%;margin-top:18px;">
            <tbody class="colors-main">
            <tr>
                 <td>AVAILABLE</td>
                <td style="color:#35ce41;"> {{ tower != null ? tower.statusCount.available : '-' }} </td>
            </tr>
            <tr>
                <td>BLOCKED</td>
                <td style="color:#8a8a8a"> {{ tower != null ? tower.statusCount.blocked : '-' }} </td>
            </tr>
            <tr>
                <td>PAID</td>
                <td style="color:#7ddc0f;"> {{ tower != null ? tower.statusCount.paid : '-' }} </td>
            </tr>
            <tr>
                <td>NOT PAID</td>
                <td style="color:#f5e02a"> {{ tower != null ? tower.statusCount.notPaid : '-' }} </td>
            </tr>
            <tr>
                <td>REFERRED</td>
                <td style="color:#8fb5ff;"> {{ tower != null ? tower.statusCount.referred : '-' }} </td>
            </tr>
            <tr>
              <td>RESERVED</td>
              <td style="color: #e89005;"> {{ tower != null ? tower.statusCount.reserved : '-' }} </td>
            </tr>
            <tr>
              <td>SOLD</td>
              <td style="color: #cd110f">{{ tower != null ? tower.statusCount.sold : '-'}}</td>
            </tr>
            </tbody>
        </table>
      </div>
     </router-link>
  </div>
</template>

<script>

export default {
  props:['tower','clusterId'],
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
      let towerNo = this.clusterId + 1
      this.$eventHub.$emit("select-tower", towerNo);
    },
    getUnits(){

      let total = this.tower.statusCount.available +
      this.tower.statusCount.blocked +
      this.tower.statusCount.notPaid +
      this.tower.statusCount.paid +
      this.tower.statusCount.referred +
      this.tower.statusCount.reserved +
      this.tower.statusCount.sold

      return total
    }
  },
  computed: {
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
    background: #3c4857;
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


.colors-main tr:nth-child(odd) {
  background: #425061;
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
