<template>
    <div class="app-container container has-navbar-fixed-top">
      <div class="columns is-multiline padding-12" v-if="isSearching">
        <div class="column card">
          <div class="columns is-mobile">
            <div class="column is-10">
              <h1>Buscando: {{searchHeaderTitle}}</h1>
            </div>
            <div class="column is-2 has-text-centered">
              <a class="delete is-large" v-on:click="resetSearch()"></a>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-multiline">
        <lot v-for="l in lots" :key="l.id" :lot="l"></lot>
      </div>
      <div>
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
          <a v-on:click="prevPage" class="pagination-previous">Anterior</a>
          <a v-on:click="nextPage" class="pagination-next">Siguiente</a>
          <ul class="pagination-list">
            <li v-for="n in pagesDisplay" :key="n" v-on:click="goToPage(n)">
              <a :class="pageClass(n)" aria-label="Goto page 1">{{n+1}}</a>
            </li>
          </ul>
        </nav>
      </div>
    <lot-detail></lot-detail>
    <new-lot></new-lot>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import lot from "./components/lot.vue";
import lotDetail from "./components/lotDetail.vue";
import newLot from "./components/newLot.vue";

export default {
  components: {
    lot,
    lotDetail,
    newLot
  },
  mounted: function() {
    // events ...
    this.$eventHub.$on("add-button-clicked", this.addLot);
    this.$eventHub.$on("clone-lot", this.cloneLot);
    this.$eventHub.$on("go-search", params => {
      var query = {};
      params.forEach(v => {
        if (v[1] != "") {
          query[v[0]] = v[1];
        }
      });
      this.$store.dispatch("lots/goSearch", query);
    });
    var isAuthenticated = this.$store.state.others.isAuthenticated;
    if (isAuthenticated) {
      // Dispatch actions &&  subscribe to rt events.
      this.$store.dispatch("lots/getLots");
      this.$store.dispatch("lots/listenEvents");
      this.$store.dispatch("others/setPlusButton", true);
      // listen to authenticated event
    } else {
      let _ = this;
      this.$eventHub.$on("authenticated", function() {
        _.$store.dispatch("lots/getLots");
        _.$store.dispatch("lots/listenEvents");
        _.$store.dispatch("others/setPlusButton", true);
      });
    }
    // this.$store.commit("deleteSearchQuery");
    // this.$store.commit("deleteSearching");
    // this.$store.commit("addButton",true);
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("lots", ["nextPage", "prevPage"]),
    goSearch(payload) {
      const _ = this;
      // console.log("searching...");
      if (payload != null) {
        var searchQuery = {};
        payload.forEach(v => {
          searchQuery[v[0]] = v[1];
        });
        // this.$store.commit("setSearchQuery", searchQuery);
        // this.$store.commit("setSearching", true);
        _.total = 0;
        _.limit = 0;
        _.pages = 0;
      } else {
      }
      var searchQ = this.$store.state.searchQuery;
      searchQ.$skip = _.index * _.limit;
      //TODO: Do search
    },
    addLot() {
      // console.log('Add button clicked.');
      this.$eventHub.$emit("show-new-lot-modal", null);
    },
    cloneLot(lot) {
      this.$eventHub.$emit("show-new-lot-modal", lot);
    },
    resetSearch() {
      this.$store.dispatch("lots/goSearch", null);
    }
  },
  computed: {
    ...mapGetters({
      lots: "lots/lots",
      searchQuery: "lots/query",
      clusters: "others/clusters"
    }),
    isSearching() {
      return this.searchQuery != null;
    },
    searchHeaderTitle() {
      var searchQ = this.searchQuery;
      var title = "";

      var cluster = this.clusters.filter(e => {
        return e.id == searchQ.clusterId;
      });
      if (cluster.length > 0) {
        title += `${cluster[0].name}`;
      }
      if (searchQ.lotnumber != null) {
        title += `, # ${searchQ.lotnumber}`;
      }
      if (searchQ.block != null) {
        title += `, manzana: ${searchQ.block}`;
      }
      return title;
    },
    pagesDisplay() {
      if (Math.ceil(this.pages) > 10) {
        var array = [0, 1];
        var start = this.index > 3 ? this.index : 4;
        for (var i = 0, j = start - 2; i < 5; i++) {
          var k = j + i;
          if (k <= Math.ceil(this.pages) - 3) {
            array.push(k);
          }
        }
        array.push(Math.ceil(this.pages) - 2);
        array.push(Math.ceil(this.pages) - 1);
        return array;
      } else {
        var array = [];
        for (i = 0; i < Math.ceil(this.pages); i++) {
          array.push(i);
        }
        return array;
      }
    }
  }
};
</script>
<style lang="scss" src="../styles/main.scss">
</style>





