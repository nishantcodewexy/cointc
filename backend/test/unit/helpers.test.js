const {
  generateReferralCode,
  sendMail,
  generateOTP,
  encrypt,
  decrypt,
  objectToHex,
  hexToObject,
} = require("../../src/helpers");
const database = require("../../src/database/models");
const nodemailer = require("nodemailer");
const test_password = "p@55w0rd";
const test_email = "test@mail";
const otp_length = 6;
const otp_code = generateOTP(otp_length);
const mailObject = {
  to: test_email,
  from: "noreply@cryptcon",
  text: `Your OTP code is: ${otp_code}`,
  subject: "Cryptcon OTP",
};

it(`Connects to Database`, async () => {
  let connected = false;
  await database.sequelize.authenticate().then(() => (connected = true));
  expect(connected).toBeTruthy();
});

describe(`Generates referral code`, () => {
  const referral_code = generateReferralCode(test_email);
  it(`Checks that referral code starts with the user's email`, () => {
    expect(referral_code).toMatch(new RegExp(`^${test_email.split("@")[0]}`));
  });
});

test(`Check text encryption and decryption`, async () => {
  const encrypted = await encrypt(test_password);
  const decrypted = await decrypt(test_password, encrypted)

  console.log({encrypted });
  expect(decrypted).toBe(true);

  // it("Converts Object to HEX string", () => {
  //   expect(typeof hex).toBe("string");
  // });

  // it("Converts HEX to Object string", () => {
  //   expect(typeof obj).toBe("object");
  // });

});

it(`Generates OTP with a max length of ${otp_length}`, () => {
  expect(otp_code).toHaveLength(otp_length);
});

describe(`Checks the mailing feature`, () => {
  it("Checks that sendMail is defined and is a function", () => {
    expect(sendMail).toBeDefined();
    expect(sendMail).toBeInstanceOf(Function);
  });

  // it(`Sends mail to ${test_email}`, async () => {
  //   const mail_info = await sendMail(mailObject);

  //   expect(typeof nodemailer.getTestMessageUrl(mail_info)).toBe('boolean')
  // }, 1000);
});
