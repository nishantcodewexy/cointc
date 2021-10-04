const assert = require("assert");

module.exports = (server) => {
  const {
    db,
    boom,
    helpers: {},
  } = server.app;

  const walletExist = async (user, address) => {
    // Search wallet by address
    return await db.Wallet.findOne({ where: { owner_id: user, address: {} } });
  };

  const walletController = {
    // Fetch all user wallets
    profile: async (req) => {
      let {
        pre: { user },
      } = req;
      assert(type, "must specify wallet type");

      return db.Wallet.findAll({
        where: {
          owner_id: user,
        },
      }).catch(boom.boomify);
    },
    // Fetch specific user wallet
    profileByAddress: async () => {
      let {
        pre: { user },
        payload: { address },
      } = req;
      //`Requesting for wallet id:${id}`
      return db.Wallet.findOne({
        where: {
          owner_id: user,
          address,
        },
      });
    },

    // Fetch total user wallet balance
    totalBalance: async (req) => {
      let {
        pre: { user },
      } = req;
      //TODO: Aggregate wallet amount
    },
    // Fetch specific user wallet balance
    balanceOf: async (req) => {
      let {
        pre: { user },
        payload: { address },
      } = req;
    },
  };

  const walletGroupController = (req, h) => {};
  return { ...walletController, group: walletGroupController };
};
