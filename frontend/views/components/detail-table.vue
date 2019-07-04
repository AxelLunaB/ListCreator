<template>
    <router-link to="/towerdetail" class="row col-12 router">
        <table class="table table-hover">
            <tbody>
            <tr>
                <td>{{detailTable.unitNumber}}</td>
                <td>{{detailTable.level}} level</td>
                <td>{{detailTable.bathrooms}} bathrooms</td>
                <td>{{detailTable.bedrooms}} bedrooms</td>
                <td>{{detailTable.nkeys}} keys</td>
                <td>{{detailTable.interiorM2}} interiorM2</td>
                <td>{{detailTable.exteriorM2}} exteriorM2</td>
                <td>$ {{toPrice(detailTable.priceTotal)}}</td>
                <td>{{detailTable.status}}</td>
            </tr>
            </tbody>
        </table>
  </router-link>
</template>

<script>

export default {
  props: ["detailTable"],
  data(){
    return {

    }
  },
  methods: {
    toPrice(x) {
      var r = x.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      return r;
    }
  }
}
</script>

<style lang="scss">

.table-main {
  background:rgb(81,111,77);
  padding: 0;
}

.table td,
.table th {
    padding: 0;
}

.router:hover {
  text-decoration: none!important;
}

@media screen and (max-width: 867px) {
  .title-header {
    flex-direction: column;
    justify-content: center;
    align-items:center;
  }
}
</style>
