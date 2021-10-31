"use strict";
let dateFn = require("date-fns");

module.exports = function StatsController(server) {
  const {
    db: { sequelize, User },
  } = server.app;
  return {
    async userAnalytics(req) {
      const {
        query: { access_level = null },
      } = req;

      let _new,
        _total,
        _suspended,
        now = new Date();
      let users = User.findAndCountAll({
        where: {
          ...(access_level && { access_level }),
        },
        attributes: [
          [sequelize?.fn("count", "User.archived_at IS NULL"), "suspended"],
          [sequelize?.fn("count", "id"), "total"],
        ],
      });

      return {
        result: { new: _new, total: _total, suspended: _suspended },
      };
    },
    async withdrawalAnalytics() {
      let _new, _total, _suspended;
      return {
        result: { new: _new, total: _total, suspended: _suspended },
      };
    },
    async depositAnalytics() {
      let _new, _total, _suspended;
      return {
        result: { new: _new, total: _total, suspended: _suspended },
      };
    },
    async transactionAnalytics() {
      let _new, _total, _suspended;
      return {
        result: { new: _new, total: _total, suspended: _suspended },
      };
    },
    async supportTicketAnalytics() {
      let _new, _total, _suspended;
      return {
        result: { new: _new, total: _total, suspended: _suspended },
      };
    },
    async kycAnalytics() {
      let _new, _total, _suspended;
      return {
        result: { new: _new, total: _total, suspended: _suspended },
      };
    },
    async securityAnalytics() {
      let _new, _total, _suspended;
      return {
        result: { new: _new, total: _total, suspended: _suspended },
      };
    },
    async findAll() {
      // user
      // wallet
      // deposits
      // withdrawals
    },
  };
};
