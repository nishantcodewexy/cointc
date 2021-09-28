"use strict"
module.exports = (server) => {
  const {
    controllers: {
      user: { destroy },
    },
    helpers: {
      jwt: {decodeUser}
    }
  } = server.app;


  return {
    method: "POST",
    path: `/user/destroy`,
    config: {
      pre: [{
        method: decodeUser,
        assign: 'user'
      }],
      handler: destroy,
    auth: 'jwt'
    },
  };
}
