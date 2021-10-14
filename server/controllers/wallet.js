const assert = require("assert");

module.exports = (server) => {
  const {
    db: { Wallet, User },
    boom,
    helpers: {},
  } = server.app;

  const walletExist = async (user, address) => {
    // Search wallet by address
    return await Wallet.findOne({ where: { owner_id: user, address: {} } });
  };

  const walletController = {
    create: async (req) => {
      const { user } = req.pre;
      const { currency } = req.params;
      return await User.findByPk(user)
        .createWallet({ asset: currency })
        .toPublic();
    },

    // Fetch all user wallets
    getAll: async (req) => {
      let {
        pre: { user },
      } = req;
      assert(type, "must specify wallet type");

      return await Wallet.findAll({
        where: {
          owner_id: user,
        },
      }).catch(boom.boomify);
    },

    // Fetch specific user wallet
    getByAddress: async () => {
      let {
        pre: { user },
        params: { address },
      } = req;
      //`Requesting for wallet id:${id}`
      return await Wallet.findOne({
        where: {
          owner_id: user,
          address,
        },
      }).toPublic();
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
