"use strict";

const message = require("../database/models/message");
const { decodeAndVerify } = require("../helpers").jwt;

function chat(server, options, next) {
  var io = require("socket.io")(server.listener, { log: false });

  const { Chat, Message, User } = server.app.db;

  function init() {
    io.sockets.on("connection", function (socket) {
      const { authorization } = socket.handshake.headers;
      const { payload } = decodeAndVerify(authorization);
      let userId;

      if (payload) {
        userId = payload.user;
        socket.on("chat::start", function (receiverId) {
          const room = Chat.makeHash(userId, receiverId);
          socket.join(room);
        });

        socket.on(
          "chat::message",
          async function ({ to, from, message, receiverId }, cb) {
            // create message
            await createChatMsg(authToken, receiverId, message);
            const room = Chat.makeHash(userId, receiverId);
            socket.to(room).emit("chat::message", message);

            // fetch message
          }
        );
      }
    });
  }

  init();
}

async function createChatMsg(id, receiverId, message) {
  // TODO: this section may run transaction
  const inbox = await Chat.findOrCreate({
    where: {
      inboxHash: Chat.makeHash([id, receiverId]),
    },
  });

  await inbox.createMessage({
    sender_id: id,
    text: message,
  });
}

function makeChatRoom(to, from) {
  return [to, from].sort().join();
}

const chatPlugin = {
  name: "chat",
  version: "1.0.0",
  register: chat,
};

module.exports = chatPlugin;
