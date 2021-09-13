const Boom = require("@hapi/boom");
const { generateReferralCode, sendMail } = require("../../helpers");
const Web3 = require("web3");
const db = require("../../database/models");

module.exports = {
  create: async function (request, h) {
    try {
      // Connect to the Ethereum network
      const web3 = new Web3(
        Web3.givenProvider ||
          new Web3.providers.HttpProvider("http://localhost:8545")
      );

      const { email, password, referrer_code } = request.payload;

      // Create new account in the blockchain
      const wallet_address = await web3.eth.personal.newAccount(password);

      let user = await db.User.create({
        ...request.payload,
        referral_code: generateReferralCode(email),
      });

      // Record the Referrer record
      if (referrer_code) {
        // find referrere using referrer_code
        const referrer = await db.User.findOne({
          where: { referral_code: referrer_code },
        });

        if (referrer) {
          await db.Referral.create({
            referrer: referrer.id,
            referred: user.id,
          });
          // TODO: Pay referrer commission
        }
      }

      // Create new wallet record
      await db.Wallet.create({
        address: wallet_address,
        owner: user.id,
      });

      // Send email verification
      const mailObject = {
        to: email,
        from: "noreply@cryptcon",
        html: `Click a button to verify`,
        subject: "Cryptcon - Account email verification",
      };

      sendMail(mailObject);
    } catch (err) {
      console.error(err);
    }
  },

  authenticate: async function (request, h) {
    try {
      const { email, password } = request.payload;

      // fetch user record
      const user = await db.User.findOne({ where: { password } });

      if (user) {
        h.authenticated({ email });
        //TODO:  Send email OTP

        // TODO: Update OTP record
      } else {
        h.unauthenticated("User not found!");
      }
    } catch (err) {
      console.error(error);
      return error;
    }
  },
};
