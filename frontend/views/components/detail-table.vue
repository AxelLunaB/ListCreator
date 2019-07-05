<template>
    <router-link to="/towerdetail" class="row col-12 router table-detail">
        <table class="table table-hover" style="table-layout: fixed; width: 100%; margin-bottom:0px">
            <tbody>
            <tr>
                <td><b>{{detailTable.unitNumber}}</b></td>
                <td class="xs-mobile">{{detailTable.level}} level</td>
                <td class="tablet">{{detailTable.bathrooms}} bathrooms</td>
                <td class="tablet">{{detailTable.bedrooms}} bedrooms</td>
                <td class="tablet">{{detailTable.nkeys}} keys</td>
                <td class="mobile">{{detailTable.interiorM2}} M2</td>
                <td class="mobile">{{detailTable.exteriorM2}} M2</td>
                <td class="xs-mobile">$ {{toPrice(detailTable.priceTotal)}}</td>
                <td><b>{{detailTable.status}}</b></td>
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

.table-detail {
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
}

tr td {
  text-align: center;
  margin: 0 auto;
}

@media screen and (max-width: 867px) {
  .title-header {
    flex-direction: column;
    justify-content: center;
    align-items:center;
  }
  .mobile {
    display: none;
  }
}

@media screen and (max-width: 1200px) {
  .tablet {
    display:none;
  }
}

@media screen and (max-width: 576px) {
  .xs-mobile {
    display:none;
  }
}
</style>
