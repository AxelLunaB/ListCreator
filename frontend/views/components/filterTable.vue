<template>
  <div class="filter-container">
      <div v-if="show" class="close-filter" @click="removeFilter(),show = false">
        <span><i class="far fa-window-close"></i>	&nbsp;	&nbsp;Quitar filtros</span>
      </div>
      <div class="container-filter">
        <div class="field">
          <div class="control">
            <div class="dropdown-container">
              <button class="btn-buy" @click="setFilterAs('level')" value="nivel" id="name">Nivel</button>
              <span class="dropdown">
                <button class="btn-buy"><i class="fas fa-sort-down fa-xs"></i></button>
                    <input type="checkbox">
                    <ul>
                      <li v-for= "(item,index) in level" :key="index" @click="setSpecialFilter({id:item.id,value:item.value}), show = true">
                        <p> {{ item.level }}</p>
                      </li>
                    </ul>
              </span>
              </div>
            <div class="dropdown-container">
              <button class="btn-buy" @click="setFilterAs('priceTotal')" value="precio" id="name">Precio</button>
              <span class="dropdown">
                <button class="btn-buy"><i class="fas fa-sort-down fa-xs"></i></button>
                    <input type="checkbox">
                    <ul>
                      <li v-for= "(item, index) in price" :key="index" @click="setSpecialFilter({id:item.id,value:item.value}), show = true">
                        <p> {{ item.cost }} </p>
                      </li>
                    </ul>
              </span>
              </div>
            <div class="dropdown-container">
              <button class="btn-buy" @click="setFilterAs('status')" value="status" id="name">Status</button>
              <span class="dropdown">
                <button class="btn-buy"><i class="fas fa-sort-down fa-xs"></i></button>
                    <input type="checkbox">
                    <ul>
                      <li v-for= "(item, index) in status" :key="index" @click="setSpecialFilter({id:item.id,value:item.value}),  show = true">
                        <p> {{ item.stat }} </p>
                      </li>
                    </ul>
              </span>
              </div>
          </div>
        </div>
        </div>
        </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data:function(){
    return{
      level:[
        {level: '1', value:'1', id:'level'},
        {level: '2', value:'2', id:'level'},
        {level: '3' ,value:'3', id:'level'},
        {level: '4',value:'4', id:'level'}
      ],
      price:[
        {cost: 'Menos de $200,000.00', id:'priceTotal'},
        {cost: '$200,001.00 - $250,000.00', id:'priceTotal'},
        {cost: '$251,000.00 - $300,000.00', id:'priceTotal'},
        {cost: '$300,001.00 - $350,000.00', id:'priceTotal'},
        {cost: '$351,000.00 - $400,000.00', id:'priceTotal'}
      ],
      status:[
        {stat: 'Available', value:'Available', id:'status'},
        {stat: 'Sold', value:'Sold', id:'status'},
        {stat: 'reserved', value:'Reserved', id:'status'}
      ],
      show:false
    }
  },
  methods: {
    ...mapActions ({
      setFilterAs: 'departments/setFilter',
      setSpecialFilter: 'departments/setSpecialFilter',
      removeFilter: 'departments/removeSpecialFilter'
    })
  }
}
</script>

<style>
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
  background:#314734;
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
  color: white;
  background: #415f45;
  border:1px solid #415f45;
  z-index:2;
}

.dropdown input[type=checkbox]:checked + ul {
  display: block;
}

.dropdown ul li {
  display: block;
  padding: 10px 20px;
  white-space: nowrap;
  min-width: 100px;
}

.dropdown ul li:hover {
  background-color: #314734;
  cursor: pointer;
}

.dropdown ul li a {
  text-decoration: none;
  display: block;
  color: black
}

.dropdown ul li p {
  margin-bottom: 0;
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
    margin-bottom:15px;
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
  background: #415f45;
}

.btn-buy,
input .dropdown {
  cursor: pointer!important;
}

.fa-sort-down {
  color: white;
}

  .close-filter {
    background:#314734;
    color:white;
    position:fixed;
    right:20px;
    bottom:20px;
    z-index: 2;
    padding:10px;
    border-radius: 3px;
    box-shadow:  5px 5px 5px rgba(0, 0, 0, 0.50);
    cursor: pointer;
  }
</style>
