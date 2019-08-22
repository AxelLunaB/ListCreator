<template>
<div class="colors">
    <table class="table full-table table-hover" style="table-layout: fixed;margin-bottom:0px!important;">
    <tbody>
      <tr v-if="references" class="table-references colors">
          <td class="xs-mobile">{{references.reserveDate != null ? getDate(references.reserveDate): '-' }}</td>
          <td class="xs-mobile">{{references.reserveExpiration != null ? getDate(references.reserveExpiration) : '-'}}</td>
          <td>{{references.customerId != undefined ? references.customerId : '-'}}</td>
          <td><span v-bind:style="{color: getColor}">{{references.status != undefined ? references.status.name : '-'  }}</span></td>
          <td>
            <select id="myList" v-if="references.statusId !== 5">
              <option value = "1">Available</option>
              <option value = "2">Sold</option>
              <option value = "3">Reserved</option>
            </select>
          </td>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<script>

function isAvailable(statusId = this.references.statusId) {

  let isAvailable = false;

  switch(statusId) {
    case 1:
      isAvailable = true;
      break;

    case 2:
      isAvailable = false;
      break;

    case 3:
      isAvailable = true;
      break;

    case 4:
      isAvailable = true;
      break;

    case 5:
      isAvailable = false;
      break;

    case 6:
      isAvailable = false;
      break;

    case 7:
      isAvailable = false;
      break;
  }

  return isAvailable;
}

export default {
    props:['references'],

    data() {
      return {

      }
    },

    methods:{

      getDate(date) {
        return date.substring(0,10)
      },

      patchStatus() {
        const statusId = this.references.statusId;

        if(statusId !== null && isAvailable(statusId)) {
          alert('You can change status!');
        } else {
          alert('You cannot change status!');
        }
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
