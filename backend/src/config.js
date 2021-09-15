"use strict";

const assert = require("assert");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const fs = require('fs');
const envConfig = dotenv.parse(fs.readFileSync('.env.local'))
for (const k in envConfig) {
  process.env[k] = envConfig[k]
}
// const env = process.env.NODE_ENVIRONMENT || 'development';

// read in the .env file

try {
  const {
    PORT,
    HOSTNAME,
    HTTP_PROTOCOL,

    EMAIL_USER,
    EMAIL_PASSWORD,
    EMAIL_PORT,
    EMAIL_HOSTNAME,
    EMAIL_SECURE,
    SECRET_KEY,
  } = process.env;

  // validate the required configuration information
  assert(SECRET_KEY, "SECRET_KEY env configuration is required.");

  assert(PORT, "PORT env configuration is required.");
  assert(HOSTNAME, "HOSTNAME env configuration is required.");

  // assert( EMAIL_USERNAME, "EMAIL_USERNAME env configuration is required." );
  // assert( EMAIL_PASSWORD, "EMAIL_PASSWORD env configuration is required." );
  assert(EMAIL_HOSTNAME, "EMAIL_HOSTNAME env configuration is required.");
  assert(EMAIL_PORT, "EMAIL_PORT env configuration is required.");

  // Test mail account
  let mailAccount =
    EMAIL_USER && EMAIL_PASSWORD
      ? {
          user: EMAIL_USERNAME,
          password: EMAIL_PASSWORD,
        }
      : nodemailer.createTestAccount();
  
  
  // setup email transport config
  const mailer = {
    host: EMAIL_HOSTNAME,
    port: EMAIL_PORT,
    secure: EMAIL_SECURE, // true for 465, false for other ports
    auth: {
      user: mailAccount.user, // generated ethereal user
      pass: mailAccount.pass, // generated ethereal password
    },
  };
  
  let mailTransporter = nodemailer.createTransport(mailer);
  
  // JWT Config
  const jwt = {
    keys: SECRET_KEY,
    verify: false,
    /* {
      aud: "urn:audience:test",
      iss: "urn:cryptcon:test",
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400, // 4 hours
      timeSkewSec: 15,
    }, */
    validate: async (artifacts, request, h) => {
     
      const { server } = request;
      const db = server.app.db;
      const {
        token,
        decoded: {
          payload: { user },
        },
      } = artifacts;

      let foundToken = Boolean(await db.User.findOne({ where: {id: user} }));
      return { isValid: foundToken, credentials: {} };
    },
  };

  module.exports = {
    hostname: HOSTNAME,
    port: PORT,
    host_url: `${HTTP_PROTOCOL || "http"}://${HOSTNAME}:${PORT}`,
    mailer: { ...mailer, transporter: mailTransporter },
    jwt,
    secret: SECRET_KEY
  };

  module.exports.mailTransporter = mailTransporter;
} catch (error) {
  console.error(error);
}
