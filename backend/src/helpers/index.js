"use strict"

const {mailTransporter} = require('../../src/config');
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt');
const saltRounds = 32;
const assert = require( "assert" );
const nodemailer = require("nodemailer");

function generateReferralCode(email){
  let username = email.split('@')[0];
  return username + nanoid()
}

async function textToHash(text, cb){
  bcrypt.hash(text, saltRounds, cb);
}

async function hashIsText(text, hash){
  return await bcrypt.compare(text, hash);
}

function generateOTP(max = 4) {
  var digits = '0123456789';
  let OTP = '';

  for (let i = 0; i < max; i++ ) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

async function sendMail (mailOptions) {
  const {from, to, subject, html, text} = mailOptions;
  try{
    assert( to, "sendMail to option is required." );
    assert( from, "sendMail from option is required." );
    assert( subject, "sendMail subject option is required." );
    assert( text, "sendMail text option is required." );

    // send mail with defined transport object
    return await mailTransporter.sendMail(mailOptions);

  }catch(err){
    console.error(err);
    return false
  }
}

module.exports = {
  generateReferralCode,
  textToHash,
  hashIsText,
  generateOTP,
  sendMail
}
