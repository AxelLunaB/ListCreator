<template>
  <div class="card-body col-md-4 col-sm-12 col-lg-3 animate tower-card" @click="selectTower()">
    <router-link to="/detail" class="router">
      <h5 class="m-b-30 m-t-0 text-center">Nombre del desarrollo</h5>
      <div class="card-upper">
        <div class="image-card">
        </div>
        <div class="info-card">
                <div class="row">
                    <div class="col-12">
                        <table class="table table-hover">
                            <tbody>
                            <tr>
                                <td>Units</td>
                                <td>90</td>
                            </tr>
                            <tr>
                                <td>Keys</td>
                                <td>12</td>
                            </tr>
                            <tr>
                                <td>1BR</td>
                                <td>30</td>
                            </tr>
                            <tr>
                                <td>2BR</td>
                                <td>30</td>
                            </tr>
                            <tr>
                                <td>3BR</td>
                                <td>30</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
      </div>
      <div class="card-down">
        <p> % vendido </p>
        <div class="progress">
          <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">
              <span class="sr-only">60% Complete</span>
          </div>
        </div>
        <table class="table table-hover tower-card" style="width:100%;">
            <tbody>
            <tr>
                <td>AVAILABLE</td>
                <td>90</td>
            </tr>
            <tr>
                <td>RESERVED</td>
                <td>12</td>
            </tr>
            <tr>
                <td>TEMP</td>
                <td>30</td>
            </tr>
            <tr>
                <td>BLOCK</td>
                <td>30</td>
            </tr>
            <tr>
                <td>SOLD</td>
                <td>30</td>
            </tr>
            </tbody>
        </table>
      </div>
    </router-link>
  </div>
</template>

<script>

export default {
  props:["clusterId"],
  data(){
    return {
      isActive: true
    }
  },
  methods: {
    selectTower() {
      let tower = this.clusterId + 1
      this.$eventHub.$emit("select-tower", tower);
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
    background: none;
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
