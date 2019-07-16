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
      <table class="table full-table">
        <tbody>
          <tr style="line-heigh:10px;">
            <td v-for="u in deps" :key="u.id" class="header-t fulltable" style="vertical-align:middle;">
              <span v-html="u.title"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

  export default {
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
          {title:'ROOF INT M<sup>2</sup>'},
          {title:'ROOF EXT M<sup>2</sup>'},
          {title:'TOTAL INT M<sup>2</sup>'},
          {title:'TOTAL M<sup>2</sup>'},
          {title:'$/M<sup>2</sup> INT'},
          {title:'$/M<sup>2</supe> TOTAL'},
          {title:'LIST PRICE'},
          {title:'PAYMENT METHOD'},
          {title:'DISCOUNT %'},
          {title:'DISCOUNT $'},
          {title:'SALES PRICE (USD)'},
          {title:'SALES PRICE (MXN)'},
          {title:'EXCHANGE RATE'},
          {title:'CURRENCY'},
          {title:'STATUS'},
          {title:'SALES CHANNEL'},
          {title:'BROOKER'},
          {title:'SALES EXECUTIVE'},
          {title:'CUSTOMER'},
          {title:'COUNTRY'},
          {title:'STATE'},
          {title:'CITY'},
          {title:'RESERVE DATE'},
          {title:'RESERVE EXPIRATION'},
          {title:'ROI?'},
          {title:'%'},
          {title:'YEARS'},
          {title:'CLOSING DATE'},
          {title:'YEAR'},
          {title:'MONTH'},
          {title:'DAY'},
          {title:'MANAGEMENT COMISSIONS'},
          {title:'SALES ADMIN COMISSION'},
          {title:'3RD PARTY COMISSION'},
          {title:'BROOKER PR COMISSION'},
          {title:'TOTAL COMISSION'},
          {title:'COMISSION STATUS'},
          {title:'PAYMENT 1'},
          {title:'DATE 1'},
          {title:'STATUS 1'},
          {title:'PAYMENT 2'},
          {title:'DATE 2'},
          {title:'STATUS 2'},
          {title:'PAYMENT 3'},
          {title:'DATE 3'},
          {title:'STATUS 3'},
          {title:'PAYMENT 4'},
          {title:'DATE 4'},
          {title:'STATUS 4'},
          {title:'PAYMENT 5'},
          {title:'DATE 5'},
          {title:'STATUS 5'},
          {title:'PAYMENT 6'},
          {title:'DATE 6'},
          {title:'STATUS 6'},
          {title:'PAYMENT 7'},
          {title:'DATE 7'},
          {title:'STATUS 7'},
          {title:'PAYMENT 8'},
          {title:'DATE 8'},
          {title:'STATUS 8'},
          {title:'PAYMENT 9'},
          {title:'DATE 9'},
          {title:'STATUS 9'},
          {title:'PAYMENT 10'},
          {title:'DATE 10'},
          {title:'STATUS 10'},
          {title:'PAYMENT 11'},
          {title:'DATE 11'},
          {title:'STATUS 11'},
          {title:'PAYMENT 12'},
          {title:'DATE 12'},
          {title:'STATUS 12'},
          {title:'FINANC'},
          {title:'TOTAL PAYMENTS'},
          {title:'TOTAL SALE'},
          {title:'DIFFERENCE'}
        ]
      }
    },
    methods: {
      closePopup() {
          document.getElementById("listView").style.display = "none";
      }
    }
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
}

.full-table {
  table-layout: fixed;
  overflow-x: scroll;
}

.table-container {
  width:9000px;
}

.title {
  position:fixed;
  left:0;
  right: 0;
  display: flex;
  justify-content: space-between;
}

.close-fullview {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: white;
  cursor:pointer;
}

 .fulltable{
  text-align:center;
  width:80px;
  font-size:12px;
  font-weight:bold;
}

</style>
