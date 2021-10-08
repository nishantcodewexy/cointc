"use strict";
const assert = require("assert");

module.exports = (server) => {
  const { db } = server.app;
  const secessionController = {};
  
  const secessionGroupController = (req, h) => {};

  return { ...secessionController, group: secessionGroupController };
};
