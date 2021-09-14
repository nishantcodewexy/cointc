"use strict";

const api = require("./api");

module.exports.load = async (server) => {
  return await api.register(server);
};

 // Look through the routes in
  // all the subdirectories of API
  // and create a new route for each
// glob.sync('api/**/routes/*.js', {
//   root: __dirname
// }).forEach(file => {
//   const route = require(path.join(__dirname, file));
//   server.route(route);
// });