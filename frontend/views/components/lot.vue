<template>
  <div class="column is-one-quarter-fullhd is-one-third-widescreen is-one-third-desktop is-one-third-tablet">
    <div  class="card is-custom-card max-height">
      <div class="card-content">
        <div v-on:click="lotClicked()" class="media has-pointer-cursor">
          <div class="media-left logo-background-color">
            <figure class="image is-96x96">
              <object :data="`/static/img/clusters/${lot.cluster.code}.png`" type="image/png" class="cluster-logo-house">
                <img src="../../assets/altozano_generico.png" />
              </object>
              <!-- <img :src="`/static/img/clusters/${lot.cluster}.png`"
              :alt="`${lot.division}`"
              class="cluster-logo-house"> -->
            </figure>
          </div>
          <div class="media-content remove-overflow">
            <p class="title is-5">{{lot.cluster.name}}</p>
            <p class="subtitle is-6">{{lot.block}} | #{{lot.lotnumber}} · <span class="tag tag-fixed-size" :style="statusClass">{{lot.status.name}}</span></p>
          </div>
        </div>
        <div class="content">
          <div class="columns is-mobile is-multiline">
            <div class="column is-6">
              M<sup>2</sup>: {{lot.terrainm2}}
            </div>
            <div class="column is-6">
              $ {{toPrice(lot.pricem2)}}
            </div>
            <div class="column is-12 has-text-centered">
              TOTAL: $ {{lot.totalprice}}
            </div>
            <div class="column is-12 has-text-centered">
              {{lot.officialnumber}}
            </div>
            <div class="column 12">
              <div class="columns is-mobile">
                <div class="column is-3 has-text-centered">
                  <span class="tag">{{lot.cluster.code}}</span>
                </div>
                <div class="column is-7">

                </div>
                <div v-on:click="coppyLotClicked" class="column is-2 bring-to-front">
                  <i  class="fas fa-clone"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import statusColor from "../../utils/statusColor.js";

export default {
  props: ["lot"],
  mounted: function() {},
  data() {
    return {};
  },
  methods: {
    toPrice() {
      return this.lot.totalprice
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    },
    lotClicked() {
      this.$eventHub.$emit("show-lot-detail-modal", this.lot);
    },
    coppyLotClicked() {
      this.$eventHub.$emit("clone-lot",this.lot);
    }
  },
  computed: {
    statusClass() {
      var x =statusColor(this.lot.status.name.toString());
      return `background-color: ${this.lot.status.color_hex}; color: ${x.color}`;
    }
  }
};
</script>

<style>
.cluster-logo-house {
  /* background-image: url("../../assets/clusters/34.png"); */
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0;
  height: 0;
  margin: auto;
  width: 100%;
  height: auto;
  background-size: contain;
  background-repeat: no-repeat;
}

</style>
