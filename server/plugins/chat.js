"use strict";

const { jwt } = require("../helpers");
const { Op } = require("sequelize");

function chat(server, options, next) {
  var io = require("socket.io")(server.listener, { log: false });

  const { Chat, Message, User } = server.app.db;

  function init() {
    io.sockets.on("connection", async function(socket) {
      const { authorization } = socket.handshake.headers;
      const { payload } = jwt.decodeAndVerify(authorization);
      let userId;

      if (payload?.user) {
        userId = payload.user;

        await loadInbox(userId, { socket, io, ChatModel: Chat }, (inboxes) =>
          io.to(socket.id).emit("chat::fetch", inboxes)
        );

        // get all inboxes
        socket.on("chat::fetch", async function(cb) {
          const inboxes = await loadInbox(
            userId,
            {
              socket,
              io,
              ChatModel: Chat,
            },
            cb
          );

          if (!cb) return io.to(socket.id).emit("chat::fetch", inboxes);
        });

        // initiate new chat or continue existing chat with a particular user
        socket.on("chat::start", async function(receiverId) {
          joinOrCreateRoom(userId, receiverId, { socket, ChatModel: Chat });
        });

        // send message to a specific user
        socket.on("chat::message", async function({ message, receiverId }, cb) {
          // create message
          const room = Chat.makeHash(userId, receiverId);
          let chatInbox = await Chat.findOne({
            where: {
              inboxHash: room,
            },
          });

          const chatDBMessage = await createChatMsg(
            userId,
            receiverId,
            message,
            chatInbox
          );
          // const room = Chat.makeHash(userId, receiverId);
          io.to(room).emit("chat::message", chatDBMessage);
          // cb(chatDBMessage);

          // fetch message

          if (cb) cb(chatDBMessage);
        });
      }
    });
  }

  init();
}

async function joinOrCreateRoom(userId, receiverId, { socket, io, ChatModel }) {
  const room = ChatModel.makeHash(userId, receiverId);
  let chatInbox;

  chatInbox = await ChatModel.findOne({
    where: {
      inboxHash: room,
    },
  });

  if (!chatInbox) {
    chatInbox = await ChatModel.create({ to: receiverId, from: userId });
  }

  socket.join(room);
  return room;
}

async function createChatMsg(id, receiverId, message, inbox) {
  // console.log({ inbox });
  if (!inbox) return null;

  return await inbox.createMessage({
    sender_id: id,
    text: message,
  });
}

async function loadInbox(userId, { socket, io, ChatModel }, cb) {
  const inboxes = await ChatModel.findAll({
    where: {
      inboxHash: {
        [Op.like]: `%${userId.replace(/-/g, "")}%`,
      },
    },
    raw: true,
  });
  // console.log({ inboxes });
  inboxes.forEach(({ inboxHash }) => {
    socket.join(inboxHash);
  });

  if (cb) return cb(inboxes);
  return inboxes;
}

const chatPlugin = {
  name: "chat",
  version: "1.0.0",
  register: chat,
};

module.exports = chatPlugin;
