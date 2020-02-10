import io from "socket.io-client";
var socket = io();
import $ from "jquery";
import store from '../store/index.js';

socket.on('connect', function () {
  console.log('connected.');

});
/*
socket.on('api/contracts created', function(message) {
});
*/


export default socket;
