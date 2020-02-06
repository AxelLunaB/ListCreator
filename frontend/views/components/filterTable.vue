<template>
  <div class="filter-container" style="max-width:800px;">
      <div v-if="show" v-bind:class ="{ fadeIn : show }" class="close-filter" @click="removeFilter(),closeSearch()">
        <span><i class="fas fa-times"></i>	&nbsp;	&nbsp;Remove filters</span>
      </div>
      <div class="container-filter">
        <div class="field">
          <div class="control">
            <div class="dropdown-container">
              <button class="btn-buy" @click="setFilterAs('houseModel')" value="houseModel" id="name">Modelo</button>
              <span class="dropdown">
                <button class="btn-buy"><i class="fas fa-sort-down fa-xs"></i></button>
                    <input type="checkbox" class="checkboxes">
                    <ul id="dropdown1">
                      <li v-for= "(item,index) in level" :key="index" @click="setSpecialFilter({ id: item.id, value: item.value }),hideDropdown(0,item.level)">
                        <p> {{ item.level }}</p>
                      </li>
                    </ul>
              </span>
              </div>

            <div class="dropdown-container">
              <button class="btn-buy" @click="setFilterAs('suburb')" value="suburb" id="name">Estatus</button>
              <span class="dropdown">
                <button class="btn-buy"><i class="fas fa-sort-down fa-xs"></i></button>
                    <input type="checkbox" class="checkboxes">
                    <ul id="dropdown3" style = "height: 131px;">
                      <li v-for= "(item, index) in price" :key="index" @click="setSpecialFilter({id:item.id,value:item.value}),hideDropdown(1,item.status)">
                        <p> {{ item.status }} </p>
                      </li>
                    </ul>
              </span>
              </div>

            <div class="dropdown-container">
              <button class="btn-buy" @click="setFilterAs('suburb')" value="suburb" id="name">Manzana</button>
              <span class="dropdown">
                <button class="btn-buy"><i class="fas fa-sort-down fa-xs"></i></button>
                    <input type="checkbox" class="checkboxes">
                    <ul id="dropdown3" style = "height: 250px; overflow-y: scroll;">
                      <li v-for= "(item, index) in status" :key="index" @click="setSpecialFilter({id:item.id,value:item.value}),hideDropdown(2,item.stat)">
                        <p> {{ item.stat }} </p>
                      </li>
                    </ul>
              </span>
              </div>
          </div>
        </div>

        <p style='font-size:1.2rem;'><span v-if="filters0">Modelo {{filters0}} </span><span v-if="filters1"> &nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-chevron-right"></i>&nbsp;&nbsp;&nbsp;&nbsp; Estatus {{filters1}} </span><span v-if="filters2"> &nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-chevron-right"></i>&nbsp;&nbsp;&nbsp;&nbsp; Manzana {{filters2}} </span></p>
        </div>
        </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from "vuex";

export default {
  mounted(){
  },
  data:function(){
    return{
      level:[
        {level:'M1D', value:'M1D', id:'houseModel'},
        {level:'M1I', value:'M1I', id:'houseModel'},
        {level:'M2D', value:'M2D', id:'houseModel'},
        {level:'M2I' ,value:'M2I', id:'houseModel'},
        {level:'M3D',value:'M3D', id:'houseModel'},
        {level:'M3I',value:'M3I', id:'houseModel'},
        {level:'M4D',value:'M4D', id:'houseModel'},
        {level:'M4I',value:'M4I', id:'houseModel'}
      ],
      price:[
        {status: 'DISPONIBLE', value: 1, id:'status'},
        {status: 'VENDIDO', value: 2, id:'status'},
        {status: 'APARTADO', value: 3, id:'status'},
        {status: 'BLOQUEADO', value: 4, id:'status'}
      ],
      status:[
        {stat: 'A', value:'A', id:'block'},
        {stat: 'B', value:'B', id:'block'},
        {stat: 'C', value:'C', id:'block'},
        {stat: 'D', value:'D', id:'block'},
        {stat: 'E', value:'E', id:'block'},
        {stat: 'F', value:'F', id:'block'},
        {stat: 'G', value:'G', id:'block'},
        {stat: 'H', value:'H', id:'block'},
        {stat: 'I', value:'I', id:'block'},
        {stat: 'J', value:'J', id:'block'},
        {stat: 'K', value:'K', id:'block'},
        {stat: 'L', value:'L', id:'block'},
        {stat: 'M', value:'M', id:'block'},
        {stat: 'N', value:'N', id:'block'},
        {stat: 'O', value:'O', id:'block'},
        {stat: 'P', value:'P', id:'block'},
        {stat: 'Q', value:'Q', id:'block'},
        {stat: 'R', value:'R', id:'block'},
        {stat: 'S', value:'S', id:'block'},
        {stat: 'T', value:'T', id:'block'},
        {stat: 'U', value:'U', id:'block'},
        {stat: 'V', value:'V', id:'block'},
        {stat: 'w', value:'w', id:'block'},
        {stat: 'x', value:'x', id:'block'}
      ],
      show:false,
      filters0:null,
      filters1:null,
      filters2:null
    }
  },
  methods: {
    ...mapActions ({
      setFilterAs: 'units/setFilter',
      setSpecialFilter: 'units/setSpecialFilter',
      removeFilter: 'units/removeSpecialFilter',
      setPriceFilter:'units/setPriceFilter'
    }),

    hideDropdown(i,x){
      switch(i){
        case 0:
        this.filters0 = x
        break;
        case 1:
         this.filters1 = x
        break;
        case 2:
         this.filters2 = x
      }
      this.show = true
      var inputs = document.querySelectorAll('.checkboxes');
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
        }

    },
    closeSearch(){
      this.show = false
      this.filters0 = null
      this.filters1 = null
      this.filters2 = null
    }
  }
}
</script>

<style>
.filter-container{
  max-width: 1000px;
  margin: 0 auto;
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
  font-size: 14px;
}

.dropdown > a, .dropdown > button {
  font-size: 14px;
  background-color: white;
  border: none;
  padding: 10px;
  border-radius: 0 4px 4px 0;
  display: inline-block;
  color: rgb(255, 255, 255);
  text-decoration: none;
  background:#252d33;
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
  background: red;
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
  background: #252d33;
  border:1px solid #252d33;
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
  background-color: #323d46;
  cursor: pointer;
}

.dropdown ul li a {
  text-decoration: none;
  display: block;
  color: white;
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
    margin:15px 0 15px 0;

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
  background: #21282e;
}

.btn-buy,
input .dropdown {
  cursor: pointer!important;
}

.filter-container p {
  color: white;
}

.fa-sort-down {
  color: white;
}

  .close-filter {
    background: #3c4857;
    color: #fff;
    position: fixed;
    right: 259px;
    z-index: 1;
    padding: 10px;
    border-radius: 3px;
    box-shadow: 5px 5px 5px rgba(0,0,0,.5);
    cursor: pointer;
    top: 200px;
  }

.fadeIn {
   animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
    20% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
