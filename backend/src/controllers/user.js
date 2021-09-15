const Boom = require("@hapi/boom");
const Web3 = require("web3");
const assert = require("assert");

module.exports = (server) => {
  const {
    db,
    helpers: { sendMail, decrypt, createToken },
  } = server.app;

  return {
    // Creates new user
    create: async function (req, res) {
      try {
        const { email, password } = req.payload;

        assert(email, Boom.badRequest("Expected email"));
        assert(password, Boom.badRequest("Expected password field"));

        // Check that the user email doesn't already exist
        let user = db.User.findOne({
          where: {
            email,
          },
        });

        if (user)
          throw Boom.notAcceptable("User with the ${email} already exist");

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
        return Boom.boomify(err);
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
          : Boom.notFound("User not found!");
      } catch (err) {
        console.error(err);
        return Boom.boomify(err);
      }
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
