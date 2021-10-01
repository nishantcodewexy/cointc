"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { profile },
    },
    helpers: { jwt: {decodeUser} },
  } = server.app;

  return {
    method: ["GET"],
    path: "/user/profile",
    config: {
      pre: [
        {
          method: decodeUser,
          assign: "user",
        },
        {
          method: ()=>"standard",
          assign: 'role'
        }
      ],
      handler: profile,
      auth: "jwt",
    },
  };
};
