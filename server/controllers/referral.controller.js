"use strict";

function ReferralController(server) {
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
    async create(req) {
      const {
        pre: {
          user: { user, sudo },
        },
        payload: { referral_code },
      } = req;

      try {
        if (!sudo) throw boom.forbidden();

        const userProfile = await Profile.findOne({
          where: {
            referral_code,
          },
        });

        if (!userProfile) throw boom.notFound();

        let referrer = await User.findByPk(userProfile.user_id, {
          attributes: ["id", "email"],
        });
        user.addReferrer(referrer);
        return referrer;
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

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

    // fetch all Orders
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

module.exports = ReferralController;
