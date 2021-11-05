"use strict";

const config = require("dotenv").config({
  path: "../.env",
});

const env = process.env.NODE_ENV || "development";

// if (env === "development") console.log({ parsedEnv: config.parsed });
if (config.error) {
  throw config.error;
}
const server = require("./server");
const database = require("./database/models");

module.exports = (async () => {
  /**************************************
   *  initialize database
   **************************************/
  await database.sequelize.authenticate();
  await database.sequelize.sync({
    alter: false,
    force: !false,
  });
  const { start } = await server;
  const app = await start();
  return app;
})();
