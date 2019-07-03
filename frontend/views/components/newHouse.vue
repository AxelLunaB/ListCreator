<template>
  <div :class="modalClass">
  <div class="modal-background"></div>
  <div class="modal-content">
    <div class="box">
      <h1 class="title"> Nueva Casa</h1>
      <form id="new-lot-form">

        <div class="field">
          <div class="control">
            Clúster
          </div>
          <div class="control">
            <div class="select">
              <select name="clusterId">
                <option v-for="(s,i) in clusters" :key="i" :value="s.id" :selected="s.id === house.cluster.id">{{s.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            Manzana
          </div>
          <div class="control">
            <input class="input" type="text" name="block" placeholder="Block" :value="computedHouse.block">
          </div>
        </div>
        <div class="field">
          <div class="control">
            # de Lote
          </div>
          <div class="control">
            <input class="input" type="text" name="lotnumber" placeholder="LotNumber" :value="computedHouse.lotnumber">
          </div>
        </div>
        <div class="field">
          <div class="control">
            Tipo
          </div>
          <div class="control">
            <input class="input" type="text" name="type" placeholder="Type" :value="computedHouse.type">
          </div>
        </div>

        <div class="field">
          <div class="control">
            Metros<sup>2</sup> Terreno
          </div>
          <div class="control">
            <input class="input" type="text" name="terrainm2" placeholder="Terrain M2" :value="computedHouse.terrainm2">
          </div>
        </div>
        <div class="field">
          <div class="control">
            Metros<sup>2</sup> Construcción
          </div>
          <div class="control">
            <input class="input" type="text" name="constructionm2" placeholder="Construction M2" :value="computedHouse.constructionm2">
          </div>
        </div>
        <div class="field">
          <div class="control">
            Número Oficial
          </div>
          <div class="control">
            <input class="input" type="text" name="officialnumber" placeholder="official number" :value="computedHouse.officialnumber">
          </div>
        </div>

        <div class="field">
          <div class="control">
            Estado
          </div>
          <div class="control">
            <div class="select">
              <select name="statusId">
                <option v-for="(s,i) in status" :key="i" :value="s.id" :selected="s.id === house.status.id">{{s.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            Precio Total
          </div>
          <div class="control">
            <input class="input" type="text" name="totalprice" placeholder="Total Price" :value="computedHouse.totalprice">
          </div>
        </div>
        <div class="field">
          <div class="control">
            Precio por M<sup>2</sup>
          </div>
          <div class="control">
            <input class="input" type="text" name="pricem2" placeholder="Price M2" :value="computedHouse.pricem2">
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
  name: "newHouse",
  mounted: function() {
    this.$eventHub.$on("show-new-house-modal", house => {
      // console.log(house);
      if (house != null) {
        this.house = house;
      } else {
      }
      this.isVissible = true;
    });
  },
  data() {
    return {
      isVissible: false,
      house: {
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
        .dispatch("houses/newHouse", lot)
        .then(response => {
          console.log(response)
          _.isVissible = false;
          swal({
            title: "Casa añadida",
            text: `${response.cluster.name} #${
              response.lotnumber
            } agregada con éxito`,
            icon: "success",
            buttons: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err)
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
      this.house = {
        cluster: {},
        status: {}
      };
      this.isVissible = false;
    }
  },
  computed: {
    ...mapGetters({
      status: "others/status",
      clusters: "others/clusters"
    }),
    computedHouse() {
      if (this.house == {}) {
        return {
          id: "",
          division: "",
          cluster: {},
          status: {},
          block: "",
          lotnumber: "",
          type: "",
          terrainm2: "",
          constructionm2: "",
          officialnumber: "",
          totalprice: "",
          pricem2: "",
          createdAt: "",
          updatedAt: ""
        };
      } else {
        return this.house;
      }
    },
    modalClass() {
      return `modal ${this.isVissible ? "is-active" : ""}`;
    }
  }
};
</script>

