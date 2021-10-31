"use strict";
let dateFn = require("date-fns");
const { KycStatusType } = require("../consts");

module.exports = function StatsController(server) {
  const {
    db: {
      Sequelize: { Op },
      Security,
      User,
      KYC,
    },
    helpers: { filters },
    boom,
  } = server.app;
  return {
    async userAnalytics(req) {
      const { query } = req;
      const queryFilters = await filters({ query });

      try {
        let userAnalytics = {
          total: await User.count({
            where: { ...queryFilters?.where },
          }),
          suspended: await User.count({
            where: { ...queryFilters?.where, archived_at: { [Op.ne]: null } },
          }),

          recently_added: await User.count({
            where: {
              ...queryFilters?.where,
              created_at: {
                // last 30 days
                [Op.gte]: Date.now() - 30 * 24 * 60 * 60 * 1000,
              },
            },
          }),
        };
        return {
          result: userAnalytics,
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },
    async withdrawalAnalytics(req) {
      const { query } = req;
      const queryFilters = await filters({ query });

      try {
        let userAnalytics = {
          total: await User.count({
            where: { ...queryFilters?.where },
          }),
          suspended: await User.count({
            where: { ...queryFilters?.where, archived_at: { [Op.ne]: null } },
          }),
          recent: await User.count({
            where: {
              ...queryFilters?.where,
              created_at: {
                [Op.lte]: dateFn.subDays(new Date(), 30),
              },
            },
          }),
        };
        return {
          result: userAnalytics,
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },
    async depositAnalytics(req) {
      const { query } = req;
      const queryFilters = await filters({ query });

      try {
        let userAnalytics = {
          total: await User.count({
            where: { ...queryFilters?.where },
          }),
          suspended: await User.count({
            where: { ...queryFilters?.where, archived_at: { [Op.ne]: null } },
          }),
          recent: await User.count({
            where: {
              ...queryFilters?.where,
              created_at: {
                [Op.lte]: dateFn.subDays(new Date(), 30),
              },
            },
          }),
        };
        return {
          result: userAnalytics,
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },
    async transactionAnalytics(req) {
      const { query } = req;
      const queryFilters = await filters({ query });

      try {
        let userAnalytics = {
          total: await User.count({
            where: { ...queryFilters?.where },
          }),
          suspended: await User.count({
            where: { ...queryFilters?.where, archived_at: { [Op.ne]: null } },
          }),
          recent: await User.count({
            where: {
              ...queryFilters?.where,
              created_at: {
                [Op.lte]: dateFn.subDays(new Date(), 30),
              },
            },
          }),
        };
        return {
          result: userAnalytics,
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },
    async supportTicketAnalytics(req) {
      const { query } = req;
      const queryFilters = await filters({ query });

      try {
        let userAnalytics = {
          total: await User.count({
            where: { ...queryFilters?.where },
          }),
          suspended: await User.count({
            where: { ...queryFilters?.where, archived_at: { [Op.ne]: null } },
          }),
          recent: await User.count({
            where: {
              ...queryFilters?.where,
              created_at: {
                [Op.lte]: dateFn.subDays(new Date(), 30),
              },
            },
          }),
        };
        return {
          result: userAnalytics,
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },
    async kycAnalytics(req) {
      const { query } = req;
      const queryFilters = await filters({ query });

      try {
        let kycAnalytics = {
          total: await KYC.count({
            where: { ...queryFilters?.where },
          }),
          accepted: await KYC.count({
            where: { ...queryFilters?.where, status: KycStatusType?.ACCEPT },
          }),
          denied: await KYC.count({
            where: { ...queryFilters?.where, status: KycStatusType?.DENY },
          }),
          pending: await KYC.count({
            where: { ...queryFilters?.where, status: KycStatusType?.PENDING },
          }),
          recently_added: await KYC.count({
            where: {
              ...queryFilters?.where,
              created_at: {
                [Op.lte]: dateFn.subDays(new Date(), 30),
              },
            },
          }),
        };
        return {
          result: kycAnalytics,
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },
    async securityAnalytics(req) {
      const { query } = req;
      const queryFilters = await filters({ query });

      try {
        let securityAnalytics = {
          total: await Security.count({
            where: { ...queryFilters?.where },
          }),
          enabled_2fa: await Security.count({
            where: { ...queryFilters?.where, two_factor: true },
          }),
          recently_added: await Security.count({
            where: {
              ...queryFilters?.where,
              created_at: {
                [Op.lte]: dateFn.subDays(new Date(), 30),
              },
            },
          }),
        };
        return {
          result: securityAnalytics,
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },
  };
};
