<template>
  <div id="app">
    <div class="app-container container has-navbar-fixed-top">
      <div class="columns is-mobile is-multiline">
        <dashboard-card v-for="v in countDepartments" :count="v" :key="v.name"></dashboard-card>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import dashboardCard from './components/dashboardCard.vue';

export default {
  components: {
    dashboardCard,
  },
  mounted: function() {
    var isAuthenticated = this.$store.state.others.isAuthenticated;
    if (isAuthenticated) {
      // Dispatch actions &&  subscribe to rt events.
      this.$store.dispatch("others/getCountDepartments");
      // listen to authenticated event
    } else {
      let _ = this;
      this.$eventHub.$on("authenticated", function() {
        _.$store.dispatch("others/getCountDepartments");
      });
    }
  },

  computed: {
    ...mapGetters({
      countDepartments: "others/countDepartments"

    })

  }
};
</script>
<style lang="scss" src="../styles/main.scss">
</style>
