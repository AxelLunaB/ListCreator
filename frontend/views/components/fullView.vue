<template>
  <div class="table-container colors" @click="departmentClicked()">
    <table class="table full-table table-hover" style="table-layout: fixed;margin-bottom:0px!important;">
    <tbody>
      <tr v-if="contracts != undefined" class="colors">
          <td><b>{{detailTable.unitNumber != 0 ? detailTable.unitNumber : "-"}}</b></td>
          <td style="font-size:14px;">{{detailTable.cluster.name != null ? detailTable.cluster.name : "N/A" }}</td>
          <td>{{detailTable.level != 0 ? detailTable.level : "-"}}</td>
          <td>{{detailTable.bedrooms != 0 ? detailTable.bedrooms : "-"}}</td>
          <td>{{detailTable.nkeys !=0 ? detailTable.nkeys : "-"}}</td>
          <td>{{detailTable.bathrooms != 0 ? detailTable.bathrooms : "-"}}</td>
          <td>{{detailTable.interiorM2 !=0 ? detailTable.interiorM2 : "-"}}</td>
          <td>{{detailTable.exteriorM2 != 0 ? detailTable.exteriorM2  : "-"}}</td>
          <td>{{detailTable.totalInteriorM2 != 0 ? detailTable.totalInteriorM2 : "-"}}</td>
          <td>{{detailTable.totalM2Double != 0 ? detailTable.totalM2Double : "-"}}</td>
          <td>{{detailTable.priceInteriorM2 != 0 ? toPrice(detailTable.priceInteriorM2) : '-'}}</td>
          <td>{{detailTable.priceTotalM2 !=0 ? toPrice(detailTable.priceTotalM2): '-'}}</td>
          <td>{{detailTable.priceTotal != 0 ? toPrice(detailTable.priceTotal): '-'}}</td>
          <td v-bind:style="{color: getColor }"><slot></slot>{{detailTable.status.name != null ? detailTable.status.name : "N/A"}}</td>
          <td>{{ contracts.currency != null ? contracts.currency : '-'}}</td>
          <td>{{contracts.paymentMethod != null ? contracts.paymentMethod : "-" }}</td>
          <td>{{contracts.exchangerate != 0 && contracts.exchangerate != null ? contracts.exchangerate : "-"}}</td>
          <td>{{contracts.commission != null? contracts.commission.managementCommissions != null ? contracts.commission.managementCommissions + ' %' :'-' : '-'}}</td>
          <td>{{contracts.commission != null && contracts.commission.salesExecutivesCommissions !== null? contracts.commission.salesExecutivesCommissions != null ? contracts.commission.salesExecutivesCommissions + ' %' : '-' : '-'}}</td>
          <td>{{contracts.commission != null && contracts.commission.salesAdministrativeCommissions !== null? contracts.commission.salesAdministrativeCommissions + ' %' : '-'}}</td>
          <td>{{contracts.commission != null && contracts.commission.thirdPartyCommissions !== null? contracts.commission.thirdPartyCommissions + ' %' : '-'}}</td>
          <td>{{contracts.commission != null && contracts.commission.brokerCommissions !== null? contracts.commission.brokerCommissions + ' %' : '-'}}</td>
          <td>{{contracts.commission != null && contracts.commission.totalCommissions != null ? contracts.commission.totalCommissions == 0 ? 'N/A':'$ ' + contracts.commission.totalCommissions : '-'}}</td>
          <td>{{contracts.WROI != null ? contracts.WROI : "-"}}</td>
          <td>{{contracts.percent != 0 && contracts.percent != null ? contracts.percent : "-"}}</td>
          <td>{{contracts.years != 0 && contracts.years != null ? contracts.years : "-"}}</td>
          <td>{{contracts.closingDate != null && contracts.closingDate != 'null' ? contracts.closingDate : "-"}}</td>
          <td style='font-size:12px;'>{{contracts.commission != undefined ? contracts.commission.executive != null ? contracts.commission.executive.name : '-' : '-' }}</td>
          <td>{{contracts.salesDetails != undefined ? contracts.salesDetails.salesChannel != null ? contracts.salesDetails.salesChannel : '-' : '-' }}</td>
          <td style='font-size:12px;width:200px;'>{{contracts.customer != undefined ? contracts.customer.name != null? contracts.customer.name : '-' : '-'}}</td>
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
        },
        departmentClicked(){
          console.log("pop");
          let info = {
            detailUnit : this.detailTable,
            detailContract : this.contracts
          }
          this.$eventHub.$emit("show-detailTable-detail-tower-modal", info);
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

          const totalC = function () {
            let percent = this.contracts.commission.managementCommissions +
            this.contracts.commission.salesAdministrativeCommissions +
            this.contracts.commission.brokerCommissions +
            this.contracts.commission.salesExecutivesCommissions +
            this.contracts.commission.thirdPartyCommissions
            percent = percent / 100
            return (this.contract.salesprice * percent).toFixed(2)
          }


    return this.contract != undefined ? this.contract.salesprice > 0 && this.contract.salesprice != null ? '$ ' + totalC : '-' : '-';
    },
  }
}
</script>

<style>
.colors:nth-child(even) {
  background: #425061;
}

.table-container{
  cursor: pointer;
}

.colors td {
  padding:0;
}
</style>
