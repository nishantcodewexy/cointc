"use strict";
const nodemailer = require("nodemailer");
const config = require("dotenv").config({
    path: "../.env",
  });
let count = 0
// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();
    
  // create reusable transporter object using the default SMTP transport
  const options = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE?.toLowerCase() === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
    },
  }
  
  let transporter = nodemailer.createTransport(options);
  
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <aniekutmfonekere@gmail.com>', // sender address
    to: "aniekutmfonekere@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  console.log(count++)
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  console.log(count++)
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
console.log(count++)
main().catch(console.error);