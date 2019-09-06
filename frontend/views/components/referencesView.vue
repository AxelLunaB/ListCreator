<template>
<div class="colors">
    <table class="table full-table table-hover" style="table-layout: fixed;margin-bottom:0px!important;">
    <tbody>
      <tr v-if="references" class="table-references colors">
        <td style="vertical-align: middle;"> {{ unitNumber }} </td>
          <td style="vertical-align: middle;" class="xs-mobile mobile">{{references.reference.reserveDate != null ? getDate(references.reference.reserveDate) : '-' }}</td>
          <td style="vertical-align: middle;" class="xs-mobile mobile">{{references.reference.reserveExpiration != null ? getDate(references.reference.reserveExpiration) : '-'}}</td>
          <td style="vertical-align: middle;font-size:14px;" class="xs-mobile mobile">{{references.customer.name != undefined ? references.customer.name : '-'}}</td>
          <td style="vertical-align: middle;font-size:14px;" class="xs-mobile mobile">{{references.salesDetails.executive.name != undefined ? references.salesDetails.executive.name : '-'}}</td>
          <td style="vertical-align: middle;"><span v-bind:style="{color: getColor}">{{references.reference.status != undefined ? references.reference.status.name : '-'  }}</span></td>
          <td style="vertical-align: middle;">
            <select id="myList" v-if="references.reference.statusId !== 5 && references.reference.statusId !== 8 && references.reference.statusId !== null" v-on:change="status($event)">
              <option value = "4">Not Paid</option>
              <option value = "5">Paid</option>
            </select>
          </td>
      </tr>
    </tbody>
    <!-- <tbody>
      <tr v-if="references" class="table-references colors">
        <td class="xs-mobile" > {{ unitNumber }} </td>
          <td class="xs-mobile">{{references.reserveDate != null ? getDate(references.reserveDate): '-' }}</td>
          <td class="xs-mobile">{{references.reserveExpiration != null ? getDate(references.reserveExpiration) : '-'}}</td>
          <td>{{references.customerId != undefined ? references.customerId : '-'}}</td>
          <td><span v-bind:style="{color: getColor}">{{references.status != undefined ? references.status.name : '-'  }}</span></td>
          <td>
            <select id="myList" v-if="references.statusId !== 5 && references.statusId !== 8 && references.statusId !== null" v-on:change="status($event)">
              <option value = "4">Not Paid</option>
              <option value = "5">Paid</option>
            </select>
          </td>
      </tr>
    </tbody> -->


    </table>
  </div>
</template>

<script>
import $ from "jquery";
import swal from "sweetalert";
import { mapGetters } from 'vuex';

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
    props:['references', 'unitNumber', 'unitId'],
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
      },

      // Whenever status dropdown change, this function will run
      status: function status(event) {
        const _ = this;
        swal(
        {
          title: 'Please confirm information',
          text: 'CustomerID: ' + _.references.customerId + '\nCurrent Status: ' + _.references.reference.status.name + '\nChange to: ' + event.target[event.target.selectedIndex].label,
          icon: "info",
          buttons: {
          cancel: true,
          confirm: true,
        }
        }).then(isConfirm => {
          if(isConfirm) {
            const statusSelected = event.target.value;
            const reference = {
              paidReference: _.references.referenceId,
              statusId: statusSelected,
              unitId: _.references.unitId
            };

            if(reference !== undefined) {
              if( reference.unitId !== null) {
                 _.$store.dispatch("others/callCancelReferences", reference);
              } else {
              }
              _.$eventHub.$emit("updateReferenceParent");
              _.$eventHub.$emit('updateDataDetail');

            }
          }

        });

      }

    },

    computed: {

      // ...mapGetters({
      //   references: "others/getReferences"
      // }),

      // filterContracts: function () {
      //   var filter = this.contracts.filter(contract => {
      //     return contract.referenceId === 1;
      //   });

      //   return filter;
      // },

    getColor () {
    if(this.references.reference.status) {
      if (this.references.reference.status.color_hex) {
        return this.references.reference.status.color_hex;
      } else {
        return '#ffffff'
      }
    }
    return '#ffffff'
    }

    // getColor () {
    // if(this.references.status) {
    //   if (this.references.status.color_hex) {
    //     return this.references.status.color_hex;
    //   } else {
    //     return '#ffffff'
    //   }
    // }
    // return '#ffffff'
    // }

  },
}
</script>

<style>

.table-references {
  width:auto;
  height:50px;
}


.colors:nth-child(even) {
  background: #425061;
}

select {
  background:#252d33;
  border:none;
  border-radius: 4px;
  color:white;
  padding:5px;
  cursor:pointer;
}

select option {
  padding-bottom:100px;
  border-radius: 4px;
}

</style>
