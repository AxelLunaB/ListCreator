<template>
  <div class="table-container colors">
    <table class="table full-table" style="table-layout: fixed;margin-bottom:0px!important;">
    <tbody>
      <tr v-if="contracts != undefined" class="colors">
          <td>{{detailTable.unitNumber != 0 ? detailTable.unitNumber : "-"}}</td>
          <td>{{detailTable.cluster.name != null ? detailTable.cluster.name : "N/A" }}</td>
          <td>{{detailTable.level != 0 ? detailTable.level : "-"}}</td>
          <td>{{detailTable.bedrooms != 0 ? detailTable.bedrooms : "-"}}</td>
          <td>{{detailTable.nkeys !=0 ? detailTable.nkeys : "-"}}</td>
          <td>{{detailTable.bathrooms != 0 ? detailTable.bathrooms : "-"}}</td>
          <td>{{detailTable.interiorM2 !=0 ? detailTable.interiorM2 : "-"}}</td>
          <td>{{detailTable.exteriorM2 != 0 ? detailTable.exteriorM2  : "-"}}</td>
          <td>{{detailTable.totalInteriorM2 != 0 ? detailTable.totalInteriorM2 : "-"}}</td>
          <td>{{detailTable.totalM2Double != 0 ? detailTable.totalM2Double : "-"}}</td>
          <td>{{toPrice(detailTable.priceInteriorM2 != 0 ? detailTable.priceInteriorM2 : "-")}}</td>
          <td>{{toPrice(detailTable.priceTotalM2 !=0 ? detailTable.priceTotalM2 : "-")}}</td>
          <td>${{toPrice(detailTable.priceTotal != 0 ? detailTable.priceTotal : "-")}}</td>
          <td v-bind:style="{color: getColor }"><slot></slot>{{detailTable.status.name != null ? detailTable.status.name : "N/A"}}</td>
          <td>{{ contracts.currency }}</td>
          <td>{{contracts.paymentMethod != null ? contracts.paymentMethod : "N/A" }}</td>
          <td>{{contracts.exchangerate != 0 ? contracts.exchangerate : "-"}}</td>
          <td>{{contracts.commission.managementCommissions}}%</td>
          <td>{{contracts.commission.salesExecutivesCommissions}}%</td>
          <td>{{contracts.commission.salesAdministrativeCommissions}}%</td>
          <td>{{contracts.commission.thirdPartyCommissions}}%</td>
          <td>{{contracts.commission.brokerCommissions}}%</td>
          <td>$ {{contracts.commission.totalCommissions != 0 ? contracts.commission.totalCommissions : getTotalCommission}}</td>
          <td>{{contracts.WROI != null ? contracts.WROI : "N/A"}}</td>
          <td>{{contracts.percent != 0 ? contracts.percent : "-"}}</td>
          <td>{{contracts.years != 0 ? contracts.years : "-"}}</td>
          <td>{{contracts.closingDate != null && contracts.closingDate != 'null' ? contracts.closingDate : "-"}}</td>
      </tr>
    </tbody>
        </table>
  </div>
</template>

<script>

export default {
  props: ["detailTable","contracts"],
  data() {
    return {
    }
  },
  methods: {
    toPrice(x) {
      var r = x.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      return r;
      }
  },
  computed:{
        getColor() {
      if (this.detailTable.status.color_hex) {
        return this.detailTable.status.color_hex
      } else if(this.contracts != null) {
        if(this.contracts.commission){
          return this.contracts.commission.status.color_hex;
        }
      }
      else {
        return  'ffffff'
      }
    },
        getTotalCommission () {
          let percent = this.contracts.commission.managementCommissions +
          this.contracts.commission.salesAdministrativeCommissions +
          this.contracts.commission.brokerCommissions +
          this.contracts.commission.salesExecutivesCommissions +
          this.contracts.commission.thirdPartyCommissions
          percent = percent / 100

      return (this.contracts.salesprice * percent).toFixed(2)
    },
  }
}
</script>

<style>
.colors:nth-child(even) {
  background: #425061;
}
</style>
