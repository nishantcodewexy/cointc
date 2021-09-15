const Boom = require("@hapi/boom");
const Web3 = require("web3");
const { sendMail, decrypt, createToken } = require("../../../helpers");
const db = require("../../../database/models");

module.exports = {
  // Create new user
  create: async function (req, res) {
    try {
      // Connect to the Ethereum network
      const web3 = new Web3(
        Web3.givenProvider ||
          new Web3.providers.HttpProvider("http://localhost:8545")
      );

      const { email, password, referrer_code } = req.payload;

      // Create new account in the blockchain
      const wallet_address = await web3.eth.personal.newAccount(password);

      let user = await db.User.create({
        ...req.payload,
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

      return { access_token: createToken(user) }
    } catch (err) {
      console.error(err);
      return Boom.boomify(err);
    }
  },

  // authenticate user
  authenticate: async function (req, h) {
    try {
      const { email, password } = req.payload;

      // fetch user record from DB that matches the email
      const user = await db.User.findOne({
        where: { email },
      });

      return user && (await decrypt(password, user.password))
        ? { access_token: createToken(user) }
        : Boom.notFound("User not found!")
    } catch (err) {
      console.error(err);
      return (Boom.boomify(err));
    }
  },
};
