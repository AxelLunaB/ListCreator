<template>
    <div class="row col-12 router" @click="departmentClicked()" style="padding-left:0;padding-right:0;">
        <table class="table table-hover" style="table-layout: fixed;margin-bottom:0px;">
            <tbody>
            <tr>
                <td>{{detailTable.unitNumber}}</td>
                <td class="xs-mobile">{{detailTable.level != 0 ? detailTable.level: "-" }}</td>
                <td class="tablet">{{detailTable.bathrooms != 0 ? detailTable.bathrooms:"-" }}</td>
                <td class="tablet">{{detailTable.bedrooms != 0 ? detailTable.bedrooms:"-" }}</td>
                <td class="tablet">{{detailTable.nkeys != 0 ? detailTable.nkeys:"-" }}</td>
                <td class="mobile">{{detailTable.interiorM2 != 0 ? detailTable.interiorM2 :"-" }}</td>
                <td class="mobile">{{detailTable.exteriorM2 != 0 ? detailTable.exteriorM2 : "-"}}</td>
                <td class="xs-mobile">$ {{toPrice(detailTable.priceTotal != 0 ? detailTable.priceTotal:"-")}}</td>
                <td><span v-bind:style="{color: getColor}">{{detailTable.status.name}}</span></td>
            </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
export default {
  props: ["detailTable","contracts"],
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
      let info = {
        detailUnit : this.detailTable,
        detailContract : this.contracts
      }
      this.$eventHub.$emit("show-detailTable-detail-tower-modal", info);
    }
  },
  computed: {
    getColor() {
      if (this.detailTable.status.color_hex) {
        return this.detailTable.status.color_hex;
      }
      else {
        return '#ffffff'
      }
    },
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

.row {
  margin-left:0;
  margin-right: 0;
  padding-left:0;
  padding-right:0;
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
