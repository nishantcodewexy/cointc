"use strict";

module.exports = (server) => {
  const {
    controllers: {
      upload: { bulkRetrieve },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/upload/bulk",
    config: {
      pre: [
    
        {
          method:isUser,
          assign: "user",
        },
        
      ],
      handler: bulkRetrieve,
      auth: "jwt",
    },
    
  };
};
