"use strict";
const server = require("./server");
const database = require("./database/models");

const util = require("util");

module.exports = (async () => {
  /**************************************
   *  initialize database
   **************************************/
  await database.sequelize.authenticate();
  await database.sequelize.sync({
    alter: false,
    force: false,
  });
  const { start } = await server;
  const app = await start();
  return app;
})();
