<template>
  <div class="container-filter">
    <div class="field">
      <div class="control">
        <div class="dropdown-container">
          <button class="btn-buy" @click="setFilterAs('statusId');" value="Disponibilidad" id="name">Disponibilidad</button>
          <span class="dropdown">
            <button><i class="fas fa-sort-down fa-xs"></i></button>
                <input type="checkbox">
                <ul>
                  <li v-for= "item in disponibility"
                   @click="setSpecialFilter({id:item.id,value:item.value}),show = true" :key="item.dispo">
                    <p>{{ item.dispo }}</p>
                  </li>
                </ul>
          </span>
          </div>
        <div class="dropdown-container">
          <button class="btn-buy" @click="setFilterAs('type');" value="Tipo" id="name">Tipo</button>
          <span class="dropdown">
            <button><i class="fas fa-sort-down fa-xs"></i></button>
                <input type="checkbox">
                <ul>
                  <li v-for= "item in type" @click="setSpecialFilter({id:item.id,value:item.value}), show = true" :key="item.typeof">
                    <p @click ="show = true">{{ item.typeof }}</p>
                  </li>
                </ul>
          </span>
          </div>
        <div class="dropdown-container">
          <button class="btn-buy" @click="setFilterAs('level')" value="Nivel" id="name">Nivel</button>
          <span class="dropdown">
            <button><i class="fas fa-sort-down fa-xs"></i></button>
                <input type="checkbox">
                <ul>
                  <li v-for="item in level" @click="setSpecialFilter({id:item.id,value:item.value}), show = true" :key="item.levelno">
                    <p @click ="show = true">{{ item.levelno }}</p>
                  </li>
                </ul>
          </span>
          </div>
      </div>
    </div>
    <div class="result">
           <div class="close-search-container is-size-6">
              <transition name = "fade">
                <div v-if="show" class = "close-search" @click="removeFilter(), show = false "><i class="fas fa-times-circle"></i>&nbsp; Quitar filtros</div>
              </transition>
          </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

export default {
  data: function(){
    return{
    disponibility: [
      {dispo: 'Disponible', value:'1', id:'statusId'},
      {dispo: 'Apartado', value:'2', id:'statusId'},
      {dispo: 'No disponible', value:'3', id:'statusId'}
    ],
    type: [
      {typeof: 'GARDEN', value:'GARDEN', id:'type'},
      {typeof: 'A', value:'A', id:'type'},
      {typeof: 'B', value:'B', id:'type'},
      {typeof: 'C', value:'C', id:'type'},
      {typeof: 'C+', value:'C+', id:'type'},
      {typeof: 'PH5', value:'PH5', id:'type'},
      {typeof: 'PH6', value:'PH6', id:'type'},
      {typeof: 'PH7', value:'PH7', id:'type'},
      {typeof: 'PH8', value:'PH8', id:'type'},
    ],
    level: [
      {levelno: '8', value:'8', id:'level'},
      {levelno: '9', value:'9', id:'level'},
      {levelno: '10', value:'10', id:'level'},
      {levelno: '11', value:'11', id:'level'},
      {levelno: '12', value:'12', id:'level'},
      {levelno: '13', value:'13', id:'level'},
      {levelno: '14', value:'14', id:'level'},
      {levelno: '15', value:'15', id:'level'},
      {levelno: '16', value:'16', id:'level'},
      {levelno: '17', value:'17', id:'level'},
      {levelno: '18', value:'18', id:'level'},
      {levelno: '19', value:'19', id:'level'},
      {levelno: '20', value:'20', id:'level'},
      {levelno: '21', value:'21', id:'level'},
      {levelno: '22', value:'22', id:'level'},
    ],
    show:false,
    selected:undefined
    };
  },
  computed: {
    ...mapGetters ({
      //getFilteredDataComputed: 'departments/getFilteredDataComputed'
      GetFilteredList : 'departments/specialSort'
    })
  },
  methods: {
    ...mapMutations ({
      //getFilteredDataMutation: 'departments/FILTER_LIST'
      // specialFilter: 'departments/SPECIAL_FILTER'
    }),
    ...mapActions ({
      //getFilteredDataAction: 'departments/getFilteredDataAction'
      setFilterAs: 'departments/setFilter',
      setSpecialFilter: 'departments/setSpecialFilter',
      removeFilter: 'departments/removeSpecialFilter'
    })
  },
  directives: {
  }
}

</script>

<style>

.container-filter {
  color:#ffffff;
  margin:0;
  background:#004450e6;
  height: 70px;
  border-radius: 6px;
}

 .left-filter {
  margin:0;
  width:30%;
  display:inline;
  color:white;
  padding:0.5rem;
}

.right-filter {
  margin:0;
  color:white;
  width:69.6%;
  padding:0.5rem;
}

label {
  margin: 0 auto;
}

input {
  margin: 0 10px;
}

.container-filter p{
  margin-left:1rem;
}

.container-filter .column {
  padding: 0;

}

.columns {
  margin: 0;
}

.show-mobile {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.field {
  margin: 0 20px;
  height: 70px;
}

.show-mobile p {
  font-size: 0.8rem;
}

.field:not(:last-child) {
   margin-bottom: 0;
}

.dropdown-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
}

.dropdown {
  position: relative;
  display: inline-block;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
}

.dropdown > a, .dropdown > button {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  background-color: white;
  border: none;
  padding: 10px;
  border-radius: 0 4px 4px 0;
  display: inline-block;
  color: black;
  text-decoration: none;
  background:#00a78e;
}

.dropdown input[type=checkbox] {
  position: absolute;
  display: block;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  margin: 0px;
  opacity: 0;
}

.dropdown input[type=checkbox]:checked {
  position: fixed;
  z-index:+0;
  top: 0px; left: 0px;
  right: 0px; bottom: 0px;
}

.dropdown ul {
  position: absolute;
  top: 36px;
  border: 1px solid #ccc;
  border-radius: 3px;
  left: 0px;
  list-style: none;
  padding: 4px 0px;
  display: none;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0,0,0,.175);
  color: rgb(29, 29, 29);
  z-index:2;
}

.dropdown input[type=checkbox]:checked + ul {
  display: block;
}

.dropdown ul li {
  display: block;
  padding: 6px 20px;
  white-space: nowrap;
  min-width: 100px;
}

.dropdown ul li:hover {
  background-color: rgb(238, 238, 238);
  cursor: pointer;
}

.dropdown ul li a {
  text-decoration: none;
  display: block;
  color: black
}

.dropdown .divider {
  height: 1px;
  margin: 9px 0;
  overflow: hidden;
  background-color: #e5e5e5;
  font-size: 1px;
  padding: 0;
}


.control {
    display: flex;
    justify-content:space-around;
    height: 100%;
}

 .close-search {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 7px;
}

.close-search-container {
  justify-content: center;
  align-items: center;
  display: flex;
  height:32px;
  color: #2c2c2c;
  cursor: pointer;
  z-index: 2;
}

.buy {
  margin: 0 10px;
    display: flex;
    align-items: center;
}

.selected {
  font-weight:bolder;
}

.btn-buy {
  border: none;
  height: 36px;
  padding: 0 5px;
  border-radius: 3px 0 0 3px;
  color: white;
  background:#00d1b2;
}

.btn-buy,
input .dropdown {
  cursor: pointer!important;
}

.fa-sort-down {
  color: white;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
li {
  color:black;
}

.fas {
  color:white;
}

.fa-times-circle {
  color: rgb(193, 132, 132);
}

.result {
  width: 100%;
  display: flex;
}

@media (max-width:446px) {
  .buy {
    margin: 10px;
  }

  .container-filter,
  .field {
    height: 80px;
    border-radius: 6px;
  }

  .close-search-container {
    z-index:1;
  }

  .dropdown ul {
    left:-40px;
  }
}
</style>
