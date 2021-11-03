"use strict";

module.exports = (server) => {
  const {
    controllers: {
      upload: { findAll },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/upload",
    config: {
      pre: [
    
        {
          method:isUser,
          assign: "user",
        },
        
      ],
      handler: findAll,
      auth: "jwt",
    },
    
  };
};
