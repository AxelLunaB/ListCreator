<template>
  <div id="app-history-reports">
    <div class="history-titles">
      <h2>History reports</h2>
      <p>Filter by date</p>

      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
              <label>From</label>
              <input class="form-control" type="date">
          </div>
          <div class="col-sm-12 col-md-6">
              <label>From</label>
              <input class="form-control" type="date">
          </div>
        </div>
      </div>
    </div>
    <div class="history-body">
      <table class="table table-hover" style="margin-bottom:0;">
          <thead>
          <tr>
            <th v-for="(t,index) in header" :key="index" style="border-bottom:none;" :class="responsiveTable(index)">
              {{ t.title }}
            </th>
          </tr>
        </thead>
      </table>
      <table class="table table-hover">
          <thead>
          <tr>
            <th></th> <!--Reports here-->
          </tr>
        </thead>
      </table>
    </div>
    <!-- <div class="container">
      <div class="row">
        <div class="col-12">
      <table class="table table-hover" style="table-layout: fixed;margin-bottom:0;margin-top:0;">
        <tbody>
          <tr>
              <td><b> UNIT  #</b></td>
              <td><b>LEVEL</b></td>
              <td><b>BATHROOMS</b></td>
              <td><b>BEDROOMS</b></td>
              <td><b>KEYS</b></td>
              <td><b>M<sup>2</sup> int</b></td>
              <td><b>M<sup>2</sup> ext</b></td>
              <td><b>PRICE</b></td>
              <td><b>STATUS</b></td>
          </tr>
        </tbody>
      </table>
        </div>
      </div>
    </div> -->
    <!-- <div class="container">
      <h1 class="title is-1 text-center">History Reports</h1>
      <div class="text-center inputs">
        <label for>Fecha De Inicio</label>
        <input type="date" class="input float-left">
        <label for>Fecha Final</label>
        <input type="date" class="input float-right">
      </div>
      <br>
      <div class="container-table100">
        <div class="wrap-table100">
          <div class="table text-center">
            <div class="row header">
              <div class="cell">ID</div>
              <div class="cell">#De Unidad</div>
              <div class="cell">Tipo</div>
              <div class="cell">Piso</div>
              <div class="cell">Se Vendio Por:</div>
              <div class="cell">Acciones</div>
            </div>

            <div class="row">
              <div class="cell" data-title="ID">#1</div>
              <div class="cell" data-title="#Unidad">#842</div>
              <div class="cell" data-title="Tipo">Green</div>
              <div class="cell" data-title="Piso">8</div>
              <div class="cell" data-title="Vendido">$ 9721000</div>
              <div class="cell" data-title="acciones"><i class="fas fa-file-pdf fa-lg"></i></div>
            </div>

            <div class="row">
              <div class="cell" data-title="ID">#2</div>
              <div class="cell" data-title="#Unidad">#843</div>
              <div class="cell" data-title="Tipo">Garden</div>
              <div class="cell" data-title="Piso">9</div>
              <div class="cell" data-title="Vendido">$ 19721000</div>
              <div class="cell" data-title="acciones"><i class="fas fa-file-pdf fa-lg"></i></div>
            </div>

            <div class="row">
              <div class="cell" data-title="ID">#3</div>
              <div class="cell" data-title="#Unidad">#844</div>
              <div class="cell" data-title="Tipo">Green</div>
              <div class="cell" data-title="Piso">10</div>
              <div class="cell" data-title="Vendido">$ 10721000</div>
              <div class="cell" data-title="acciones"><i class="fas fa-file-pdf fa-lg"></i></div>
            </div>
          </div>
          <nav class="pagination is-centered" role="navigation" aria-label="pagination">
            <a class="pagination-previous">Previous</a>
            <a class="pagination-next">Next page</a>
            <ul class="pagination-list">
              <li>
                <a class="pagination-link" aria-label="Goto page 1">1</a>
              </li>
              <li>
                <span class="pagination-ellipsis">&hellip;</span>
              </li>
              <li>
                <a class="pagination-link" aria-label="Goto page 45">45</a>
              </li>
              <li>
                <a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
              </li>
              <li>
                <a class="pagination-link" aria-label="Goto page 47">47</a>
              </li>
              <li>
                <span class="pagination-ellipsis">&hellip;</span>
              </li>
              <li>
                <a class="pagination-link" aria-label="Goto page 86">86</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div> -->
    <div class="pagination">
      <button class="btn btn-outline-light">
        Prev
      </button>
      <button class="btn btn-outline-light">
        Next
      </button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
        header:[
          {title: 'ID'},
          {title:'#'},
          {title:'FLOOR'},
          {title:'PRICE'},
          {title:'INFO'}
        ]
    }
  },
  methods:{
    responsiveTable(n){

        return 'responsive' + n

      }
    }
  }

</script>


<style lang="scss">

  @import 'node_modules/bootstrap/scss/bootstrap';
  @import 'node_modules/bootstrap-vue/src/index.scss';

  html,
  body{
    height:100%;
    width:100%;
    background: #2a333c;
  }

  #app-history-reports {
  height: 100%;
  width: 100%;
  background: #2a333c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color:white;

  [type="date"] {
    background: #fff url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png) 97% 50% no-repeat;
  }

  [type="date"]::-webkit-inner-spin-button {
    display: none;
  }

  [type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
  }

  .history-titles {
    background: #3c4857;
    padding: 20px;
    border-radius: 10px;
    width:80vw;
    max-width: 1200px;
  }

    .history-body {
    background: #3c4857;
    padding: 20px;
    border-radius: 10px;
    width:80vw;
    margin-top:50px;
    max-width: 1200px;
  }

  .history-titles h2,
  .history-titles p {
    text-align: center;
  }

  .history-body .table thead th {
    color:white;
    border-bottom:1px solid #a8a8a896;
    border-top:1px solid #a8a8a896;
    text-align: center;
  }

  .pagination {
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    max-width: 1200px;
    margin-top:30px;
  }

@media (max-width: 769px) {
  .responsive2,
  .responsive3 {
    display: none;
    }
}
// .text-center {
//   text-align: center !important;
// }

// .pagination {
//   padding: 10px 10px;
// }

// .pagination a {
//   color: #fff;
//   font-weight: bold;
// }

// .pagination a:hover {
//   color: #f2f2f2;
//   background: #628170 !important;
// }

// .is-current {
//   background: #628170 !important;
//   border-color: #fff !important;
// }

// [type="date"] {
//   background: #fff url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png) 97% 50% no-repeat;
// }

// [type="date"]::-webkit-inner-spin-button {
//   display: none;
// }

// [type="date"]::-webkit-calendar-picker-indicator {
//   opacity: 0;
// }

// h1 {
//   color: #fff !important;
// }

// .container {
//   width: 100%;
//   margin: 0 auto;
// }

// .inputs input {
//   width: 20%;
//   margin-left: 10px;
// }

// .inputs label {
//   margin-left: 20px;
//   font-weight: bold;
//   color: #fff;
// }

// .container-table100 {
//   width: 100%;
//   height: auto;
//   display: -webkit-box;
//   display: -webkit-flex;
//   display: -moz-box;
//   display: -ms-flexbox;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-wrap: wrap;
// }

// .wrap-table100 {
//   width: 960px;
//   border-radius: 10px;
//   overflow: hidden;
// }

// .table {
//   width: 100%;
//   display: table;
//   margin: 0;
// }

// .row {
//   display: table-row;
//   background: #fff;
//   font-weight: bold;
//   color: #4d4d4d !important;
//   cursor: default !important;
// }

// .row.header {
//   color: #ffffff !important;
//   background: #628170;
//   transition: 0.25s;
// }

// .row.header:hover {
//   color: #ffffff;
//   background: #628170d9;

// }
// .row i{
//   cursor: pointer !important;
// }
// .cell {
//   display: table-cell;
// }

// .row .cell {
//   font-family: Poppins-Regular;
//   font-size: 15px;
//   color: #4d4d4d;
//   line-height: 1.2;
//   padding-top: 20px;
//   padding-bottom: 20px;
//   border-bottom: 1px solid #f2f2f2;
// }

// .row.header .cell {
//   font-size: 18px;
//   color: #fff;
//   line-height: 1.2;
//   font-weight: unset !important;

//   padding-top: 19px;
//   padding-bottom: 19px;
// }

// .row .cell:nth-child(1) {
//   width: 100px;
//   padding-left: 40px;
// }

// .row .cell:nth-child(2) {
//   width: 360px;
//   padding-left: 40px;
// }

// .row .cell:nth-child(3) {
//   width: 160px;
// }

// .row .cell:nth-child(4) {
//   width: 250px;
// }

// .row .cell:nth-child(5) {
//   width: 190px;
// }
// .row .cell:nth-child(6) {
//   width: 190px;
// }


// .table,
// .row {
//   width: 100% !important;
// }

// .row:hover {
//   background-color: #f2f2f2;
//   cursor: pointer;
// }
// @media screen and (max-width: 765px) {
// .inputs input {
//     width: 25%;
//   }
// }
// @media screen and (max-width: 728px) {
//   .table {
//     display: block;
//   }

//   .row {
//     display: block;
//     border-bottom: 1px solid #f2f2f2;
//     padding-bottom: 18px;
//     padding-top: 30px;
//     padding-right: 15px;
//     margin: 0;
//   }

//   .row.header {
//     padding: 0;
//     height: 0px;
//   }

//   .row.header .cell {
//     display: none;
//   }

//   .row .cell:before {
//     font-family: Poppins-Bold;
//     font-size: 16px;
//     color: #4d4d4d;
//     line-height: 1.2;
//     text-transform: uppercase;
//     font-weight: bold !important;
//     margin-bottom: 13px;
//     content: attr(data-title);
//     min-width: 98px;
//     display: block;
//   }

//   .cell {
//     display: block;
//   }

//   .row .cell {
//     border: none;
//     padding-left: 30px;
//     padding-top: 16px;
//     padding-bottom: 16px;
//     font-size: 18px;
//     color: #555555;
//     line-height: 1.2;
//   }

//   .row .cell:nth-child(1) {
//     padding-left: 30px;
//   }


//   .table,
//   .row,
//   .cell {
//     width: 90% !important;
//     margin: auto;
//     border-radius: 10px;
//   }

//   #app-history-reports {
//     height: 100%;

//   }

//   .inputs input {
//     width: 90%;
//   }
// }
}

</style>
