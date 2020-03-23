<template>
  <div>
    <div class="bar" style="width: 100%; height: 70px; position: relative; "></div>
      <div class="main" style="overflow-x: hidden;position: relative;height: 94.9vh;">
        <div style="position:fixed; top:90px; left:14px; z-index=3">
          <div class="input-group mb-3">
            <div class="input-group-prepend ">
              <span class="input-group-text main-color" id="new-list">Add new list</span>
            </div>
            <input type="text" class="form-control" placeholder="Listname" aria-label="Listname" aria-describedby="new-list" v-model="newListName">
            <button type="button" class="btn main-color ml-2 grow" @click="addNewList()">+</button>
          </div>

        </div>
        <div v-if="currentLists.length == 0" class="wrapper-page row cards-container" style="position: relative;overflow:hidden;" id="wrapper-page">
          <div class="card w-75 main-color">
            <div class="card-body main-color">
              <h5 class="card-title">You dont have any wishlist!</h5>
              <p class="card-text">To add a new wishlist please enter a name and click on the plus icon on the top.</p>
            </div>
          </div>
        </div>
        <div v-else class="wrapper-page row cards-container" style="position: relative;overflow:hidden;" id="wrapper-page">
                 <list  v-for="(list,index) in currentLists" :listData="currentLists[index]" ></list>
        </div>
      </div>
  </div>
</template>

<script>
import list from "./components/list.vue";
import { mapGetters } from "vuex";
import swal from 'sweetalert';

export default {
  mounted:function(){

  },
  components: {
    list
  },

  data() {
    return {
      currentLists: [],
      newListName: ''
    }
  },
  methods:{
    addNewList() {
      if(this.newListName === '')
      {
        swal({title:'Please add a list name',icon:"error",timer: 3000});
        return;
      }

      let newList = {
        id: this.currentLists.length,
        name: this.newListName
      }
      this.currentLists.push(newList);

      swal({title:'List Added!',icon:"success",timer: 2000});
    }
  },
  computed:{
      ...mapGetters({

      })
  }
}
</script>

<style lang="scss">

@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

html,
body {
  height: 100%;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
}
.main-color {
  background: #100c31!important;
  color: #fbfbfb
}
.grow {
  transition: all .2s ease-in-out;
}
.grow:hover {
  transform: scale(1.1);
  color:#fff;
}
.wrapper-page {
  display: flex;
  justify-content: space-around;
  width:100%;
  max-width:1500px;
  min-height: min-content; /* needs vendor prefixes */
  overflow: scroll;


}


</style>
