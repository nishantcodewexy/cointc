const assert = require("assert");

module.exports = function WalletController(server) {
  const {
    db: { Wallet, User },
    boom,
    helpers: {},
  } = server.app;

  const walletExist = async (address, user) => {
    // Search wallet by address
    return await Wallet.findOne({
      where: { address, ...(() => (user ? { owner_id: user } : null))() },
    });
  };

  return {
    create: async (req) => {
      const { pre: user } = req;
      const { currency } = req.params;
      return await User.findByPk(user)
        .createWallet({ asset: currency })
        .toPublic();
    },
    // RETrIEVE ----------------------------------------
    // Fetch all user wallets
    bulkRetrieve: async (req) => {
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
    async retrieve() {
      let {
        pre: { user },
        params: { address },
      } = req;
      //`Requesting for wallet id:${id}`
      return await Wallet.findOne({
        where: {
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
};
