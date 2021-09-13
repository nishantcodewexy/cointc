"use strict";
const {sendMail} = require("../helpers");
const assert = require( "assert" );

module.exports = {
  name: "mail",
  version: "1.0.0",
  register: async (server, options) => server.method('sendMail', sendMail)
};
