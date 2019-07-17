<template>
  <div class="table-container">
    <table class="table full-table" style="table-layout: fixed;margin-bottom:0px!important;">
    <tbody>
      <tr>
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
          <td>{{contract.currency != null ? contract.currency : "N/A"}}</td>
          <td>{{contract.paymentMethod != null ? contract.paymentMethod : "N/A" }}</td>
           <td>{{contract.exchangerate != 0 ? contract.exchangerate : "-"}}</td>
          <td>{{contract.commission.managementCommissions}}%</td>
          <td>{{contract.commission.salesExecutivesCommissions}}%</td>
          <td>{{contract.commission.salesAdministrativeCommissions}}%</td>
          <td>{{contract.commission.thirdPartyCommissions}}%</td>
          <td>{{contract.commission.brokerCommissions}}%</td>
          <td>$ {{contract.commission.totalCommissions != 0 ? contract.commission.totalCommissions : getTotalCommission}}</td> -->
          <td>{{contract.WROI != null ? contract.WROI : "N/A"}}</td>
          <td>{{contract.percent != 0 ? contract.percent : "-"}}</td>
          <td>{{contract.years != 0 ? contract.years : "-"}}</td>
          <td>{{contract.closingDate != null ? contract.closingDate : "-"}}</td>
          <td>{{contract.years != 0 ? contract.years : "-"}} </td>
          <td>{{contract.years != 0 ? contract.years : "-"}} </td>
      </tr>
    </tbody>
        </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from "vuex";

export default {
  props: ["detailTable","contract"],
  data() {
    return {
    }
  },
  mounted:function(){
    this.$eventHub.$on("show-fullView-detail-tower-modal", details => {
    this.departments = details.departments;
    this.contracts = details.contracts;
    this.show = true;
    console.log (details);
    });
  },
  methods: {
    toPrice(x) {
      var r = x.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      return r;
      }
  },
  computed:{
          ...mapGetters({
        departments: "departments/departments",
        contracts: "contracts/contracts",
        commissions: "commissions/commissions",
        searchQuery: "departments/query",
        clusters: "others/clusters",
        filteredValue: "departments/filterValue",
        specialSort: "departments/specialSort"
    }),
        getColor() {
      if (this.detailTable.status.color_hex) {
        return this.detailTable.status.color_hex
      } else if(this.contract != null) {
        if(this.contract.commission){
          return this.contract.commission.status.color_hex;
        }
      }
      else {
        return  'ffffff'
      }
    },
        getTotalCommission () {
          let percent = this.contract.commission.managementCommissions +
          this.contract.commission.salesAdministrativeCommissions +
          this.contract.commission.brokerCommissions +
          this.contract.commission.salesExecutivesCommissions +
          this.contract.commission.thirdPartyCommissions
          percent = percent / 100

      return this.contract.salesprice * percent
    },
  }
}
</script>

<style>

</style>
