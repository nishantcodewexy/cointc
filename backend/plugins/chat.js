"use strict";

const helper = require("../helpers").jwt;

function chat(server, options, next) {
  var io = require("socket.io")(server.listener, { log: false });

  const { Chat, Message, User } = server.app.db;

  function init() {
    io.sockets.on("connection", function (socket) {
      
      
      const { token } = socket.handshake.auth;
      const { payload } = helper.decodeAndVerify(token);
      
      let userId;

      if (payload) {
        userId = payload.user;
        socket.on("chat::start", function (receiverId,callback) {
          const room = Chat.makeHash(userId, receiverId);
          socket.join(room);
           Chat.findOne({ 
              where: { 
               inboxHash:room
              },
              include:{
                model:Message,
                limit:20,
                offset:0,
                attributes: [
                  "id",
                  "sender_id",
                  "text",
                  "read",
                  "createdAt",
                  "updatedAt"
                ]
              }
            })
           .then((chat)=>{
             callback(chat?.messages||[])
           })
           .catch(console.error)
          console.log("socket with id ",socket.id," join room ",room,"room")
        });

        socket.on("chat::end", function (receiverId) {
          const room = Chat.makeHash(userId, receiverId);
          console.log("scoket with id ",socket.id," left room ",room)
          socket.leave(room);
        });

        socket.on(
          "chat::message",
          async function ({message, receiverId }, cb) {
            // create message
            
            console.log("new message",message)
            
            
            await createChatMsg(Chat,userId, receiverId, message);
            
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

async function createChatMsg(Chat,id, receiverId, message) {
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
