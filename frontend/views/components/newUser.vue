<template>
  <div class="add-new-user" style="z-index:2" v-if="addUser" :class= "{ animate : addUser}">
    add new user
  </div>
</template>

<script>
export default {
  props:['addUser']
}
</script>

<style>
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
