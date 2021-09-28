"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { profileByID },
    }    
  } = server.app;

  return {
    method: ["POST"],
    path: "/user/find_id",
    config: {      
      handler: profileByID,    
    },
  };
};
