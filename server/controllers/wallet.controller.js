"use strict";

const sequelize = require("sequelize");

module.exports = function WalletController(server) {
  /*********************** HELPERS ***************************/
  /*  const {  __update, __destroy } = require("./utils")(
    server
  ); */

  const {
    db: { Wallet, User },
    boom,
    helpers: { filters, paginator },
  } = server.app;

  /* const walletExist = async (address, user) => {
    // Search wallet by address
    return await Wallet.findOne({
      where: { address, ...(() => (user ? { owner_id: user } : null))() },
    });
  }; */

  return {
    create: async (req) => {
      const {
        pre: user,
        params: { asset },
      } = req;
      return await User.findByPk(user)
        .createWallet({ asset })
        .toPublic();
    },
    // RETRIEVE ----------------------------------------
    bulkRetrieve: async (req) => {
      let {
        pre: { user },
        query,
      } = req;

      try {
        const queryFilters = await filters({ query, searchFields: ["account_id"] });
        const options = {
          ...queryFilters,
        };

        let queryset = await Wallet.findAndCountAll(options);
        const { limit, offset } = queryFilters;

        return paginator({
          queryset,
          limit,
          offset,
        });
      } catch (error) {
        console.error(error);
        return boom.internal(error.message, error);
      }
    },

    // Fetch specific user wallet
    async retrieve(req) {
      let {
        pre: { user },
        params: { address },
      } = req;
      let where, result;
      try {
        where = { address };
        result = await Wallet.findOne({
          where,
        });

        return result
          ? { result }
          : boom.notFound(`Wallet address: ${address} not found!`);
      } catch (err) {
        console.error(err);
      }
    },

    async retrieveMe(req) {
      let {
        pre: { user },
      } = req;
      let where, result;
      try {
        where = {
         ...(user?.isAdmin || user?.isSuperAdmin? {} :{ user_id: user?.id}),
        };

        result = await Wallet.findAll({
          where,
        })

        return { result };
      } catch (err) {
        console.error(err);
      }
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
