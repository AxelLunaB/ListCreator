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
          <div style="overflow-y:auto;height:200px;">
            <b-dropdown-item v-for="(dep,index) in departments" :index="index" :key="dep.id" @click="selectUnit(dep.id, dep.unitNumber)">
              {{dep.unitNumber}}
            </b-dropdown-item>
          </div>
          </b-dropdown>
        </p>
      </div>
      <div v-if="contr != 0" class="row" style="display:flex;justify-content:center;">
        <div class="col-12 select-contract" style="margin-top:0;">
          <b-dropdown
          id="dropdown-contract"
          name="drop-contract"
          :text="selectedContract == 0 ? 'Select contract ID' : selectedContract.id + ' (' + selectedContract.customer.name + ')'">
          <div style="overflow-y:auto;">
            <b-dropdown-item v-for="(con,index) in contr" :key="index" @click="selectCont(con.unitId,con)">
            {{con.id + ' (' + con.customer.name + ')'}}
            </b-dropdown-item>
          </div>
          </b-dropdown>
        </div>
        <div v-if="selectedContract != 0">
        <form style="width:80%;margin:0 auto">
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="Unit">Unit number</label>
              <input type="text" class="form-control add-contract" id="unitNo" :placeholder="selectedUnit != null ? selectedUnit : '-'" disabled>
            </div>
            <div class="form-group col-md-4">
              <label for="Client">Client</label>
              <input type="text" class="form-control add-contract" id="Client" :placeholder="selectedContract != undefined ? selectedContract.customer.name != null ? selectedContract.customer.name : '-' :'-'" disabled>
            </div>
            <div class="form-group col-md-4">
              <label for="totalPrice">Client address</label>
              <input type="text" class="form-control add-contract" id="address" :placeholder="selectedContract != undefined ? selectedContract.customer.address != null ? selectedContract.customer.address : '-' : '-'"  disabled>
            </div>
          </div>

           <div class="form-row">
            <div class="form-group col-md-4">
              <label for="Unit">Client email</label>
              <input type="text" class="form-control add-contract" id="email" :placeholder="selectedContract != undefined ? selectedContract.customer.email != null ? selectedContract.customer.email : '-' : '-'" disabled>
            </div>
            <div class="form-group col-md-4">
              <label for="Client">ID</label>
              <input type="text" class="form-control add-contract" id="clientId" :placeholder="'-'" disabled>
            </div>
            <div class="form-group col-md-4">
              <label for="totalPrice">Furniture price</label>
              <input type="text" class="form-control add-contract" id="address" :placeholder="selectedContract != undefined ? selectedContract.furniture != null ? toPrice(selectedContract.furniture) + ' USD' : '-' : '-'"  disabled>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="Price">Initial price</label>
              <input type="text" class="form-control add-contract" id="unitPrice" :placeholder="dep.priceTotal != null ? toPrice(dep.priceTotal): '-' " disabled>
            </div>
            <div class="form-group col-md-4">
              <label for="totalPrice">Currency</label>
              <input type="text" class="form-control add-contract" id="currency" :placeholder="contr != undefined ? selectedContract.currency != null ? selectedContract.currency : '-' : '-'"  disabled>
            </div>
            <div class="form-group col-md-4">
              <label for="Unit">Payment method</label>
              <input type="text" class="form-control add-contract" id="paymentMethod" :placeholder="contr != undefined ? selectedContract.paymentMethod != null ? selectedContract.paymentMethod : '-' : '-'" disabled>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="Price">Comments</label>
              <textarea style="resize:none" type="text" rows="2" class="form-control add-contract" id="comments" :placeholder="selectedContract != undefined ? selectedContract.comment != null ? selectedContract.comment : 'No comments' : 'No comments' " disabled></textarea>
            </div>
          </div>
          </form>
        <div style="display: flex;align-items: center;justify-content: center;flex-direction:column;color:white;">
          Available contracts for {{ selectedContract.customer.name }}
            <button class="waves ripple default" title="Generate contract" @click="contract()">
              <div class="col-12" style="display: flex;align-items: center;justify-content: center;white-space: normal; padding-left:5px; padding-right:5px;">
              <span>Sales contract</span><i class="far fa-copy" style="margin-left:12px;"></i>
              </div>
            </button>
            </div>
        </div>
      </div>
      </div>
      <div v-if="showContract == true">
        <contracts-files :departmentContract="departmentContract" :dep="dep" :getComm="getComm" :getDeps="getDeps"></contracts-files>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import swal from "sweetalert";
import contractsFiles from './components/contractsFiles.vue'

export default {
  components:{
    contractsFiles
  },
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
      selectedContract:[],
      contr:[],
      dep:[],
      showContract:false
    }
  },
  methods:{
    contract(){
      const self = this
      self.showContract = true
      setTimeout(function(){
      self.showContract = false
      },1000)
      },
    selectCont(i,c){
      for(let x = 0 ; x < this.departments.length ; x++) {
        if(this.departments[x].id == i) {
          this.dep = this.departments[x]
        }
      }
      this.selectedContract = c
    },
    selectUnit(i,u){
      this.selectedContract=[]
      this.contr = []
      let id = i
      let NoContr = true
      for(let a = 0 ; a < this.contracts.length ; a++){
        //delete == 'PAID' for testing/ PAID for production
        if(this.contracts[a].unitId == i) {
          if(this.contracts[a].reference.status.name){
            this.contr.push(this.contracts[a])
          } else {
            swal({
              text: 'No contracts available for this unit',
              icon: 'info',
              timer:1500
            })
          }
          this.selectedUnit = u
          NoContr = false
        }
      }
      if(NoContr){
        swal({
          text: 'No contracts available for this unit',
          icon: 'info',
          timer:1500
        })
      }
    },
    toPrice(x) {
      var r = x.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      return r;
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
      },
      departmentContract(){
        var dc = {...this.selectedContract, ...this.dep }
        return dc
      }
  }
}
</script>

<style lang="scss">

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

  input.add-contract:disabled,
  textarea.add-contract:disabled {
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
  padding:7px 7px 0 7px;
}


.dropdown-item:focus, .dropdown-item:hover {
    text-decoration: none;
    background-color: #323d46;
    color:white;
}

.table tr th {
  text-align:center;
}

.select-unit,
.select-contract {
  display: flex;
  align-items: center;
  justify-content: center;
  margin:60px 0 60px 0;
}

button.waves {
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  padding: 8px 18px;
  margin: 10px 1px;
  font-size: 14px;
  text-transform: uppercase;
  background: transparent;
  color: rgba(0, 0, 0, 0.87);
  background: #17a2b8;
  color: white;
  letter-spacing: 2px;
  font-weight: normal;
  border:none;
}
button.waves.ripple {
  overflow: hidden;
  position: relative;
  transition: background-color 0.3s linear, border 0.3s linear;
}
button.waves.ripple:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #000000 10%, rgba(0, 0, 0, 0) 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10);
  opacity: 0;
  transition: transform .5s, opacity 1s;
}
button.waves.ripple:active:after {
  transform: scale(0);
  opacity: .2;
  transition: 0s;
}
button.waves.default {
  background-color: #17a2b8;
  color: white;
  outline:none;
  border-radius: 4px;
}
</style>
