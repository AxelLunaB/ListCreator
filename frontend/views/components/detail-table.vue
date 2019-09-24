<template>
    <div class="row col-12 router colors" @click="departmentClicked()" style="padding-left:0;padding-right:0;">
        <table class="table table-hover colors" style="table-layout: fixed;margin-bottom:0px;">
            <tbody>
            <tr>
                <td>{{unit.unit}}</td>
                <td class = "tablet">{{unit.houseModel}}</td>
                <td class = "tablet">{{unit.m2Terrain}}</td>
                <td>{{unit.suburb}}</td>
                <td class = "mobile">{{unit.m2Construction}}</td>
                <!-- <td class="xs-mobile">{{detailTable.level != 0 ? detailTable.level: 'Ground Floor' }}</td>
                <td class="tablet">{{detailTable.bathrooms != 0 ? detailTable.bathrooms:"0" }}</td>
                <td class="tablet">{{detailTable.bedrooms != 0 ? detailTable.bedrooms:"0" }}</td> -->
                <!-- <td class="tablet">{{detailTable.nkeys != 0 ? detailTable.nkeys:"0" }}</td> -->
                <!-- <td class="mobile">{{detailTable.interiorM2 != 0 ? detailTable.interiorM2 :"0" }}</td>
                <td class="mobile">{{detailTable.exteriorM2 != 0 ? detailTable.exteriorM2 : "0"}}</td>
                <td class="xs-mobile">$ {{toPrice(detailTable.priceTotal != 0 ? detailTable.priceTotal:"0")}}</td> -->
                <!-- <td style="text-align:center"><span v-bind:style="{color: getColor}">{{detailTable.status.name}}</span></td> -->
            </tr>
            </tbody>
        </table>
  </div>
</template>

<script>

export default {
  props: ["unit"],
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
      let info = this.unit
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

.row {
  margin-left:0;
  margin-right: 0;
}

.table-hover tbody tr:hover {
    background-color: #2b353fb4;
}

.colors:nth-child(even) {
  background: #425061;
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
