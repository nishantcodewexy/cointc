"use strict";
const assert = require("assert");

module.exports = (server) => {
  const { db } = server.app;
  const securityController = {};

  const securityGroupController = (req, h) => {};

  return { ...securityController, group: securityGroupController };
};
