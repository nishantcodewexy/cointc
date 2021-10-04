"use strict";
const assert = require("assert");

module.exports = (server) => {
  const { db } = server.app;
  const permissionController = {};

  const permissionGroupController = (req, h) => {};

  return { ...permissionController, group: permissionGroupController };
};
