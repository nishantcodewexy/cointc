"use strict";
const assert = require("assert");

module.exports = (server) => {
  const { db } = server.app;
  const kycController = {};

  const kycGroupController = (req, h) => {};

  return { ...kycController, group: kycGroupController };
};
