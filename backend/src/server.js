"use strict";

const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const database = require("./database/models");
const server = {};

server.setup = async (config) => {
  const {hostname,host_url, port, jwt } = config;

  // initialize database
  database.sequelize.sync();

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

  // register routes
  await routes.load(HapiServer);

  // Set global server options
  HapiServer.app.config = config;
  HapiServer.app.database = database;
  HapiServer.auth.strategy("jwt_token", "jwt", jwt);

  HapiServer.auth.default("jwt_token");

  return HapiServer;
};

module.exports = server;
