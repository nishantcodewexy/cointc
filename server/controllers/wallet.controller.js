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
        pre: {user: {user, sudo}},
        params: { currency },
      } = req;
      return await User.findByPk(user).createWallet({ asset: currency });
    },

    // RETRIEVE ----------------------------------------
    find: async (req) => {
      let {
        pre: { user : {user, sudo, fake}},
        query,
      } = req;

      try {
        const queryFilters = await filters({
          query,
          searchFields: ["account_id"],
          extras: {
            ...(!sudo && {user_id: user?.id})
          }
        });
        const options = {
          ...queryFilters,
        };

        const { limit, offset } = queryFilters;
        let queryset = fake ? Wallet.FAKE(limit) : await Wallet.findAndCountAll(options);

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

    /**
     * @function findByAddress - Find wallet by address
     * @param {Object} req
     * @returns
     */
    async findByAddress(req) {
      let {
        pre: { user: {sudo, fake}},
        params: { address },
      } = req;
      let where, result;
      try {
        where = { address };
        result = fake ? Wallet.FAKE() : await Wallet.findOne({
          where,
        });

        return result
          ? { result }
          : boom.notFound(`Wallet address: ${address} not found!`);
      } catch (err) {
        console.error(err);
      }
    },

    async depositAsset(req) { },
    async withdrawAsset(req) { },
    
    async transferAsset(req){}
  };
};
