"use strict";

const Hapi = require("@hapi/hapi");
const database = require("./database/models");
const server = {};
const glob = require("glob");
const path = require("path");

server.setup = async (config) => {
  try {
    const { hostname, port, jwt } = config;

    // create an instance of hapi
    const HapiServer = Hapi.server({ host: hostname, port });

    // register plugins
    await HapiServer.register([
      // {
      //   plugin: require('./plugins/postgresql'), options: config
      // },
      {
        plugin: require("./plugins/mailer"),
        options: config.email,
      },
      {
        plugin: require("@hapi/jwt"),
      },
    ]);

    // initialize database
    await database.sequelize.authenticate();
    database.sequelize.sync();

    // Set global server options
    HapiServer.app.config = config;
    HapiServer.app.database = database;

    HapiServer.auth.strategy("jwt", "jwt", jwt);
    // HapiServer.auth.default("jwt");

    // dynamically register routes
    let routes = glob.sync("*/api/**/routes/*.js", {
      root: __dirname,
    });
    routes.forEach((file) => {
      HapiServer.route(require(path.join(__dirname, '..', file)));
    });

    return HapiServer;

  } catch (err) {
    console.error(err);
  }
};

module.exports = server;
