<template>
  <div id="contracts" class="animate">
    <div class="main-contracts">
      <h2>Create new contract</h2>
      <div class="row">
        <p class="col-12 select-unit">
          <b-dropdown
          id="dropdown-unit"
          name="drop-unit"
          :text="selectedUnit == null ? 'Select Unit' : selectedUnit">
          <div style="overflow-y:scroll;height:200px;">
            <b-dropdown-item v-for="(dep,index) in departments" :key="dep.id" @click="selectUnit(dep.unitNumber, dep.id)">
            {{dep.unitNumber}}
            </b-dropdown-item>
          </div>
          </b-dropdown>
        </p>
      </div>
      <div v-if="selectedUnit">
        <form style="width:80%;margin:0 auto">
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="Unit">Unit number</label>
              <input type="text" class="form-control add-contract" id="unitNo" :placeholder="dep.unitNumber != null ? dep.unitNumber : '-'" disabled>
            </div>
            <div class="form-group col-md-4">
              <label for="Client">Client</label>
              <input type="text" class="form-control add-contract" id="Client" :placeholder="contr.customer.name != null ? contr.customer.name : '-' " disabled>
            </div>
            <div class="form-group col-md-4">
              <label for="totalPrice">Client address</label>
              <input type="text" class="form-control add-contract" id="address" :placeholder="contr.customer.address != null ? contr.customer.address : '-'"  disabled>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="Unit">Client email</label>
              <input type="text" class="form-control add-contract" id="email" :placeholder="contr.customer.email != null ? contr.customer.email : '-'" disabled>
            </div>
            <div class="form-group col-md-4">
              <!-- <label for="Client">--</label>
              <input type="text" class="form-control add-contract" id="Client" :placeholder="contr.customer.name != null ? contr.customer.name : '-' " disabled> -->
            </div>
            <div class="form-group col-md-4">
              <!-- <label for="totalPrice">--</label>
              <input type="text" class="form-control add-contract" id="address" :placeholder="contr.customer.address != null ? contr.customer.address : '-'"  disabled> -->
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="Price">Full price</label>
              <input type="text" class="form-control add-contract" id="unitPrice" :placeholder="dep.priceTotal != null ? toPrice(dep.priceTotal)+ ' USD' : '-' " disabled>
            </div>
            <div class="form-group col-md-4">
              <label for="Unit">Payment method</label>
              <input type="text" class="form-control add-contract" id="paymentMethod" :placeholder="contr.paymentMethod != null ? contr.paymentMethod : '-'" disabled>
            </div>

            <div class="form-group col-md-4">
              <label for="totalPrice">--</label>
              <input type="text" class="form-control add-contract" id="address" :placeholder="contr.customer.address != null ? contr.customer.address : '-'"  disabled>
            </div>
          </div>
        </form>
      </div>
              {{ dep }}
        <br/>
        --
        <br/>
        {{ contr }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { uptime } from 'os';

export default {
  mounted: function() {
    this.$store.dispatch("departments/getDepartmentById", this.$attrs.tower);

        // logic
    var isAuthenticated = this.$store.state.others.isAuthenticated;
    if (isAuthenticated) {
      // Dispatch actions &&  subscribe to rt events.
      console.log("auth");
      this.$store.dispatch("contracts/getContracts");

      // listen to authenticated event
    } else {
      console.log("no auth");
      let _ = this;
      this.$eventHub.$on("authenticated", function() {
        // _.$store.dispatch("departments/getDepartmentById", _.tower);
        _.$store.dispatch("contracts/getContracts");

      });
    }


  },
  data() {
    return {
      clustersName:[
        {cluster:'BRAVA TOWER', clusterId:1},
        {cluster:'GIADA TOWERS A', clusterId:2},
        {cluster:'GIADA TOWERS B', clusterId:3}
      ],
      selectedUnit:null,
      selectedId:null,
      dep:[],
      contr:[]
    }
  },
  methods:{
    selectUnit(u,i){
      this.selectedUnit = u
      this.selectedId = i
      for( let x = 0 ; x < this.departments.length ; x++) {
        if(this.departments[x].id == this.selectedId){
          this.dep = this.departments[x]
        }
      }

      for( let a = 0 ; a < this.contracts.length ; a++) {
        if(this.selectedId == this.contracts[a].unitId){
          this.contr = this.contracts[a]
        }
      }
    },
    toPrice(x) {
      var r = x.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      return r;
    },
    numbersToLetters(x){
          function numeroALetras(num, currency) {
            function Unidades(num) {
              switch (num) {
                case 1:
                  return "UN";
                case 2:
                  return "DOS";
                case 3:
                  return "TRES";
                case 4:
                  return "CUATRO";
                case 5:
                  return "CINCO";
                case 6:
                  return "SEIS";
                case 7:
                  return "SIETE";
                case 8:
                  return "OCHO";
                case 9:
                  return "NUEVE";
              }
              return "";
            }

            function Decenas(num) {
              let decena = Math.floor(num / 10);
              let unidad = num - decena * 10;

              switch (decena) {
                case 1:
                  switch (unidad) {
                    case 0:
                      return "DIEZ";
                    case 1:
                      return "ONCE";
                    case 2:
                      return "DOCE";
                    case 3:
                      return "TRECE";
                    case 4:
                      return "CATORCE";
                    case 5:
                      return "QUINCE";
                    default:
                      return "DIECI" + Unidades(unidad);
                  }
                  case 2:
                    switch (unidad) {
                      case 0:
                        return "VEINTE";
                      default:
                        return "VEINTI" + Unidades(unidad);
                    }
                    case 3:
                      return DecenasY("TREINTA", unidad);
                    case 4:
                      return DecenasY("CUARENTA", unidad);
                    case 5:
                      return DecenasY("CINCUENTA", unidad);
                    case 6:
                      return DecenasY("SESENTA", unidad);
                    case 7:
                      return DecenasY("SETENTA", unidad);
                    case 8:
                      return DecenasY("OCHENTA", unidad);
                    case 9:
                      return DecenasY("NOVENTA", unidad);
                    case 0:
                      return Unidades(unidad);
              }
            }

            let DecenasY = (strSin, numUnidades) =>
              numUnidades > 0 ? strSin + " Y " + Unidades(numUnidades) : strSin;

            function Centenas(num) {
              let centenas = Math.floor(num / 100);
              let decenas = num - centenas * 100;

              switch (centenas) {
                case 1:
                  return decenas > 0 ? "CIENTO " + Decenas(decenas) : "CIEN";
                case 2:
                  return "DOSCIENTOS " + Decenas(decenas);
                case 3:
                  return "TRESCIENTOS " + Decenas(decenas);
                case 4:
                  return "CUATROCIENTOS " + Decenas(decenas);
                case 5:
                  return "QUINIENTOS " + Decenas(decenas);
                case 6:
                  return "SEISCIENTOS " + Decenas(decenas);
                case 7:
                  return "SETECIENTOS " + Decenas(decenas);
                case 8:
                  return "OCHOCIENTOS " + Decenas(decenas);
                case 9:
                  return "NOVECIENTOS " + Decenas(decenas);
              }
              return Decenas(decenas);
            }

            function Seccion(num, divisor, strSingular, strPlural) {
              let cientos = Math.floor(num / divisor);
              let resto = num - cientos * divisor;

              let letras = "";

              if (cientos > 0)
                letras = cientos > 1 ? Centenas(cientos) + " " + strPlural : strSingular;

              if (resto > 0) letras += "";

              return letras;
            }

            function Miles(num) {
              let divisor = 1000;
              let cientos = Math.floor(num / divisor);
              let resto = num - cientos * divisor;

              let strMiles = Seccion(num, divisor, "MIL", "MIL");
              let strCentenas = Centenas(resto);

              if (strMiles == "") return strCentenas;

              return strMiles + " " + strCentenas;
            }

            function Millones(num) {
              let divisor = 1000000;
              let cientos = Math.floor(num / divisor);
              let resto = num - cientos * divisor;

              let strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
              let strMiles = Miles(resto);

              if (strMillones == "") return strMiles;

              return strMillones + " " + strMiles;
            }
            let data = {
              numero: num,
              enteros: Math.floor(num),
              centavos: Math.round(num * 100) - Math.floor(num) * 100,
              letrasCentavos: "",
              letrasMonedaPlural: "DÓLARES",
              letrasMonedaSingular: "DÓLAR"
            };

            data.letrasCentavos = " Y " + String(data.centavos).padEnd(2, "0") + "/100 " + data.letrasMonedaPlural

            if (data.enteros == 0) return "CERO" + data.letrasCentavos;
            if (data.enteros == 1) return "UNO" + data.letrasCentavos;
            else return Millones(data.enteros).trim() + data.letrasCentavos
          }

          return numeroALetras(x);

              }
  },
  computed:{
      ...mapGetters({
        departments: "departments/departments",
        contracts: "contracts/contracts"
      }),
      getComm(){
        let commercial = []
        for( let i = 0 ; i < this.departments.length ; i++){
          if(this.departments[i].unitType == 'Commercial') {
            commercial.push(this.departments[i])
          }
        }
        return commercial.length
      },
      getDeps(){
        let deps = []
        for( let i = 0 ; i < this.departments.length ; i++){
          if(this.departments[i].unitType != 'Commercial') {
            deps.push(this.departments[i])
          }
        }
        return deps.length
      }
  }
}
</script>

<style lang="scss" scoped>

  @import 'node_modules/bootstrap/scss/bootstrap';
  @import 'node_modules/bootstrap-vue/src/index.scss';

   .animate {
    animation: fadeInAnimation 1s forwards;
  }

    @keyframes fadeInAnimation {
      0%   {
        opacity: 0;
         }

      100% {
        opacity: 1;
        }
    }

  html,
  body {
    width:100%;
    background: #2a333c;
    height:auto;
  }

  input.add-contract:disabled {
    background: #2a333c;
    border: 1px solid #ffffff4b;
    color: #697179;
  }

  .form-group label {
    color:white;
  }

  .main-contracts {
    background: #3c4857;
    padding: 20px;
    border-radius: 10px;
    width:80vw;
    max-width: 1000px;
    margin:100px auto 0 auto;
  }

  h2 {
    color:white;
    text-align: center;
  }

  button {
    background: #252d33;
  }

.btn-secondary {
    color: #fff;
    background-color: #252d33;
    border-color: #252d33;
  }

.dropdown ul {
    position: absolute;
    top: 36px;
    border: 1px solid #ccc;
    border-radius: 3px;
    left: 0;
    list-style: none;
    padding: 4px 0;
    display: none;
    color: #fff;
    background: #252d33;
    border: 1px solid #252d33;
    z-index: 1;
}

.dropdown-item {
  color:white;
  border-bottom: 1px solid #4a5869;
  text-align: center;
}

.dropdown-menu div li  {
  padding:7px;
}


.dropdown-item:focus, .dropdown-item:hover {
    text-decoration: none;
    background-color: #323d46;
    color:white;
}

.table tr th {
  text-align:center;
}

.select-unit {
  display: flex;
  align-items: center;
  justify-content: center;
  margin:60px 0 60px 0;
}

</style>
