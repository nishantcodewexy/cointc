"use strict";

const { mailTransporter } = require("../../src/config");
const { nanoid } = require("nanoid");
const bcrypt = require("bcryptjs");
const assert = require("assert");
const Jwt = require("@hapi/jwt");
const { secret } = require("../config");

function generateReferralCode(email) {
  let username = email.split("@")[0];
  return username + nanoid();
}

// generate hash
const encrypt = async (text) => {
  try {
    assert(text, "text is required");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(text, salt);
    return hash;
  } catch (err) {
    console.error(err);
  }
};

const decrypt = async (text, hash) => {
  try {
    assert(text, "text is required");
    assert(hash, "hash is required");
    return await bcrypt.compare(text, hash);
  } catch (err) {
    console.error(err);
  }
};

function createToken(user) {
  let scopes = user.role;

  // Sign the JWT
  return Jwt.token.generate(
    {
      user: user.profile,
      aud: `urn:audience:${scopes}`,
      iss: `urn:issuer:${scopes}`,
      group: scopes,
    },
    secret,
    {
      ttlSec: 14400,
    }
  );
}

function objectToHex(obj) {
  return Buffer.from(JSON.stringify(obj)).toString("hex");
}

function hexToObject(hex) {
  return JSON.parse(Buffer.from(hex, "hex"));
}

function generateOTP(max = 4) {
  var digits = "0123456789";
  let OTP = "";

  for (let i = 0; i < max; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

async function sendMail(mailOptions) {
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
}

module.exports = {
  generateReferralCode,
  encrypt,
  decrypt,
  generateOTP,
  sendMail,
  objectToHex,
  hexToObject,
  createToken
};
