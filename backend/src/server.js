"use strict";

const Hapi = require("@hapi/hapi");
const database = require("./database/models");
const glob = require("glob");
const path = require("path");
const helpers = require("./helpers");
const consts = require("./consts");

const server = {};
server.setup = async (config) => {
  try {
    const { hostname, port, jwt } = config;

    // create an hapi server instance
    const HapiServer = Hapi.server({ host: hostname, port });

    /**************************************
     *  register plugins
     * *************************************/
    await HapiServer.register([
      {
        plugin: require("./plugins/mailer"),
        options: config.email,
      },
      {
        plugin: require("@hapi/jwt"),
      },
    ]);

    /**************************************
     *  initialize database
     **************************************/
    await database.sequelize.authenticate();
    database.sequelize.sync();

    // Set Hapi server app options
    HapiServer.app.config = config;
    HapiServer.app.db = database;
    HapiServer.app.consts = consts;
    HapiServer.app.helpers = helpers;
    HapiServer.app.controllers = {};

    /**************************************
     * dynamically register controllers
     **************************************/
    glob
      .sync("*/controllers/**/*.js", {
        root: __dirname,
      })
      .forEach((file) => {
        HapiServer.app.controllers[
          helpers.sluggify(path.basename(file, ".js"))
        ] = require(path.join(__dirname, "..", file))(HapiServer);
      });

    /**************************************
     * dynamically register routes
     **************************************/
    glob
      .sync("*/routes/**/*.js", {
        root: __dirname,
      })
      .forEach((file) => {
        HapiServer.route(require(path.join(__dirname, "..", file))(HapiServer));
      });

     /**************************************
      *  Set auth strategy
      **************************************/
    HapiServer.auth.strategy("jwt", "jwt", jwt);

    return HapiServer;
  } catch (err) {
    console.error(err);
  }
};

module.exports = server;
