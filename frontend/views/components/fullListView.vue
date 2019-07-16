<template>
  <div class="list-view" id="listView">
    <div style="height:44px;width:100%;"><!--wrapper-->
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
            <tr>
                <td class="header-t" style="text-align:center;vertical-align:middle;"><b> UNIT  #</b></td>
                <td class="header-t" style="text-align:center;vertical-align:middle;"><b>LEVEL</b></td>
                <td class="header-t" style="text-align:center;vertical-align:middle;"><b>BATHROOMS</b></td>
                <td class="header-t" style="text-align:center;vertical-align:middle;"><b>BEDROOMS</b></td>
                <td class="header-t" style="text-align:center;vertical-align:middle;"><b>KEYS</b></td>
                <td class="header-t" style="text-align:center;vertical-align:middle;"><b>M<sup>2</sup> int</b></td>
                <td class="header-t" style="text-align:center;vertical-align:middle;"><b>M<sup>2</sup> ext</b></td>
                <td class="header-t"  style="text-align:center;vertical-align:middle;"><b>PRICE</b></td>
                <td style="text-align:center;vertical-align:middle;"><b>STATUS</b></td>
                <td style="text-align:center;vertical-align:middle;"><b>STATUS</b></td>
                <td style="text-align:center;vertical-align:middle;"><b>STATUS</b></td>
                <td style="text-align:center;vertical-align:middle;"><b>STATUS</b></td>
                <td style="text-align:center;vertical-align:middle;"><b>STATUS</b></td>
                <td class="header-t" style="text-align:center;vertical-align:middle;"><b> UNIT  #</b></td>
                <td class="header-t" style="text-align:center;vertical-align:middle;"><b>LEVEL</b></td>
                <td class="header-t" style="text-align:center;vertical-align:middle;"><b>BATHROOMS</b></td>
                <td class="header-t" style="text-align:center;vertical-align:middle;"><b>BEDROOMS</b></td>
                <td class="header-t" style="text-align:center;vertical-align:middle;"><b>KEYS</b></td>
                <td class="header-t" style="text-align:center;vertical-align:middle;"><b>M<sup>2</sup> int</b></td>
                <td class="header-t" style="text-align:center;vertical-align:middle;"><b>M<sup>2</sup> ext</b></td>
                <td class="header-t"  style="text-align:center;vertical-align:middle;"><b>PRICE</b></td>
                <td style="text-align:center;vertical-align:middle;"><b>STATUS</b></td>
                <td style="text-align:center;vertical-align:middle;"><b>STATUS</b></td>
                <td style="text-align:center;vertical-align:middle;"><b>STATUS</b></td>
                <td style="text-align:center;vertical-align:middle;"><b>STATUS</b></td>
                <td style="text-align:center;vertical-align:middle;"><b>STATUS</b></td>
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
}

.full-table {
  table-layout: fixed;
  overflow-x: scroll;
}

.table-container {
  width:3000px;
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

</style>
