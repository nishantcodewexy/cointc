"use strict";

const config = require("dotenv").config({
  path: "../.env",
});
const env = process.env.NODE_ENV || "development";

if (env === "development") console.log({ parsedEnv: config.parsed });
if (config.error) {
  throw config.error;
}
const server = require("./server");

module.exports = (async () => {
  const { start } = await server;
  const app = await start();
  return app;
})();
