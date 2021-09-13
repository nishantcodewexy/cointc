const {
  generateReferralCode,
  sendMail,
  generateOTP,
  textToHash,
  hashIsText,
} = require("../../src/helpers");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

test(`generates referral code with the user's email at the start`, () => {
  let email = "johndoe@mail";
  expect(generateReferralCode(email)).toContain("johndoe");
});

test(`Compares text and its hash`, async () => {
  let text = "12345678";

  bcrypt.hash(text, 32, async (err, hash) => {
    expect(typeof hash).toBe("string");

    const compare = await hashIsText(text, hash);
    expect(compare).toBeTruthy();
  });
});

let otp_length = 6;
let otp_code = generateOTP(otp_length);

test(`Generates OTP with a max length of ${otp_length}`, () => {
  expect(otp_code).toHaveLength(otp_length);
});

var testEmail = "test@mail";
const mailObject = {
  to: testEmail,
  from: "noreply@cryptcon",
  text: `Your OTP code is: ${otp_code}`,
  subject: "Cryptcon OTP",
};

test(`Generates OTP: ${otp_code}, and sends as mail to ${testEmail}`, async () => {
  expect(sendMail).toBeInstanceOf(Function);

  expect(sendMail(nodemailer.getTestMessageUrl(mailObject))).stringContaining(
    "https://ethereal.email/message"
  );
});
