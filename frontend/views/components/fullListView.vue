<template>
  <div class="list-view" id="listView">
    <div style="height:44px;width:100%;">
      <div class="title">
        <h2 style="margin: 4px 0 4px 10px;">Brava Tower</h2>
        <div class="close-fullview" @click="closePopup">
          <i class="far fa-window-close fa-2x"></i>
        </div>
      </div>
    </div>
    <div class="table-container">
        <table class="table full-table" style="margin-bottom:0;width:3500px;height:50px;">
          <tbody>
            <tr style="line-heigh:10px; font-size:10px;">
              <td v-for="(u, index) in deps" :key="u.id" style="vertical-align:middle;font-weight:bold;" :class="responsiveTable(index)">
                <span v-html="u.title"></span>
              </td>
            </tr>
          </tbody>
        </table>
          <full-view v-for="(e, index) in departments ? departments : null" :key="e.index" :detailTable="e" :contracts="contracts[index]"></full-view>
    </div>
  </div>
</template>

<script>

import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import fullView from "./fullView.vue"


  export default {
    components: {
      fullView
    },
    data() {
      return{
        deps:[
          {title: 'UNIT #'},
          {title:'BUILDING'},
          {title:'LEVEL'},
          {title:'BEDROOMS'},
          {title:'KEYS'},
          {title:'BATHROOMS'},
          {title:'M<sup>2</sup> int'},
          {title:'M<sup>2</sup> ext'},
          {title:'TOTAL INT M<sup>2</sup>'},
          {title:'TOTAL M<sup>2</sup>'},
          {title:'$/M<sup>2</sup>INTERIOR'},
          {title:'$/M<sup>2</sup>TOTAL'},
          {title:'LIST PRICE'},
          {title:'STATUS'},
          {title:'CURRENCY'},
          {title:'PAYMENT METHOD'},
          {title:'EXCHANGE RATE'},
          {title:'MAN COMM'},
          {title:'SALES EX COMM'},
          {title:'SALES ADM COMM'},
          {title:'3RD PARTY COMM'},
          {title:'BROOKER COMM'},
          {title:'TOTAL COMM'},
          {title:'ROI'},
          {title:'ROI %'},
          {title:'YEARS'},
          {title:'CLOSING DATE'},
          {title:'EXECUTIVE'},
          {title:'SALES CHANNEL'},
          {title:'CUSTOMER'}
        ]
      }
    },
    methods: {
      ...mapActions("departments","detailTable","contract"),
      closePopup() {
          document.getElementById("listView").style.transition = "opacity 1s";
          document.getElementById("listView").style.opacity = 0;
          setTimeout(function () {
            document.getElementById('listView').style.display='none';
            }, 250);
      },
    responsiveTable(n){
        return 'table' + n
      },
    },
    computed: {
  ...mapGetters({
      departments: "departments/departments",
      contracts: "contracts/contracts",
      commissions: "commissions/commissions",
      searchQuery: "departments/query",
      clusters: "others/clusters",
      filteredValue: "departments/filterValue",
      specialSort: "departments/specialSort"
      })
    },
  }
</script>

<style>

.list-view {
  position: fixed;
  top:69px;
  left:0;
  bottom: 0;
  background: #3c4857;
  width:100%;
  overflow-x: scroll;
  display:none;
  overflow-y: auto;
  z-index:1;
}

.full-table {
  table-layout: fixed;
  overflow-x: scroll;
}

.table-container {
  width: 3500px;
  margin:0 auto;
}

.title {
  position:fixed;
  left:0;
  right: 0;
  display: flex;
  justify-content: space-between;
  background: #3c4857;
  border-bottom: 2px solid #2a333c;
  z-index:1;
}

.close-fullview {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 25px;
  color: white;
  cursor:pointer;
}

 .fulltable{
  text-align:center;
  width:80px;
  font-size:12px;
  font-weight:bold;
}

.table29 {
  width:200px;
}

</style>
