"use strict";

function AffiliateController(server) {
  const {
    db: {
      Referral,
      Profile,
      User,
      Sequelize: { Op },
    },
    boom,
    helpers: { filters, paginator },
  } = server.app;

  return {
    /**
     * @function create
     * @param {Object} req
     * @param {Object} h
     * @returns
     */
    async create(req, h) {
      const {
        pre: {
          user: { user, sudo },
        },
        payload: { invite_code },
      } = req;

      try {
        // if (!sudo) throw boom.forbidden();

        const userProfile = await Profile.findOne({
          where: {
            invite_code,
          },
        });

        if (!userProfile)
          throw boom.notFound(
            `User with invite code ${invite_code} does not exist`
          );

        let referrer = await User.findOne({
          where: { id: userProfile?.user_id },
          attributes: ["id", "email"],
        });
        referrer.addReferrer(user);
        return h.response({ status: true }).code(200);
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },
    /**
     * @function generateLink
     * @param {Object} req
     * @param {Object} h
     * @returns
     */
    async generateLink(req, h) {
      let result = "";
      return h.response({ result }).code(200);
    },

    /**
     * @function remove
     * @param {Object} req
     * @returns
     */
    async remove(req) {
      const {
        pre: {
          user: { user, sudo },
        },
      } = req;

      // only allow action if it admin
      if (!sudo) throw boom.forbidden();

      try {
        const { data } = req.payload;

        return await Referral.destroy({
          where: {
            [Op.or]: data,
          },
          force: true,
        });
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },
    /**
     * @function find
     * @param {Object} req
     * @returns
     */
    async find(req) {
      const {
        query,
        pre: {
          user: { user, sudo, fake },
        },
      } = req;

      try {
        const queryFilters = await filters({
            query,
            searchFields: ["email"],
            ...(!sudo && {
              extras: {
                user_id: user?.id,
              },
            }),
          }),
          options = {
            ...queryFilters,
          };
        const { limit, offset } = queryFilters;

        queryset = fake
          ? await Referral.FAKE(limit)
          : await Referral.findAndCountAll(options);

        return await paginator({
          queryset,
          limit,
          offset,
        });
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },
    
    /**
     * @function findbyID
     * @param {Object} req
     * @returns
     */
    async findByID(req) {
      const {
        query,
        params: { id },
        pre: {
          user: { user, fake },
        },
      } = req;

      try {
        let queryFilters = await filters({
            query,
            searchFields: ["email"],
            extras: {
              id,
              ...(!sudo && { user_id: user?.id }),
            },
          }),
          options = {
            ...queryFilters,
          },
          queryset = fake
            ? await Referral.FAKE()
            : await Referral.findAndCountAll(options);

        return await paginator({
          queryset,
          limit: queryFilters.limit,
          offset: queryFilters.offset,
        });
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },
  };
}

module.exports = AffiliateController;
