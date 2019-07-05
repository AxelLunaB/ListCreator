<template>
    <div class="row col-12 router" @click="departmentClicked()">
        <table class="table table-hover">
            <tbody>
            <tr>
                <td>{{detailTable.unitNumber}}</td>
                <td>{{detailTable.level}} level</td>
                <td>{{detailTable.bathrooms}} bathrooms</td>
                <td>{{detailTable.bedrooms}} bedrooms</td>
                <td>{{detailTable.nkeys}} keys</td>
                <td>{{detailTable.interiorM2}} intM2</td>
                <td>{{detailTable.exteriorM2 != 0 ? detailTable.exteriorM2 : "-"}} extM2</td>
                <td>$ {{toPrice(detailTable.priceTotal)}}</td>
                <td>{{detailTable.status}}</td>
            </tr>
            </tbody>
        </table>
  </div>
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
    },
    departmentClicked() {
      console.log("pop");
      this.$eventHub.$emit("show-detailTable-detail-tower-modal", this.detailTable);
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
