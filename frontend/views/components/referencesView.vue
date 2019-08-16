<template>
<div class="colors">
    <table class="table full-table table-hover" style="table-layout: fixed;margin-bottom:0px!important;">
    <tbody>
      <tr v-if="references" class="table-references colors">
          <td class="xs-mobile">{{references.reserveDate != null ? getDate(references.reserveDate): '-' }}</td>
          <td class="xs-mobile">{{references.reserveExpiration != null ? getDate(references.reserveExpiration) : '-'}}</td>
          <td>{{references.customerId != undefined ? references.customerId : '-'}}</td>
          <td><span v-bind:style="{color: getColor}">{{references.status != undefined ? references.status.name : '-'  }}</span></td>
      </tr>
    </tbody>
        </table>
  </div>
</template>

<script>
export default {
    props:['references'],
    data(){
      return {
      }
    },
    methods:{
      getDate(date) {
        return date.substring(0,10)
      }
    },
    computed:{
    getColor() {
      if(this.references.status) {
        if (this.references.status.color_hex) {
          return this.references.status.color_hex;
          } else {
            return '#ffffff'
            }
          }
          return '#ffffff'
          }
    }
}
</script>

<style>

.table-references {
  width:auto;
}

.colors:nth-child(even) {
  background: #425061;
}

</style>
