import io from "socket.io-client";

var socket = io();

socket.on('connect', function () {
  console.log('connected.');

});
export default socket;
