"use strict";

const { jwt } = require("../helpers");
const { Op } = require("sequelize");

function chat(server, options, next) {
  var io = require("socket.io")(server.listener, { log: true });

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
        socket.on("chat::start", async function(receiverId,cb) {
          await joinOrCreateRoom(userId, receiverId, { socket, ChatModel: Chat });
          await loadMessages(userId,receiverId,{ChatModel:Chat,Message},cb)
          // await loadInbox(
          //   userId,
          //   {
          //     socket,
          //     io,
          //     ChatModel: Chat,
          //   },
          //   cb
          // );
          
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
    read:false
  });
}

async function loadInbox(userId, { socket, io, ChatModel }, cb) {
  const inboxes = await ChatModel.findAll({
    where: {
      inboxHash: {
        [Op.like]: `%${userId.replace(/-/g, "")}%`,
      },
    },
    // includes:{
    //   model:Message,
    //   limit:20,
    //   offset:0
    // },
    raw: true,
  });
  // console.log({ inboxes });
  inboxes.forEach(({ inboxHash }) => {
    socket.join(inboxHash);
  });

  if (cb) return cb(inboxes);
  return inboxes;
}


async function loadMessages(userId,receiverId, { ChatModel,Message }, cb) {
  const room = ChatModel.makeHash(userId, receiverId);
  const messages = await Message.findAll({
    include:[{
      model:ChatModel,
      where:{
        inboxHash: {
          [Op.eq]: room,
        },
      }
    }],
    limit:20,
    offset:0,
    raw: true,
  });
  
  
  if (cb&&messages) return cb(messages||[]);
  return messages;
}



const chatPlugin = {
  name: "chat",
  version: "1.0.0",
  register: chat,
};

module.exports = chatPlugin;
