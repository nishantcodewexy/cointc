"use strict";
const {
  permissions:{
    isUser
  },
} = require("../../../helpers")


module.exports = (server) => {
  const {
    controllers: {
      order: { list },
    },
    consts: { roles: _roles }
  } = server.app;

  return {
    method: "GET",
    path: "/order",
    config: {
      pre: [
        {
          method:isUser,
          assign: "user",
        },
      ],
      handler: list,
      auth: "jwt",
    },
    
  };
};
