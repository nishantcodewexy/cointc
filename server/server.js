"use strict";
const Hapi = require("@hapi/hapi");
const glob = require("glob");
const path = require("path");
const helpers = require("./helpers");
const database = require("./database/models");
const consts = require("./consts");
const Boom = require("@hapi/boom");
const cwd = path.join(__dirname);
const Qs = require("qs");
const Inert = require("@hapi/inert");

const { hostname, port, jwt, server_url } = helpers.config;

// create an hapi server instance
const HapiServer = Hapi.server({
  host: hostname,
  port,
  routes: {
    cors: true,
    files: {
      relativeTo: path.join(__dirname, "views"),
      // relativeTo: path.join(__dirname, '..', 'client', 'build'),
    },
  },
  query: {
    parser: (query) => Qs.parse(query),
  },
  router: {
    stripTrailingSlash: true,
  },
});
/**************************************
 *  register plugins
 * *************************************/
(async () => {
  await HapiServer.register([
    {
      plugin: require("@hapi/jwt"),
      options: {
        name: "jwt",
      },
    },

    /**************************************
     * Static file handler
     **************************************/
    {
      plugin: Inert,
    },

    {
      plugin: require("./plugins/chat"),
    },
    /**************************************
     * Register all API routes
     **************************************/
    {
      plugin: require("./plugins/api.plugin"),
      routes: {
        prefix: "/api",
      },
    },
    {
      plugin: require("./plugins/app.plugin"),
    },
  ]);
})();

/**************************************
 * Server security
 **************************************/
// server.state('data', {
//   ttl: null,
//   isSecure: true,
//   isHttpOnly: true
// });

/**************************************
 *  Set auth strategy
 **************************************/
HapiServer.auth.strategy("jwt", "jwt", jwt);

/**************************************
 *  Hapi server app options
 **************************************/
HapiServer.app["config"] = helpers.config;
HapiServer.app["db"] = database;
HapiServer.app["consts"] = consts;
HapiServer.app["helpers"] = helpers;
HapiServer.app["boom"] = Boom;
HapiServer.app["controllers"] = {};

/**************************************
 * dynamically register controllers
 **************************************/
let controllers = glob.sync("/controllers/*.js", {
  root: cwd,
});
controllers.forEach((file) => {
  let routeBase = path.basename(file, ".js");
  // console.log("controller base name",routeBase)
  let filePath = require(file);
  
  HapiServer.app["controllers"][routeBase] = filePath(HapiServer);
});

/************************************************ */
exports.init = async () => {
  await HapiServer.initialize().then(() => {
    console.log(`Server has been initialized`);
  });
  return HapiServer;
};

exports.start = async function() {
  await HapiServer.start().then(() => {
    
    console.log(`Server is running on ${server_url}`);
  });
  return HapiServer;
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});
