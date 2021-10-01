"use strict";

const { jwt } = require("../helpers");

function chat(server, options, next) {
  var io = require("socket.io")(server.listener, { log: false });

  const { Chat, Message, User } = server.app.db;

  function init() {
    io.sockets.on("connection", function (socket) {
      const { authorization } = socket.handshake.headers;
      const { payload } = jwt.decodeAndVerify(authorization);
      let userId;

      if (payload?.user) {
        userId = payload.user;
        socket.on("chat::start", async function (receiverId) {
          const room = Chat.makeHash(userId, receiverId);
          let chatInbox;

          chatInbox = await Chat.findOne({
            where: {
              inboxHash: room,
            },
          });

          if (!chatInbox) {
            chatInbox = await Chat.create({ to: receiverId, from: userId });
          }

          socket.join(room);
        });

        socket.on(
          "chat::message",
          async function ({ to, from, message, receiverId }, cb) {
            // create message
            const room = Chat.makeHash(userId, receiverId);
            let chatInbox = await Chat.findOne({
              where: {
                inboxHash: room,
              },
            });

            console.log({ room, chatInbox });

            await createChatMsg(userId, receiverId, message, chatInbox);
            // const room = Chat.makeHash(userId, receiverId);
            socket.to(room).emit("chat::message", message);

            // fetch message
          }
        );
      }
    });
  }

  async function createChatMsg(id, receiverId, message, inbox) {
    console.log({ inbox });
    if (inbox)
      await inbox.createMessage({
        sender_id: id,
        text: message,
      });

    return null;
  }

  init();
}

const chatPlugin = {
  name: "chat",
  version: "1.0.0",
  register: chat,
};

module.exports = chatPlugin;
