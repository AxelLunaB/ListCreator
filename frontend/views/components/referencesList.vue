<template>
<div id="references" v-if="openReference" :class= "{ animate : openReference, animateOut: closeReferencesWindow }">
  <div id="returntwo" @click="closeReferences()">
    <span><i class="fas fa-level-up-alt"></i> &nbsp; RETURN</span>
  </div>
    <div class="row row-full margin-0">
    <div class="col-0 col-sm-1 col-lg-2 col-xl-4">
    </div>
    <div class="col-12 col-sm-10 col-lg-8 col-xl-4" style="display:flex;align-items:center;">
      <div class="card" style="margin-bottom:50px;">
        <div class="card-body" style="padding-bottom:0;">
          <h4 class="page-title" style="padding-bottom:20px;">References list</h4>
            <table class="table table-hover" style="table-layout: fixed;margin-bottom:0;margin-top:0;">
                <tbody>
                <tr>
                    <!-- <td class="header-t" style="text-align:center;vertical-align:middle;"><b>ID</b></td> -->
                    <td class="header-t xs-mobile" style="text-align:center;vertical-align:middle;"><b>Reserve date</b></td>
                    <td class="header-t xs-mobile" style="text-align:center;vertical-align:middle;"><b>Reserve expiration</b></td>
                    <td class="header-t" style="text-align:center;vertical-align:middle;"><b>Customer Id</b></td>
                    <td class="header-t" style="text-align:center;vertical-align:middle;"><b>Status</b></td>
                </tr>
                </tbody>
            </table>
            <references-view v-for="(ref, index) in references.data" :key="ref.index" :references="ref"></references-view>
        </div>
      </div>
    </div>
    <div class="col-0 col-sm-1 col-lg-2 col-xl-4">
    </div>
  </div>
</div>
</template>

<script>
import referencesView from "./referencesView.vue"
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  mounted:function(){

      // logic
      var isAuthenticated = this.$store.state.others.isAuthenticated;
      if (isAuthenticated) {
        let _ = this
        // Dispatch actions &&  subscribe to rt events.
        console.log("auth");
        _.$store.dispatch("others/getReferences");

        // listen to authenticated event
      } else {
        console.log("no auth");
        let _ = this;
        this.$eventHub.$on("authenticated", function() {
          _.$store.dispatch("others/getReferences");


        });
      }
  },
  props:['openReference'],
  components: {
    referencesView
  },
  data(){
    return {
      closeReferencesWindow : false
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
    }
  },
  computed: {
  ...mapGetters({
      references: "others/getReferences"
      })
  }

}
</script>

<style>

  #references {
    background: #2a333c;
    position: fixed;
    left: 0;
    bottom: 0;
    top: 69px;
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
