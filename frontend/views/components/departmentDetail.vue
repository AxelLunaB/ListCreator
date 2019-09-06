<template>
  <div>
    <div :class="modalClass">
      <div v-on:click="closeBtn()" class="modal-background"></div>
       <div class="modal-content">
        <div class="loading" id="loading-animation">
          <div class="loading-icon">
            <div class="lds-css ng-scope" style="width: 200px; height: 200px;">
              <div class="lds-blocks" style="width:100%;height:100%">
                <div style="left:38px;top:38px;animation-delay:0s">
                </div>
                <div style="left:80px;top:38px;animation-delay:0.125s">
                </div>
                <div style="left:122px;top:38px;animation-delay:0.25s">
                </div>
                <div style="left:38px;top:80px;animation-delay:0.875s">
                </div>
                <div style="left:122px;top:80px;animation-delay:0.375s">
                </div>
                <div style="left:38px;top:122px;animation-delay:0.75s">
                </div>
                <div style="left:80px;top:122px;animation-delay:0.625s">
                </div>
                <div style="left:122px;top:122px;animation-delay:0.5s">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <header class="modal-card-head">
            <p class="modal-card-title"><!--{{department.cluster.name}} · -->Departamento #{{department.deptnumber}} <small>{{department.model}}</small></p>
            <button v-on:click="closeBtn()" class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <form id="department-edit-form">
              <div class="columns is-mobile is-multiline">
              <!-- FIRST ROW -->
                <div class="column is-half-mobile">
                  <strong>Nivel:</strong>
                </div>
                <div class="column has-text-left is-half-mobile">
                  {{department.level}}
                </div>
                <div class="column is-half-mobile">
                  <strong>Estado:</strong>
                </div>
                <div class="column has-text-left is-half-mobile">
                  <div v-if="!isEdditing">
                    {{department.status.name}}
                  </div>
                  <div v-if="isEdditing">
                    <div class="select">
                      <select name="statusId" class="custom-select">
                        <option v-for="(s,i) in status" :key="i" :value="s.id" :selected="s.id === department.status.id">{{s.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns is-mobile is-multiline">
                <!-- HEADERS -->
                <div class="column is-half-mobile">
                  <strong>Terraza M<sup>2</sup>:</strong>
                </div>
                <div class="column has-text-left is-half-mobile">
                  <div v-if="!isEdditing">
                    {{department.terracem2}}
                  </div>
                  <div v-if="isEdditing">
                      <input class="input" type="text" name="terracem2" :value="department.terracem2">
                  </div>
                </div>
                <!-- -->
                <div class="column is-half-mobile">
                  <strong>Tipo:</strong>
                </div>
                <div class="column has-text-left is-half-mobile">
                  <div v-if="!isEdditing">
                  {{department.type}}
                  </div>
                  <div v-if="isEdditing">
                      <div class="select">
                        <select name="type" class="custom-select" :value="department.type">
                          <option>GARDEN</option>
                          <option>A</option>
                          <option>B</option>
                          <option>C</option>
                          <option>C+</option>
                          <option>PH5</option>
                          <option>PH6</option>
                          <option>PH7</option>
                          <option>PH8</option>
                        </select>
                      </div>
                  </div>
                </div>
                <!-- -->
                </div>
                <div class="columns is-mobile is-multiline">
                  <div class="column is-half-mobile">
                    <strong>Construcción M<sup>2</sup>:</strong>
                  </div>
                  <div class="column is-half-mobile">
                    <div v-if="!isEdditing">
                    {{department.constructionm2}}
                    </div>
                    <div v-if="isEdditing">
                      <input class="input" type="text" name="constructionm2" :value="department.constructionm2">
                    </div>
                  </div>
                  <div class="column is-half-mobile">
                    <strong>Subtipo:</strong>
                  </div>
                  <div class="column is-half-mobile">
                    <div v-if="!isEdditing">
                    {{department.subtype}}
                    </div>
                    <div v-if="isEdditing">
                      <div class="select">
                        <select name="subtype" class="custom-select" :value="department.subtype">
                          <option>green</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns is-mobile is-multiline">
                  <div class="column is-half-mobile">
                    <strong>Superficie M<sup>2</sup>:</strong>
                  </div>
                  <div class="column is-half-mobile">
                    <div v-if="!isEdditing">
                      {{department.superficiem2}}
                    </div>
                    <div v-if="isEdditing">
                      <input class="input" type="text" name="superficiem2" :value="department.superficiem2">
                    </div>
                  </div>
                  <div class="column is-half-mobile">
                      <strong>Vista:</strong>
                  </div>
                  <div class="column is-half-mobile">
                    <div v-if="!isEdditing">
                      {{department.view}}
                    </div>
                    <div v-if="isEdditing">
                      <div class="select">
                        <select class="custom-select" name="view" :value="department.view">
                          <option>normal</option>
                        </select>
                      </div>
                      <!-- <input class="input" type="text" name="view" :value="department.view"> -->
                    </div>
                  </div>
                </div>
                <div class="columns is-mobile is-multiline">
                  <div class="column is-half-mobile">
                    <strong>Cajones:</strong>
                  </div>
                  <div class="column is-half-mobile">
                    <div v-if="!isEdditing">
                      {{department.cajones}}
                    </div>
                    <div v-if="isEdditing">
                      <div class="select" style="width:100%">
                        <select name="cajones" style="width:100%" :value="department.cajones">
                          <option>1</option>
                          <option>2</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="column is-half-mobile">
                  </div>
                  <div class="column is-half-mobile">
                    <div style="width:11em"></div>
                  </div>
                </div>
                <div class="columns is-mobile is-multiline">
                 <div class="column is-half-mobile">
                  <strong>Precio total:</strong>
                </div>
                <div class="column is-half-mobile">
                  <div v-if="!isEdditing">
                    {{department.totalprice}}
                  </div>
                  <div v-if="isEdditing">
                    <input class="input" type="text" name="totalprice" :value="department.totalprice">
                  </div>
                </div>
              </div>
            </form>
          </section>
          <div class="modal-card-foot">
            <div v-if="isEdditing" class="buttons is-centered max-width">
              <button v-on:click="saveChanges(true), disableBtn()" class="button">Guardar y cerrar</button>
              <button v-on:click="saveChanges(false), disableBtn()" class="button">Guardar</button>
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
import swal from "sweetalert";
import { mapGetters } from "vuex";
import { log } from 'util';

export default {
  props: [],
  mounted: function() {
    this.$eventHub.$on("show-department-detail-modal", department => {
      this.department = department;
      this.show = true;
    });
  },
  data() {
    return {
      isEdditing: false,
      show: false,
      department: {
        status: {},
        cluster: {}
      },
      //TODO: REPLACE THIS TO A GLOBAL STATE IN OTHERS MODULE
      stats: ["VENDIDO", "APARTADO", "REFERENCIADO", "BLOQUEADO", "DISPONIBLE"]
    };
  },
  methods: {
    closeBtn() {
      this.show = this.isEdditing = false;
    },
    edit(b) {
      this.isEdditing = b;
    },
    disableBtn() {
      document.body.style.cursor = "wait";
      document.getElementById("loading-animation").style.display="flex";
    },
    saveChanges(close) {
      const formData = $("#department-edit-form").serializeArray();
      //: use notifications (see todo.todo for reference) when closing the
      const _ = this;
      var data = {};
      formData.map(function(v) {
        data[v.name] = v.value;
      });

      data.id = _.department.id;
      this.$store
        .dispatch("departments/updateDepartment", data)
        .then(response => {
          swal({
            title: "Departamento actualizado.",
            text: `${response.cluster.name} #${
              response.deptnumber
            } modificado con éxito`,
            icon: "success",
            buttons: false,
            timer: 1500
          });
            document.body.style.cursor = "default";
            document.getElementById("loading-animation").style.display = "none";

          if (close) {
            _.closeBtn();
          } else {
            _.isEdditing = false;
          }
        })
        .catch(err => {
          var text = `Error inesperado, vuelve a intentarlo mas tarde.`;
          var title = "¡Error!";
          var timer = 1750;
          if (err.code == 403) {
            // forbidden can be launch because of lack of permissions.
            title = "Permisos denegados";
            text =
              "No tienes permisos para realizar esta acción. Comunícate con tu supervisor ";
            timer = 2500;
            document.body.style.cursor = "default";
            document.getElementById("loading-animation").style.display = "none";
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

<style>

  .loading {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 61;
    background: rgba(0, 0, 0, 0.50);
  }

  .loading-icon {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }

  @keyframes lds-blocks {
  0% {
    background: #e3d2ba;
  }
  12.5% {
    background: #e3d2ba;
  }
  12.625% {
    background: #ab9677;
  }
  100% {
    background: #ab9677;
  }
}
@-webkit-keyframes lds-blocks {
  0% {
    background: #e3d2ba;
  }
  12.5% {
    background: #e3d2ba;
  }
  12.625% {
    background: #ab9677;
  }
  100% {
    background: #ab9677;
  }
}
.lds-blocks {
  position: relative;
}
.lds-blocks div {
  position: absolute;
  width: 40px;
  height: 40px;
  -webkit-animation: lds-blocks 1s linear infinite;
  animation: lds-blocks 1s linear infinite;
  background: #23aec7;
}
.lds-blocks {
  width: 200px !important;
  height: 200px !important;
  -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
}

</style>
