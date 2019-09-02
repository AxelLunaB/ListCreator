<template>
<div id="references" v-if="openReference" :class= "{ animate : openReference, animateOut: closeReferencesWindow }">
  <div id="returntwo" @click="closeReferences()">
    <span><i class="fas fa-level-up-alt"></i> &nbsp; RETURN</span>
  </div>
    <div class="row margin-0">
    <div class="col-0 col-sm-1 col-md-2 col-lg-2 col-xl-3">
    </div>
    <div class="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-6 card-references-main">
      <div class="card card-references" style="margin-bottom:50px;">
        <div class="card-body" style="padding-bottom:0;">
          <h4 class="page-title" style="padding-bottom:20px;">References List - {{ title }}</h4>
            <table class="table table-hover" style="table-layout: fixed;margin-bottom:0;margin-top:0;">
                <tbody>
                <tr>
                    <td class="header-t" style="text-align:center;vertical-align:middle;width:70px;"><b>Unit #</b></td>
                    <td class="header-t xs-mobile" style="text-align:center;vertical-align:middle;width:140px;"><b>Reserve date</b></td>
                    <td class="header-t xs-mobile" style="text-align:center;vertical-align:middle;width:140px"><b>Reserve expiration</b></td>
                    <td class="header-t" style="text-align:center;vertical-align:middle;width:400px;"><b>Customer</b></td>
                    <td class="header-t" style="text-align:center;vertical-align:middle;"><b>Status</b></td>
                    <td class="header-t" style="text-align:center;vertical-align:middle;"><b>Update Status</b></td>
                </tr>
                </tbody>
            </table>
            <references-view v-for="(ref, index) in referencesByCluster" :key="ref.index" :references="ref" :contracts="contracts" :unitNumber="filterContracts(ref, ref.id)" :unitId="filterUnitId(ref.id)"></references-view>
            <!-- <references-view v-for="(ref, index) in references.data" :key="ref.index" :references="ref" :contracts="contracts" :unitNumber="filterContracts(ref.id)" :unitId="filterUnitId(ref.id)"></references-view> -->
        </div>
      </div>
    </div>
    <div class="col-0 col-sm-1 col-md-2 col-lg-2 col-xl-3">
    </div>
  </div>
</div>
</template>

<script>
import referencesView from "./referencesView.vue"
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import detailVue from '../detail.vue';
import { log } from 'util';


export default {
  mounted: function(){

      // logic
      var isAuthenticated = this.$store.state.others.isAuthenticated;
       this.$eventHub.$on("updateReferenceParent", () => {


          this.$store.dispatch("others/getReferences");
          this.$store.dispatch("contracts/getContracts");
        });
      if (isAuthenticated) {
        let _ = this;
        // Dispatch actions &&  subscribe to rt events.
        console.log("auth");
        _.$store.dispatch("others/getReferences");

        // listen to authenticated event
      } else {
        console.log("no auth");
        let _ = this;
        _.$store.dispatch("others/getReferences");
      }
  },
  props: ['openReference', 'title', 'departments' ,'clusterId'],

  components: {
    referencesView
  },

  data() {
    return {
      closeReferencesWindow : false,
    }
  },
  methods: {
    closeReferences(){
      const self = this
      self.closeReferencesWindow = true
      setTimeout(function () {
        self.$emit('closeReferences', false)
        }, 750);
      setTimeout(function() {
        self.closeReferencesWindow = false
      }, 1000)
    },

    filterContracts: function (ref, refId) {
      let unitNumber = this.departments.filter(department => {
        return department.id === ref.unitId && department.clusterId === this.clusterId;
      });

      return unitNumber[0] !== undefined ? unitNumber[0].unitNumber : null;

    },

    filterUnitId: function (referenceId) {
      let result = this.contracts.filter(contract => {
        return contract.referenceId === referenceId && contract.clusterId === this.clusterId;
      });

      // console.log('Result ------------------------->');
      // console.log(result);
      return result[0] !== undefined ? result[0].unitId : null;
    }

  },


  computed: {

    ...mapGetters({
      references: "others/getReferences",
      contracts: "contracts/contracts"
    }),

    // Filter each reference belong to current selected clusterId
    referencesByCluster: function () {
      console.log("dasfsfasadsfa");

      let refs = this.references;
      let con = this.contracts;
      let referencesByCluster = [];
      con.forEach(contract => {
        refs.data.forEach(reference => {
          if(contract.referenceId != null) {
           if(contract.clusterId === this.clusterId && contract.referenceId === reference.id) {
             referencesByCluster.push(contract);
           }
          }
        });
      });

      return referencesByCluster;
    }

  },

  watch: {
    openReference: function () {
      this.openReference === true ? this.$store.dispatch("others/getReferences") : this.$store.dispatch("others/getReferences");
    },
    referencesByCluster(newVal) {
      console.log("asdafasfaasfdh2");
    }
  }

}
</script>

<style>

  #references {
    background: #2a333c;
    position: fixed;
    left: 0;
    bottom: 0;
    top: 59px;
    right: 0;
    z-index:3;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .page-title {
    text-align: center;
  }

  .animate {
    animation: fadeInAnimation 1s forwards;
  }

  .animateOut {
    animation: fadeOutAnimation 1s forwards;
  }

  .card-references-main {
    display: flex;
    align-content: center;
    justify-content: center;
  }

@keyframes fadeInAnimation {
    0%   {
      opacity: 0;
       }

    100% {
      opacity: 1;
      }
  }

    @keyframes fadeOutAnimation {
    0%   {
      opacity: 1;
       }

    100% {
      opacity: 0;
      }
  }
</style>
