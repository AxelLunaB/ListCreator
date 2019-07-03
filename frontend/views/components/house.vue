<template>
  <div class="column is-one-quarter-fullhd is-one-third-widescreen is-one-third-desktop is-one-third-tablet">
    <div class="card is-custom-card max-height ">
      <div class="card-content">
        <div v-on:click="houseClicked()" class="media has-pointer-cursor">
          <div class="media-left logo-background-color">
            <figure class="image is-96x96">
              <img :src="`/static/img/clusters/${house.cluster.code}.png`" class="cluster-logo-house"/>
              <!-- <div class="cluster-logo-house">
              </div> -->
            </figure>
          </div>
          <div class="media-content remove-overflow">
            <p class="title is-5">{{house.cluster.name}}</p>
            <p class="subtitle is-6">{{house.block}} | #{{house.lotnumber}} · <span class="tag tag-fixed-size" :style="statusClass">{{house.status.name}}</span></p>
          </div>
          <!-- <div class="columns is-multiline is-mobile is-centered">
            <div class="column is-10"></div>
            <div class="column is-10"></div>
          </div> -->
        </div>
        <div class="content">
          <div class="columns is-mobile is-multiline">
            <div class="column is-6">
              M<sup>2</sup>: {{house.terrainm2}}
            </div>
            <div class="column">
              $ {{toPrice(house.pricem2)}}
            </div>
            <div class="column is-6">
              M<sup>2</sup> C: {{house.constructionm2}}
            </div>
            <div class="column">

            </div>
            <div class="column is-12 has-text-left">
              TOTAL: $ {{toPrice(house.totalprice)}}
            </div>
            <div class="column is-12 has-text-left">
              {{house.officialnumber}}
            </div>
             <div class="column 12">
              <div class="columns is-mobile">
                <div class="column is-3 has-text-centered">
                  <span class="tag">{{house.cluster.code}}</span>
                </div>
                <div class="column is-7">

                </div>
                <div v-on:click="coppyHouseClicked" class="column is-2 bring-to-front">
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

/* id, cluster & type missing. */
export default {
  props: ["house"],
  mounted: function() {},
  data() {
    return {};
  },
  methods: {
    toPrice(x) {
      var r = x.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      return r;
    },
    houseClicked() {
      this.$eventHub.$emit("show-house-detail-modal", this.house);
    },
    coppyHouseClicked() {
      this.$eventHub.$emit("clone-house", this.house);
    }
  },
  computed: {
    statusClass() {
      var x = statusColor(this.house.status.name.toString());

      return `background-color: ${this.house.status.color_hex}; color: ${
        x.color
      }`;
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

.logo-background-color {
  background-color: #5c5f52;
}
</style>

