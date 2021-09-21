"use strict";
const server = require("./server");
const util = require("util");

module.exports = (async () => {
  const { start } = await server;
  const app = await start();
  return app;
})();
