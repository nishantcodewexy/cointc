"use strict"
function chat(server, options, next) {
  var io = require("socket.io")(server.listener, { log: false });
  io.sockets.on("connection", function (socket) {
    socket.on("chat", function (message, cb) {
      const { to, from, msg } = message;
      //  ...
    });
  });
}

const chatPlugin = {
  name: "chat",
  version: "1.0.0",
  register: chat
};


module.exports = chatPlugin;
