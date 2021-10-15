const assert = require("assert");

module.exports = (server) => {
  const {__findAllWithPagination} = require("./_methods")(server)
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
      const { user,data:{
        payload:{currency}
      } } = req.pre;
      // const { currency } = req.params;
      
      const wallet = await user.createWallet({ asset: currency })
      return wallet.toPublic()
    },

    // Fetch all user wallets
    list: async (req) => {
      let {
        pre: { user },
        query
      } = req;
      // assert(type, "must specify wallet type");

      return await __findAllWithPagination("Wallet",query,{owner_id:user.id},[],{})
      .catch(boom.boomify);
      
    },

    // Fetch specific user wallet
    retrieve: async (req) => {
      let {
        pre: { user },
        params: { address },
      } = req;
      //`Requesting for wallet id:${id}`
      const wallet = await Wallet.findOne({
        where: {
          owner_id: user.id,
          address,
        },
      });
      return wallet?wallet.toPublic():null
    },
    
    // Fetch total user wallet balance
    statistic: async (req) => {
      let {
        pre: { user },
      } = req;
      // return await user.getStatistic().toPublic()
      return []
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
