"use strict";
const assert = require("assert");

module.exports = (server) => {
  const { db } = server.app;
  const chatController = {};

  const chatGroupController = (req, h) => {};

  return { ...chatController, group: chatGroupController };
};
