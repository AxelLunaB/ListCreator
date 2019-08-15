<template>
  <div class="add-new-user" style="z-index:2" v-if="addUser" :class= "{ animate : addUser}">
    <div class="col-sm-0 col-md-1 col-lg-1 col-xl-4">
      2131
    </div>
    <div class="col-sm-0 col-md-1 col-lg-1 col-xl-4">
      asadasds
    </div>
    <div class="col-sm-0 col-md-1 col-lg-1 col-xl-4">
      121321
    </div>
  </div>
</template>

<script>
export default {
  props:['addUser']
}
</script>

<style>

  @import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

div.add-new-user {
    position: fixed;
    background: #2a333c;
    left: 0;
    top: 69px;
    bottom: 0;
    right: 0;
    color:white;
}

</style>
