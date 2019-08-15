<template>
<div class="table-container colors">
    <table class="table full-table table-hover" style="table-layout: fixed;margin-bottom:0px!important;">
    <tbody>
      <tr v-if="contracts != undefined" class="colors">
          <td><b>{{detailTable.unitNumber != 0 ? detailTable.unitNumber : "-"}}</b></td>
          <td>{{detailTable.cluster.name != null ? detailTable.cluster.name : "N/A" }}</td>
          <td>{{detailTable.level != 0 ? detailTable.level : "-"}}</td>
      </tr>
    </tbody>
        </table>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
