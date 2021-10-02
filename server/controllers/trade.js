"use strict";
const assert = require("assert");

module.exports = (server) => {
  const { db } = server.app;
  const tradeController = {};

  const tradeGroupController = (req, h) => {};

  return { ...tradeController, group: tradeGroupController };
};
