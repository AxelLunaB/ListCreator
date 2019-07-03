<template>
   <div v-if="!isListGet" class="column" style="padding:5px;"> <!--cards-->
      <div class="card is-custom-card max-height body-card" v-on:click="departmentClicked()">
        <div class="card-content">
<div class="media has-pointer-cursor full-height" :style="statusClass">
  <!-- <div class="media-left logo-background-color">
    <figure class="image is-96x96">
      <img :src="`/static/img/clusters/${department.cluster.code}.png`" class="cluster-logo-department"/>
       <div class="cluster-logo-department">
      </div>
    </figure>
  </div> -->
  <div class="media-content remove-overflow">
    <!-- <p class="title is-5">{{department.cluster.name}}</p> -->
    <p class="card-header">
      <span>
        <b>#
        {{department.deptnumber}}
        </b>
      </span>
      <span>
        <b>N
        {{department.level}}
        </b>
      </span>
      </p>
  </div>
</div>
<div class="content">
  <div class="columns is-mobile is-multiline flex-mobile">
    <div class="column is-6 has-text-left">
      M<sup>2</sup> T: {{department.terracem2}}
    </div>
    <div class="column has-text-right">
      Tipo: {{department.type}}
    </div>
    <div class="column is-6 has-text-left">
      M<sup>2</sup> C: {{department.constructionm2}}
    </div>
    <div class="column has-text-right">
      Subtipo: {{department.subtype}}
    </div>
    <div class="column is-6 has-text-left">
          M<sup>2</sup> S: {{department.superficiem2}}
    </div>
    <div class="column is-6 has-text-right">
        Vista: {{department.view}}
    </div>
    <div class="column is-6 has-text-centered">
      Cajones: {{department.cajones}}
    </div>

    <div class="column is-12 total-price has-text-centered">
      <b>$ {{toPrice(department.totalprice)}}</b>
    </div>
     <!--<div class="column 12">
      <div class="columns is-mobile">
        <div class="column is-3 has-text-centered">
           <span class="tag">{{department.cluster.code}}</span>
        </div>-->
        <!-- <div v-on:click="coppyDepartmentClicked" class="column is-2 bring-to-front">
          <i  class="fas fa-clone"></i>
        </div>
      </div>
    </div>-->
  </div>
</div>
        </div>

      </div>
  </div>
  <div v-else style="width:100%; font-size:calc(10px + 0.2vw); padding:2px;">                                                                  <!---rows-->
    <div class="card is-custom-card max-height" id="card" v-bind:class="{test: isListGet}">
       <div class="card-content" v-bind:class="{marginlist: isListGet}">
         <div v-on:click="departmentClicked()" class="media has-pointer-cursor">
          <div class="columns is-full-fullhd is-full-widescreen is-full-desktop is-full-tablet is-mobile">

            <!-- <div class="column">
              <div class="media-center logo-background-color">
                <figure class="image is-96x96">
                  <img :src="`/static/img/clusters/${department.cluster.code}.png`" class="cluster-logo-department"/>
                    <div class="cluster-logo-department"></div>
                </figure>
              </div>
            </div> -->

            <div class="column row-fix"><!--height:43px-->
              <div class="media-content remove-overflow" v-bind:class="{mediacontentrow: isListGet}">
                <p style="font-size:10px;"><b>{{department.cluster.name}}</b></p>
              </div>
            </div>

          <div :style="statusClass" class="column dep-info row-fix">
              <span>#{{department.deptnumber}}</span> <span>N{{department.level}} </span>
          </div>

            <div class="column hide-mobile row-fix">
              <div class="hide-desktop">
                M<sup>2</sup> T:&nbsp;
              </div> <b>{{department.terracem2}} M<sup>2</sup></b>
            </div>
            <div class="column hide-mobile row-fix">
               <div class="hide-desktop">
                 Tipo:&nbsp;
               </div>
                <b>{{department.type}}</b>
            </div>

             <div class="column hide-mobile row-fix">
               <div class="hide-desktop">
                 Subtipo:&nbsp;
                </div>
                <b>{{department.subtype}}</b>

            </div>

            <div class="column hide-small-mobile row-fix">
              <div class="hide-desktop">
                M<sup>2</sup> C:&nbsp;
              </div>
               <b>{{department.constructionm2}} M<sup>2</sup></b>
            </div>

             <div class="column hide-mobile row-fix">
              <div class="hide-desktop">
                Vista:&nbsp;
              </div>
              <b>{{department.view}}</b>
            </div>

             <div class="column hide-mobile row-fix">
              <div class="hide-desktop">
                Cajones:&nbsp;
              </div>
              <b>{{department.cajones}}</b>
            </div>

            <div class="column hide-small-mobile row-fix" style="margin-right:10px;">
              <div class="hide-desktop">
                PRECIO:&nbsp;
              </div>
              <b>${{toPrice(department.totalprice)}}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import statusColor from "../../utils/statusColor.js";
import statusColorWeb from "../../utils/statusColorWeb.js";

import { mapGetters } from 'vuex';


/* id, cluster & type missing. */
export default {

  props: ["department"],
  mounted: function() {},
  data() {
     return {
    //   isList: true

     };
  },
  methods: {
    toPrice(x) {
      var r = x.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      return r;
    },
    departmentClicked() {
      this.$eventHub.$emit("show-department-detail-modal", this.department);
    },
    coppyDepartmentClicked() {
      this.$eventHub.$emit("clone-department", this.department);
    }
  },
  computed: {
    ...mapGetters ({
        isListGet : 'departments/isListGetter'
    }),
    statusClass() {
      // var x = statusColor(this.department.status.name.toString());
      var x = statusColorWeb(this.department.status.name.toString());

      return `background-color: ${x.background}; color: ${x.color}`;
      //return `background-color: ${this.department.status.color_hex}; color: ${x.color}`;
    }
  }
};
</script>

<style>
.cluster-logo-department {
  /* background-image: url("../../assets/clusters/34.png"); */
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0;
  height: 0;
  margin: auto;
  width: 98%;
  height: auto;
  background-size: contain;
  background-repeat: no-repeat;
}

.logo-background-color {
  background-color: #004450;
}
.media-center {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  margin: 0 auto;
}

.card-content {
  padding: 0!important;
  widows: 100%;
}

.total-price {
  font-size: calc(12px + 0.5vw);
}

.title:not(.is-spaced)+.subtitle {
  margin-top: 0;
}

.media-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height:100%;
}

.mediacontentrow {
  flex-direction: row;
  justify-content: space-around;
}

.columns {
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    margin:0!important;
}

.flex-fix {
  display: flex;
}

.column {
  /* padding:0.5rem; */
  display: flex;
  justify-content: center;
  width:300px;
}

.is-multiline {
      margin-left:0;
}


.marginlist {
  padding: 0rem;
}

.card {
  cursor: pointer;
}

.card-header {
  box-shadow: none;
  padding:1rem;
  font-weight: 300;
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.5rem;
}

.hide-mobile {
    display: flex;
    justify-content: center;
    align-items: center;
}

.title:not(:last-child) {
   margin-bottom: 0rem;
}


.media-content .subtitle .is-6 {
  flex-direction: row!important;
}

.flex-mobile {
    display: flex;
    justify-content: center;
    align-items: center;
}

 .dep-info {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-size: 18px;
    font-weight: bolder;
    height: 35px;  /*Controls height of rows*/
}

.row-fix {
  display:inherit!important;
  padding: 0!important;
}

.content,
#card {
  color: #1a1a1a;
}

@media (max-width: 769px) {
  .hide-mobile {
    display: none!important;
  }
}

@media (max-width: 1230px) {
  .hide-desktop {
    display: none!important;
    }
}


@media (max-width: 576px) {
  .hide-small-mobile {
    display: none!important;
    }
}

</style>
