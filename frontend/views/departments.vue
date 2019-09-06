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
      <div id="top"></div>
      <filter-department></filter-department>
      <div class="columns is-multiline cards-margin">
        <!-- <department v-for="l in filtersArray" :key="l.id" :department="l"></department> -->
       <department v-for="l in filtersArray" :key="l.index" :department="l"></department> <!--key changed to avoid conflict with filter. "l.id" original key.-->
      </div>
      <department-detail></department-detail>
      <new-department></new-department>
      <arrow></arrow>
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <a v-on:click="prevPage" class="pagination-previous color-btn">Anterior</a>
        <a v-on:click="nextPage" class="pagination-next color-btn">Siguiente</a>
        <ul class="pagination-list">
          <li v-for="n in pagesDisplay" :key="n">
            <a aria-label="Goto page 1">{{n+1}}</a>
          </li>
        </ul>
      </nav>
    </div>
</template>


<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import department from "./components/departments.vue";
import departmentDetail from "./components/departmentDetail.vue";
import newDepartment from "./components/newDepartment.vue";
import arrow from "./components/arrow.vue"
// import { lookup } from 'dns';

export default {
  components: {
    department,
    departmentDetail,
    newDepartment,
    arrow
  },
  mounted: function() {
    // events...
    this.$eventHub.$on("add-button-clicked", this.addDepartment);
    this.$eventHub.$on("clone-department", this.cloneDepartment);
    this.$eventHub.$on("go-search", params => {
      var query = {};
      params.forEach(v => {
        if (v[1] != "") {
          query[v[0]] = v[1];
        }
      });
      this.$store.dispatch("departments/goSearch", query);
    });
    // logic
    var isAuthenticated = this.$store.state.others.isAuthenticated;
    if (isAuthenticated) {
      // Dispatch actions &&  subscribe to rt events.
      this.$store.dispatch("departments/getDepartments");
      this.$store.dispatch("others/setPlusButton", true);
      this.$store.dispatch("departments/listenEvents");
      // listen to authenticated event
    } else {
      let _ = this;
      this.$eventHub.$on("authenticated", function() {
        _.$store.dispatch("departments/getDepartments");
        _.$store.dispatch("others/setPlusButton", true);
        _.$store.dispatch("departments/listenEvents");
      });
    }
  },
  data() {
    return {
      sDepartments: []
    };
  },
  methods: {
    ...mapActions("departments", ["nextPage", "prevPage"]),
    goSearch(payload) {
      const _ = this;
      if (payload != null) {
        var searchQuery = {};
        payload.forEach(v => {
          searchQuery[v[0]] = {
            $iLike: `%${v[1]}%`
          };
        });

        _.total = 0;
        _.limit = 0;
        _.pages = 0;
      } else {
      }
      var searchQ = this.$store.state.searchQuery;
      searchQ.$skip = _.index * _.limit;
    },
    addDepartment() {
      this.$eventHub.$emit("show-new-department-modal", null);
    },
    cloneDepartment(department) {
      this.$eventHub.$emit("show-new-department-modal", department);
    },
    resetSearch() {
      this.$store.dispatch("departments/goSearch", null);
    }
  },
  computed: {
    ...mapGetters({
      departments: "departments/departments",
      searchQuery: "departments/query",
      clusters: "others/clusters",
      filteredValue: "departments/filterValue",
      specialSort: "departments/specialSort"
    }),
    sortedArray() {
      let s =  this.filteredValue.toString()

      function compare(a, b) {
        if (a[s] < b[s])
          return -1;
        if (a[s] > b[s])
          return 1;
        return 0;
      }

     return this.sDepartments.length > 0 ? this.sDepartments.sort(compare) : this.departments.sort(compare);
    },
     filtersArray () {
      let filters = this.specialSort
      var deptos = []
      this.sDepartments = []

       this.departments.forEach ((dep, index) => {
        filters.forEach (filter => {
          if(filter.value === null)
           return
          if(dep[filter.id] == filter['value']) {
            let shouldAdd = true
            for( var i = 0; i < deptos.length; i++) {
              if(deptos[i].id == dep.id) {
                shouldAdd = false
              }
            }
            if (shouldAdd === true) {
            deptos.push(dep)
          }
        }
      })
    })

      if(deptos.length > 0) {
       for (var i = deptos.length -1 ; i >= 0; i--) {
        for (let a = 0; a < filters.length; a ++) {

          if(filters[a].value == null) {
          continue
          }
          if(deptos[i][filters[a].id] != filters[a].value) {
            deptos.splice (i,1)
            break
          }
        }
      }
    }

      this.sDepartments = deptos
      // return deptos.length > 0 ? this.sDepartments : this.sortedArray
       return this.sortedArray
          //return deptos.length > 0 ? this.sDepartments : this.sortedArray

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
    },
    isSearching() {
      return this.searchQuery != null;
    },
    searchHeaderTitle() {
      var searchQ = this.searchQuery;
      var title = "";

      if (searchQ.deptnumber != null) {
        title += ` #${searchQ.deptnumber}`;
      }
      if (searchQ.level != null) {
        title += `, Nivel: ${searchQ.level}`;
      }
      return title;
    }
  }
};
</script>
<style lang="scss" src="../styles/main.scss">
</style>

<style>
.color-btn {
  border: none;
}

.color-btn:hover {
  color: #b9b9b9;
  transition: 0.3s;
}

.cards-margin {
  padding-top: 32px;
}

</style>
