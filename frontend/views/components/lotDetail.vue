<template>
  <div>
    <div :class="modalClass">
      <div v-on:click="closeBtn()" class="modal-background"></div>
       <div class="modal-content">
        <div class="card">
          <header class="modal-card-head">
            <p class="modal-card-title">{{lot.cluster.name || ''}} · #{{lot.lotnumber}} <small>{{lot.model}}</small></p>
            <button v-on:click="closeBtn()" class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <form id="lot-edit-form">
              <div class="columns is-mobile is-multiline">
              <!-- FIRST ROW -->
                <div class="column is-half-mobile">
                  MANZANA:
                </div>
                <div class="column has-text-left is-half-mobile">
                  {{lot.block}}
                </div>
                <div class="column is-half-mobile">
                  ESTADO:
                </div>
                <div class="column has-text-left is-half-mobile">
                  <div v-if="!isEdditing">
                    {{lot.status.name}}
                  </div>
                  <div v-if="isEdditing">
                    <div class="select">
                      <select name="statusId">
                        <option v-for="(s,i) in status" :key="i" :value="s.id" :selected="s.id === lot.status.id">{{s.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns is-mobile is-multiline">
                <!-- HEADERS -->
                 <div class="column is-half">
                  Modelo
                </div>
                <div class="column is-half">
                  <div v-if="!isEdditing">
                  {{lot.type}}
                  </div>
                  <div v-if="isEdditing">
                    <input class="input" type="text" name="type" :value="lot.type">
                  </div>
                </div>
                <div class="column is-half">
                  TERRENO M2
                </div>
                <div class="column is-half">
                  <div v-if="!isEdditing">
                  {{lot.terrainm2}}
                  </div>
                  <div v-if="isEdditing">
                    <input class="input" type="text" name="terrainm2" :value="lot.terrainm2">
                  </div>
                </div>
                <div class="column is-half">
                  Precio M2
                </div>
                <div class="column is-half">
                  <div v-if="!isEdditing">
                    {{lot.pricem2}}
                  </div>
                  <div v-if="isEdditing">
                    <input class="input" type="text" name="pricem2" :value="lot.pricem2">
                  </div>
                </div>
                <div class="column is-half">
                  Precio total
                </div>
                <div class="column is-half">
                  <div v-if="!isEdditing">
                    {{lot.totalprice}}
                  </div>
                  <div v-if="isEdditing">
                    <input class="input" type="text" name="totalprice" :value="lot.totalprice">
                  </div>
                </div>
                 <div class="column is-half">
                  Número Oficial
                </div>
                <div class="column is-half">
                  <div v-if="!isEdditing">
                    {{lot.officialnumber}}
                  </div>
                  <div v-if="isEdditing">
                    <input class="input" type="text" name="officialnumber" :value="lot.officialnumber">
                  </div>
                </div>
              </div>
            </form>
          </section>
          <div class="modal-card-foot">
            <div v-if="isEdditing" class="buttons is-centered max-width">
              <button v-on:click="saveChanges(true)" class="button">Guardar y cerrar</button>
              <button v-on:click="saveChanges(false)" class="button">Guardar</button>
              <button v-on:click="edit(false)" class="button">Cancelar</button>
            </div>
            <div v-if="!isEdditing" class="buttons is-left max-width">
              <button v-on:click="edit(true)" class="button">Editar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { mapGetters } from "vuex";

export default {
  props: [],
  mounted: function() {
    this.$eventHub.$on("show-lot-detail-modal", lot => {
      this.lot = lot;
      this.show = true;
    });
  },
  data() {
    return {
      isEdditing: false,
      show: false,
      lot: {
        cluster: {},
        status: {}
      }
    };
  },
  methods: {
    closeBtn() {
      this.show = this.isEdditing = false;
    },
    edit(b) {
      this.isEdditing = b;
    },
    saveChanges(close) {
      const formData = $("#lot-edit-form").serializeArray();
      const _ = this;
      var data = {};
      formData.map(function(v) {
        data[v.name] = v.value;
      });
      data.id = _.lot.id;
      this.$store
        .dispatch("lots/updateLot", data)
        .then(response => {
          swal({
            title: "Lote actualizado.",
            text: `${response.cluster.name} #${
              response.lotnumber
            } modificado con éxito`,
            icon: "success",
            buttons: false,
            timer: 1500
          });
          if (close) {
            _.closeBtn();
          } else {
            _.isEdditing = false;
          }
        })
        .catch(err => {
          // console.log(err);
          var text = `Error inesperado, vuelve a intentarlo mas tarde....`;
          var title = "¡Error!";
          var timer = 1750;
          if (err.code == 403) {
            // forbidden can be launch because of lack of permissions.
            title = "Permisos denegados";
            text =
              "No tienes permisos para realizar esta acción. Comunícate con tu supervisor ";
              timer = 2500
          }
          swal({
            title,
            text,
            icon: "error",
            buttons: false,
            timer
          });
        });
    }
  },
  computed: {
    ...mapGetters({
      status: "others/status"
    }),
    modalClass() {
      var c = "modal";
      c += this.show ? " is-active" : "";
      return c;
    }
  }
};
</script>

