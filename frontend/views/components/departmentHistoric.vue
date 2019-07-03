<template>
  <div class="column is-12">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          ·{{historic.level}} #{{historic.deptnumber}}
        </p>
      </header>
      <table>
        <thead>
          <tr>
            <th></th>
            <th class="small-text has-text-centered">Tipo</th>
            <th class="medium-text has-text-centered">Precio Total</th>
            <th class="medium-text has-text-centered">Estado</th>
            <th class="medium-text has-text-centered">M<sup>2</sup> terraza</th>
            <th class="medium-text has-text-centered"> M<sup>2</sup> construcción</th>
            <th class="medium-text has-text-centered"> M<sup>2</sup> superficie</th>
            <th class="medium-text has-text-centered">Cajones</th>
            <th class="medium-text has-text-centered">Subtipo</th>
            <th class="medium-text has-text-centered">Vista</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ANTERIOR</td>
            <td class="small-text has-text-centered">{{historic.type}}</td>
            <td class="medium-text has-text-centered">{{historic.totalprice}}</td>
            <td class="medium-text has-text-centered">{{historic.statusId}}</td>
            <td class="medium-text has-text-centered">{{historic.terracem2}}</td>
            <td class="medium-text has-text-centered">{{historic.constructionm2}}</td>
            <td class="medium-text has-text-centered">{{historic.superficiem2}}</td>
            <td class="medium-text has-text-centered">{{historic.cajones}}</td>
            <td class="medium-text has-text-centered">{{historic.subtype}}</td>
            <td class="medium-text has-text-centered">{{historic.view}}</td>

          </tr>
          <tr>
            <td>NUEVO</td>
            <td class="small-text has-text-centered">{{historic.typenew}}</td>
            <td class="medium-text has-text-centered">{{historic.totalpricenew}}</td>
            <td class="medium-text has-text-centered">{{historic.statusIdnew}}</td>
            <td class="medium-text has-text-centered">{{historic.terracem2new}}</td>
            <td class="medium-text has-text-centered">{{historic.constructionm2new}}</td>
            <td class="medium-text has-text-centered">{{historic.superficiem2new}}</td>
            <td class="medium-text has-text-centered">{{historic.cajonesnew}}</td>
            <td class="medium-text has-text-centered">{{historic.subtypenew}}</td>
            <td class="medium-text has-text-centered">{{historic.viewnew}}</td>
          </tr>
        </tbody>
      </table>
      <footer class="card-footer">
        <a v-if="!isDetailed" v-on:click="triggerDetailView()" class="card-footer-item">Ver todos</a>
        <a href="#" class="card-footer-item">Restaurar</a>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  props: ["historic","isDetailed"],
  mounted: function() {},
  data() {
    return {};
  },
  methods: {
    toPrice() {
      return this.department.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    },
    triggerDetailView() {
      this.$eventHub.$emit("add-department-historic-detail", this.historic);
    }
  }
};
</script>
