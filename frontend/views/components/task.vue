<template>
  <li class="list-group-item">
      <div class="todo-indicator bg-warning"></div>
      <div class="widget-content p-0">
          <div class="widget-content-wrapper">
              <div class="widget-content-left mr-2">
                  <div class="custom-checkbox custom-control"> <input class="custom-control-input" :id="taskData.parentList + taskData.id + taskData.name" v-model="isDone" type="checkbox"><label class="custom-control-label" :for="taskData.parentList + taskData.id  + taskData.name">&nbsp;</label> </div>
              </div>
              <div class="widget-content-left">
                  <div class="widget-heading">
                  {{taskData.name}}
                  </div>
                  <div class="widget-subheading"><i>{{taskData.creationDate}}</i></div>
              </div>
              <div class="widget-content-right"><button class="border-0 btn-transition btn btn-outline-danger" @click="EmitToDelete()"> <i class="fa fa-trash"></i> </button> </div>
          </div>
      </div>
  </li>
</template>

<script>
export default {
  name: "task",
  props:['taskData'],
  data () {
    return {
      isDone: false

    }
  },
  methods : {
    EmitToDelete () {
    this.$eventHub.$emit("task-delete", this.taskData);
    }
  },
};
</script>
<style lang="scss">

.widget-content {
    padding: 1rem;
    flex-direction: row;
    align-items: center
}

.widget-content .widget-content-wrapper {
    display: flex;
    flex: 1;
    position: relative;
    align-items: center
}

.widget-content .widget-content-right.widget-content-actions {
    visibility: hidden;
    opacity: 0;
    transition: opacity .2s
}

.widget-content .widget-content-right {
    margin-left: auto
}

.todo-indicator {
    position: absolute;
    width: 4px;
    height: 60%;
    border-radius: 0.3rem;
    left: 0.625rem;
    top: 20%;
    opacity: .6;
    transition: opacity .2s
}

</style>
