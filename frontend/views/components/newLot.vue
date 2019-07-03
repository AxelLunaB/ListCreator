<template>
  <div :class="modalClass">
  <div class="modal-background"></div>
  <div class="modal-content">
    <div class="box">
      <h1 class="title"> Nuevo Lote</h1>
      <form id="new-lot-form">
        <div class="field">
           <div class="control">
            Clúster
          </div>
          <div class="control">
            <div class="select">
              <select name="clusterId">
                <option v-for="(s,i) in clusters" :key="i" :value="s.id" :selected="s.id === lot.cluster.id">{{s.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            Manzana
          </div>
          <div class="control">
            <input class="input" type="text" name="block" placeholder="Block" :value="computedLot.block">
          </div>
        </div>
        <div class="field">
          <div class="control">
            # de lote
          </div>
          <div class="control">
            <input class="input" type="text" name="lotnumber" placeholder="LotNumber" :value="computedLot.lotnumber">
          </div>
        </div>
        <div class="field">
          <div class="control">
            Tipo
          </div>
          <div class="control">
            <input class="input" type="text" name="type" placeholder="Type" :value="computedLot.type">
          </div>
        </div>
        <div class="field">
          <div class="control">
            Metros<sup>2</sup> terreno
          </div>
          <div class="control">
            <input class="input" type="text" name="terrainm2" placeholder="Terrain M2" :value="computedLot.terrainm2">
          </div>
        </div>
        <div class="field">
          <div class="control">
            Precio total
          </div>
          <div class="control">
            <input class="input" type="text" name="totalprice" placeholder="Total Price" :value="computedLot.totalprice">
          </div>
        </div>
        <div class="field">
          <div class="control">
            Precio por m<sup>2</sup>
          </div>
          <div class="control">
            <input class="input" type="text" name="pricem2" placeholder="PriceM2" :value="computedLot.pricem2">
          </div>
        </div>
        <div class="field">
          <div class="control">
            Estado
          </div>
          <div class="control">
            <div class="select">
              <select name="statusId">
                <option v-for="(s,i) in status" :key="i" :value="s.id" :selected="s.id === lot.status.id">{{s.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            Número oficial
          </div>
          <div class="control">
            <input class="input" type="text" name="officialnumber" placeholder="Official Number" :value="computedLot.officialnumber">
          </div>
        </div>
      </form>
      <br>
      <div class="field">
        <div class="control">
          <div class="buttons">
            <button v-on:click="addNewLot()" class="button">Añadir</button>
            <button v-on:click="cancelCreation()" class="button">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button v-on:click="cancelCreation()" class="modal-close is-large" aria-label="close"></button>
</div>
</template>
<script>
import $ from "jquery";
import swal from "sweetalert";
import { mapGetters } from "vuex";

export default {
  name: "newLot",
  mounted: function() {
    this.$eventHub.$on("show-new-lot-modal", lot => {
      if (lot != null) {
        this.lot = lot;
      } else {
      }
      this.isVissible = true;
    });
  },
  data() {
    return {
      isVissible: false,
      lot: {
        cluster: {},
        status: {}
      }
    };
  },
  methods: {
    addNewLot() {
      const _ = this;
      var frm = $("#new-lot-form").serializeArray();
      var lot = {};
      frm.forEach(element => {
        lot[element.name] = element.value;
      });
      this.$store
        .dispatch("lots/newHouse", lot)
        .then(response => {
          console.log(response);
          _.isVissible = false;
          swal({
            title: "Lote añadido",
            text: `${response.cluster.name} #${
              response.lotnumber
            } agregado con èxito`,
            icon: "success",
            buttons: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err);
          var title = "¡Error!";
          var text = "Error inesperado, vuelve a intentarlo mas tarde.";
          var timer = 1750;
          if (err.code == 409) {
            title = "Registro existente";
            text =
              "Ya existe un registro con esos mismos datos, por favor cambia el número de lote o manzana.";
              timer = 4000;
          }
          swal({
            title,
            text,
            icon: "error",
            buttons: false,
            timer
          });
        });
    },
    cancelCreation() {
      this.isVissible = false;
      this.lot = {
        cluster: {},
        status: {}
      };
    }
  },
  computed: {
    ...mapGetters({
      status: "others/status",
      clusters: "others/clusters"
    }),
    computedLot() {
      if (this.lot == {}) {
        return {
          id: "",
          cluster: {},
          block: "",
          lotnumber: "",
          type: "",
          terrainm2: "",
          totalprice: "",
          pricem2: "",
          status: {},
          officialnumber: "",
          createdAt: "",
          updatedAt: ""
        };
      } else {
        return this.lot;
      }
    },
    modalClass() {
      return `modal ${this.isVissible ? "is-active" : ""}`;
    }
  }
};
</script>

