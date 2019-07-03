<template>
  <div class="column is-12">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{historic.division }}  · {{historic.block}} #{{historic.lotnumber}}
        </p>
      </header>
      <table>
        <thead>
          <tr>
            <th></th>
            <th class="small-text has-text-centered">Modelo</th>
            <th class="medium-text has-text-centered">Precio Total</th>
            <th class="medium-text has-text-centered">Precio M<sup>2</sup></th>
            <th class="medium-text has-text-centered">M<sup>2</sup> terreno</th>
            <th class="medium-text has-text-centered">Estado</th>
            <th class="big-text has-text-centered"> Numero Oficial</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ANTERIOR</td>
            <td class="small-text has-text-centered">{{historic.type}}</td>
            <td class="medium-text has-text-centered">{{historic.totalprice}}</td>
            <td class="medium-text has-text-centered">{{historic.pricem2}}</td>
            <td class="medium-text has-text-centered">{{historic.terrainm2}}</td>
            <td class="medium-text has-text-centered">{{historic.status}}</td>
            <td class="big-text has-text-centered">{{historic.officialnumber}}</td>
          </tr>
          <tr>
            <td>NUEVO</td>
            <td class="small-text has-text-centered">{{historic.typenew}}</td>
            <td class="medium-text has-text-centered">{{historic.totalpricenew}}</td>
            <td class="medium-text has-text-centered">{{historic.pricem2new}}</td>
            <td class="medium-text has-text-centered">{{historic.terrainm2new}}</td>
            <td class="medium-text has-text-centered">{{historic.statusnew}}</td>
            <td class="big-text has-text-centered">{{historic.officialnumbernew}}</td>
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
      return this.lot.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    },
    triggerDetailView() {
      this.$eventHub.$emit("add-lot-historic-detail", this.historic);
    }
  }
};
</script>

