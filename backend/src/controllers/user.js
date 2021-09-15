const Web3 = require("web3");
const assert = require("assert");

module.exports = (server) => {
  const {
    db,
    boom,
    helpers: { sendMail, decrypt, createToken },
  } = server.app;

  return {
    // Creates new user
    create: async function (req, res) {
      try {
        const { email, password } = req.payload;

        assert(email, boom.badRequest("Expected email"));
        assert(password, boom.badRequest("Expected password field"));

        // Check that the user email doesn't already exist
        let user = db.User.findOne({
          where: {
            email,
          },
        });

        if (user)
          throw boom.notAcceptable(
            `User with the email: ${email} already exist`
          );

        // Create new account in the blockchain with password
        const wallet_address = await createWallet(password);

        user = await db.User.build({
          ...req.payload,
        });

        // Create new wallet record
        const wallet = await db.Wallet.build({
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

        // Save
        await user.save();
        await wallet.save();

        // Send mail
        await sendMail(mailObject);

        return { access_token: createToken(user) };
      } catch (err) {
        console.error(err);
        return boom.boomify(err);
      }
    },

    // authenticate user
    authenticate: async function (req) {
      try {
        const { email, password } = req.payload;

        // fetch user record from DB that matches the email
        const user = await db.User.findOne({
          where: { email },
        });

        return user && (await decrypt(password, user.password))
          ? { access_token: createToken(user) }
          : boom.notFound("User not found!");
      } catch (err) {
        console.error(err);
        return boom.boomify(err);
      }
    },

    profile: async (req, reply) => {
      const { db } = server.app;
      // get user ID from preHandler
      let { user } = req.pre;

      // Fetch user
      user = await db.User.findOne({
        where: { id: user },
      });

      return user.profile;
    },
  };
};

// Private modules
async function createWallet(password) {
  // Connect to the Ethereum network
  const web3 = new Web3(
    Web3.givenProvider ||
      new Web3.providers.HttpProvider("http://localhost:8545")
  );

  // Creates and returns new Ethereum account
  return await web3.eth.personal.newAccount(password);
}
