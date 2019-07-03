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
        <house v-for="l in houses" :key="l.id" :house="l"></house>
      </div>
      <div>
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
          <a v-on:click="prevPage" class="pagination-previous">Anterior</a>
          <a v-on:click="nextPage" class="pagination-next">Siguiente</a>
          <ul class="pagination-list">
            <li v-for="n in pagesDisplay" :key="n">
              <a aria-label="Goto page 1">{{n+1}}</a>
            </li>
          </ul>
        </nav>
      </div>
      <house-detail></house-detail>
      <new-house></new-house>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import house from "./components/house.vue";
import houseDetail from "./components/houseDetail.vue";
import newHouse from "./components/newHouse.vue";

export default {
  components: {
    house,
    houseDetail,
    newHouse
  },
  mounted: function() {
    // events...
    this.$eventHub.$on("add-button-clicked", this.addHouse);
    this.$eventHub.$on("clone-house", this.cloneHouse);
    this.$eventHub.$on("go-search", params => {
      var query = {};
      params.forEach(v => {
        if (v[1] != "") {
          query[v[0]] = v[1];
        }
      });
      this.$store.dispatch("houses/goSearch", query);
    });
    // logic
    var isAuthenticated = this.$store.state.others.isAuthenticated;
    if (isAuthenticated) {
      // Dispatch actions &&  subscribe to rt events.
      this.$store.dispatch("houses/getHouses");
      this.$store.dispatch("others/setPlusButton", true);
      this.$store.dispatch("houses/listenEvents");
      // listen to authenticated event
    } else {
      let _ = this;
      this.$eventHub.$on("authenticated", function() {
        _.$store.dispatch("houses/getHouses");
        _.$store.dispatch("others/setPlusButton", true);
        _.$store.dispatch("houses/listenEvents");
      });
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("houses", ["nextPage", "prevPage"]),
    goSearch(payload) {
      const _ = this;
      // console.log("searching...");
      if (payload != null) {
        var searchQuery = {};
        payload.forEach(v => {
          searchQuery[v[0]] = {
            $iLike: `%${v[1]}%`
          };
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
      // var newQuery = {
      //   cluster: {$ilike: '%cima%'}
      // };
      // socket.emit("find", "api/houses", newQuery, (error, data) => {
      //   _.lots = [];
      //   data.data.forEach(l => {
      //     _.lots.push(l);
      //   });
      // });

      // var searchQ = {division: { $iLike: '%cima%' }};
      //TODO: Do search
    },
    addHouse() {
      // console.log('Add button clicked.');
      this.$eventHub.$emit("show-new-house-modal", null);
    },
    cloneHouse(house) {
      this.$eventHub.$emit("show-new-house-modal", house);
    },
    resetSearch() {
      this.$store.dispatch("houses/goSearch", null);
    }
  },
  computed: {
    ...mapGetters({
      houses: "houses/houses",
      searchQuery: "houses/query",
      clusters: "others/clusters"
    }),
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
    },
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
    }
  }
};
</script>
<style lang="scss" src="../styles/main.scss">
</style>





