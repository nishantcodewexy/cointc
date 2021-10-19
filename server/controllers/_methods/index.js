const { Model } = require("sequelize");

const model = require("../../services/model");

module.exports = (server) => {
  const {
    db,
    db: { User },
    consts: { roles: _roles },
    helpers: { filters, paginator },
    boom,
  } = server.app;

  return {
    async __create(model, payload, options) {
      return await db[model].create(payload, options);
    },
    async __destroy(model, where, force, options = {}) {
      return await db[model].destroy(
        { where, force },
        { ...options, logging: console.log }
      );
    },

    async __update(model, values, options) {
      let [affectedRowCount, affectedRow] = await db[model]?.update(values, {
        ...options,
        logging: console.log,
      });
      return { count: affectedRowCount, results: affectedRow };
    },
    
    async __upsert(model, values, options) {
      return await db[model]?.upsert(values, options);
    },
    /**
     *
     * @param {Model} model
     * @param {Object} query
     * @param {Object} where
     * @param {Object} extra
     * @param {String[]} searchFields
     * @param {Object} options
     * @returns {Promise<import('../../helpers').PaginatorResponse>}
     */
    async __findAllWithPagination(
      model,
      query,
      extra,
      searchFields = [],
      options = {}
    ) {
      /**
       * @type {import('../../helpers').FiltersResponse}
       */
      const filterResults = await filters({ query, extra, searchFields });

      const queryset = await db[model].findAndCountAll({
        ...filterResults,
        ...options,
      });
      const { limit, offset } = filterResults;
      return paginator({ queryset, limit, offset });
    },

    // async __retrieve(model, with_payload, where, options) {
    //   return await db[model].update(
    //     { ...with_payload },
    //     { where },
    //     { ...options, returning: true }
    //   );
    // },
    // async __list(model, with_payload, where, options) {
    //   return await db[model].update(
    //     { ...with_payload },
    //     { where },
    //     { ...options, returning: true }
    //   );
    // },

    __assertRole: function(role) {
      let profile, profile_attributes;
      switch (role) {
        case _roles.admin:
          profile = "admin_profile";
          profile_attributes = [
            "id",
            "kyc",
            "created_at",
            "updated_at",
            "last_login",
            "nickname",
            "archived_at",
          ];
          break;
        case _roles.basic:
          profile = "profile";
          profile_attributes = [
            "id",
            "email",
            "mode",
            "nickname",
            "kyc",
            "referral_code",
            "referrerId",
            "last_login",
            "archived_at",
          ];
          break;
        default:
          console.error(`Unrecognized user role ->`, role);
          throw new Error("User operation not allowed: Bad role");
      }
      let accessors = User.associations[profile]["accessors"];
      let getter = accessors?.get;
      let setter = accessors?.set;
      let creator = accessors?.create;

      let model = User.associations[profile]["target"]["name"];
      /* profile
        .split("_")
        .map((_p) => _p.charAt(0).toUpperCase() + _p.slice(1, +_p.length))
        .join(""); */
      return { profile, profile_attributes, model, getter, setter, creator };
    },
  };
};
