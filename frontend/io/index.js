import io from "socket.io-client";
var socket = io();
import $ from "jquery";
import store from '../store/index.js';

socket.on('connect', function () {
  console.log('connected.');

});

socket.on('api/contracts created', function(message) {
  console.log("------------------------------------");
  console.log('Got a new contract!', message);
  store.dispatch("contracts/getContracts");
  console.log("-------------------------------------");
});

socket.on('api/references created', function(message) {
  console.log("------------------------------------");
  console.log('Got a new Reference!', message);
  store.dispatch("others/getReferences");
  console.log(store);
  console.log("-------------------------------------");
})

export default socket;
