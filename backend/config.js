"use strict";

const { mailer, server, jwt } = require("./helpers");

try {
  module.exports = {
    mailer, server, jwt
  };
} catch (err) {
  console.error(err);
}
