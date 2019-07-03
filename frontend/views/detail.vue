<template>
  <div class="main-tables-container">
      <router-link to="/" id="return"  :class="{ fadeInAnimate: isAnimated }">
        <return-page />
      </router-link>
    <div class="col-11"  :class="{ fadeInAnimate: isAnimated }">
      <div class="title-header">
        <div style="width:100px;height:100px;background:white;"></div>
        <h2 style=" display: flex;align-items: center;">Viva Towers</h2>
        <div class="buttons-header">
          <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-outline-light">Reports</button>
          <button type="button" class="btn btn-outline-light">Other</button>
          <button type="button" class="btn btn-outline-light">Other</button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <div>
              <detail-table v-for="e in detailTable" :key="e" :detailTable="e"></detail-table>
              </div>
          </div>
        </div>
      </div>
      <div class="navbar-container">
          <div class="navbar-brand">
            <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-light">Copy</button>
            <button type="button" class="btn btn-outline-light">CSV</button>
            <button type="button" class="btn btn-outline-light">Excel</button>
            <button type="button" class="btn btn-outline-light">PDF</button>
            <button type="button" class="btn btn-outline-light">Print</button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import detailTable from "./components/detail-table.vue";
import returnPage from "./components/returnPage.vue";

export default {
  components: {
    detailTable,
    returnPage
  },
  data(){
    return {
      detailTable: 3,
      isAnimated: true
    }
  }
}
</script>

<style  lang="scss">

@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

.main-tables-container {
  width:100vw;
  height:100vh;
  background: rgb(81, 111, 77);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background: none;
}

.table thead td, .table thead th {
    border-width: 0px;
    color: white;
}

h2 {
  color:  white;
}

.test {
  background: red;;
}

  .card-body {
    background: rgb(106, 142, 103);
    margin:10px;
    border-radius: 3px;
    color: white;
    cursor: pointer;
  }

  .table {
    background: none;
    color: white;

  }

  .table td {
    padding: 0;
  }

  .info-card {
    width:100%;
  }

  .table-hover tbody tr:hover {
    color: #ddffe4;
    background-color: rgba(0,0,0,.075);
}

.image-card {
    display: flex;
    justify-content: center;
    align-items: center;
}

.title-header {
  display: flex;
  justify-content: space-between;
}

.buttons-header {
  display: flex;
   justify-content: flex-start;
   align-items:center;
}

.navbar-brand {
   display: flex;
   justify-content: flex-start;
}

#return {
  color: white;
  position: fixed;
  left: 40px;
  top:80px;
  z-index: 30;
}

@media screen and (max-width: 867px) {
  .navbar-brand {
    justify-content: center;
  }
}
</style>
