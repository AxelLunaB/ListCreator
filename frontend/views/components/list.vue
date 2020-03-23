<template>
  <div class="card-body col-md-5 col-sm-12 col-lg-4 col-xl-3 animate tower-card main-color-card">
    <div class="card-header-tab card-header main-color">
      <div class="card-header-title font-size-lg text-capitalize font-weight-normal"><i class="fa fa-tasks"></i>&nbsp;{{listData.name}}</div>
    </div>
    <div class="scroll-area-sm">
          <div class="ps-show-limits">
            <div style="position: static;" class="ps ps--active-y">
                <div class="ps-content">
                    <ul class=" list-group list-group-flush">

                      <template v-if="tasks.length > 0">
                          <task  v-for="(task,index) in tasks" :taskData="tasks[index]" :OnTaskDelete="OnTaskDelete" ></task>
                      </template>
                      <template v-else>
                        <div class="card-body" style="background-color: rgba(0,0,0,.03)">
                          <h5 class="card-title main-text-color">You dont have any item yet!</h5>
                          <p class="card-text main-text-color">To add a new item please enter a name below and click Add item button!.</p>
                        </div>
                      </template>

                    </ul>
                </div>
            </div>
        </div>
    </div>
        <div class="d-block text-right card-footer">
          <div class="input-group mb-3">
            <div class="input-group-prepend ">
              <span class="input-group-text main-color" id="new-list">Add new Item</span>
            </div>
            <input type="text" class="form-control" placeholder="Item name" aria-label="taskname" aria-describedby="new-task" v-model="newTask">
            <button type="button" class="btn main-color ml-2 grow" @click="AddNewTask()">+</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import task from "./task.vue";
export default {
  name: "list",
  props:['listData'],
  components: {
    task
  },
  mounted: function () {
    this.$eventHub.$on("task-delete", val => {
    this.OnTaskDelete(val);
    });
  },
  data() {
    return {
      newTask:'',
      tasks: []
    }

  },
  methods:{
      AddNewTask() {
        if(this.newTask === '')
        {
          swal({title:'Please add a item name',icon:"error",timer: 3000});
          return;
        }

        let dateFormatted = this.GetDate();

        let newTask = {
          id: this.tasks.length,
          parentList: this.listData.id,
          name: this.newTask,
          creationDate: dateFormatted
        }
        this.tasks.push(newTask);

        swal({title:'Item Added!',icon:"success",timer: 1000});
      },
      GetDate() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;

        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        return dd + '/' + mm + '/' + yyyy
      },
      OnTaskDelete (value) {

        for (var i = 0; i < this.tasks.length; i ++) {
          if (this.tasks[i].id == value.id && this.listData.id == value.parentList) {
            this.tasks.splice(i, 1);
          break;
          }
        }
      }
    },
};
</script>
<style lang="scss">

.main-text-color {
   color:#100c31
}
.scroll-area-sm {
    height: 288px;
    overflow-x: hidden
}

.list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125)
}

.list-group {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0
}


  .card-body {
    background: #e6e6eb;
    margin:10px;
    border-radius: 3px;
    color: white;
    cursor: pointer;
    padding: .25rem;
  }

  .main-color-card {
      background: #fff!important;
      color: #000
  }



.animate {
  animation: fadeInAnimation 1s forwards;
}

.router {
  color:white;
}

.router:hover {
  text-decoration: none;
  color:white;
}




@keyframes loadAnimation {
  0%   {
    width:0%;
     }

  30% {
    width:0%;
  }

  100% {
    width:100%;
    }
}

@keyframes fadeInAnimation {
  0%   {
    opacity: 0;
    transform: translateY(-5px);
     }

  40%   {
    opacity: 0;
    transform: translateY(-5px);
     }

  100% {
    opacity: 1;
    transform: translateY(5px);
    }
}
</style>
