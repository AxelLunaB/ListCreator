<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view></router-view>
  </div>
</template>
<script>

import appNav from "@/views/components/nav.vue";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

export default {
  components: { appNav },
  mounted: function() {
    this.$store
      .dispatch("others/authenticate")
      .then(() => {
        this.$eventHub.$emit("authenticated");
        this.$store.dispatch("users/getCurrentUser");
        this.$store.dispatch("others/getStatus");
        this.$store.dispatch("others/getClusters");
      })
      .catch(err => {});
  }
};
</script>

<style>

.filter {
  padding-top: 100px;
  text-align: center;
}

html,
body {
  height: 100%;
}

#app {
  height: 100%;
  width:100%;
}

</style>
