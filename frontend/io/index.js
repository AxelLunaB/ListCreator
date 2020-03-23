import io from "socket.io-client";
var socket = io();
import $ from "jquery";
import store from '../store/index.js';

socket.on('connect', function () {
  console.log('connected.');

});

export default socket;
