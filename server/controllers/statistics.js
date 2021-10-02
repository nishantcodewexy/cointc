"use strict";
const assert = require("assert");

module.exports = (server) => {
  const { db } = server.app;
  const statController = {};

  const statGroupController = (req, h) => {};

  return { ...statController, group: statGroupController };
};
