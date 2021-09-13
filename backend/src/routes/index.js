"use strict";

const api = require("./api");

module.exports.load = async (server) => {
  await api.register(server);

  // server.route( {
  //   method: "GET",
  //   path: "/",
  //   handler: async ( request, h ) => {
  //     return "Welcome to the cryptcon API";
  //   },
  //   options: {
  //     auth: false
  //   }
  // } );
};
