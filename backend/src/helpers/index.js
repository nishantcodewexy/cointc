"use strict";

const { mailTransporter } = require("../../src/config");
const { nanoid } = require("nanoid");
const bcrypt = require("bcryptjs");
const assert = require("assert");
const Jwt = require("@hapi/jwt");
const { secret } = require("../config");

module.exports = {
  generateReferralCode(email) {
    let username = email.split("@")[0];
    let uuid = "";

    for (let i = 0; i < 4; ++i) {
      uuid += username[Math.floor(Math.random() * username.length)];
    }
    return uuid + nanoid(4);
  },

  encrypt: async (text) => {
    try {
      assert(text, "text is required");
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(text, salt);
      return hash;
    } catch (err) {
      console.error(err);
    }
  },

  decrypt: async (text, hash) => {
    try {
      assert(text, "text is required");
      assert(hash, "hash is required");
      return await bcrypt.compare(text, hash);
    } catch (err) {
      console.error(err);
    }
  },

  generateOTP: function (max = 4) {
    var digits = "0123456789";
    let OTP = "";

    for (let i = 0; i < max; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  },

  sendMail: async function (mailOptions) {
    const { from, to, subject, html, text } = mailOptions;
    try {
      assert(to, "sendMail to option is required.");
      assert(from, "sendMail from option is required.");
      assert(subject, "sendMail subject option is required.");
      assert(text, "sendMail text option is required.");

      // send mail with defined transport object
      return await mailTransporter.sendMail(mailOptions);
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  objectToHex(obj) {
    return Buffer.from(JSON.stringify(obj)).toString("hex");
  },

  hexToObject(hex) {
    return JSON.parse(Buffer.from(hex, "hex"));
  },

  createToken(user) {
    let scopes = user.role;

    // Sign the JWT
    return Jwt.token.generate(
      {
        user: user.id,
        aud: `urn:audience:${scopes}`,
        iss: `urn:issuer:${scopes}`,
        group: scopes,
      },
      secret,
      {
        ttlSec: 14400,
      }
    );
  },

  sluggify: (text) => {
    return text.toLowerCase();
  },

  getJWTToken: (req) => {
    const {
      auth: {
        token
      },
    } = req;
    return token;
  },
  getJWTDecodedUser: (req) => {
    const {
      auth: {
        artifacts: {
          decoded: {
            payload: { user },
          },
        },
      },
    } = req;
    return user;
  },
};
