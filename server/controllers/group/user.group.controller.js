const update = require("../../routes/api/_user/update");

module.exports = (server) => {
  /*********************** HELPERS ***************************/
  const { __upsert, __destroy, __assertRole } = require("../_methods/index")(
    server
  );

  const {
    db,
    db: { User, sequelize, Wallet },
    boom,
    helpers: { paginator, filters },
    consts: { roles: _roles },
  } = server.app;

  return {
    async listReferrals() {
      const filterRespond = await filters({ query, searchFields: ["email"] });
      const queryset = User.getUsers();
      const { limit, offset } = filterRespond;
      return paginator({ queryset, limit, offset }).catch(boom.boomify);
    },
    /**
     * @function remove - remove user records
     * @param {Object} req  - request object
     * @param {Object} req.payload  - request body
     * @param {Array} req.payload.data  - array of upsert ids records
     * @returns
     */
    remove: async (req, h) => {
      const {
        payload: { data, soft },
        params: { id },
        pre: { isAdmin },
      } = req;

      if (!isAdmin) throw boom.forbidden("unauthorized");

      if (id) {
        data = [id];
        if (!soft) soft = true;
      }
      return {
        deleted: Boolean(
          await sequelize.transaction(async (t) => {
            data.forEach(async (id) => {
              let where = { id };
              await __destroy(where, soft, { transaction: t });
            });
          })
        ),
      };
    },

    /**
     * @function update - updates user records
     * @param {Object} req
     * @param {Object} req.payload
     * @param {Array} req.payload.data  - array of upsert records
     * @returns
     */
    async update(req) {
      try {
        const {
          payload: { data,},
        } = req;
        console.log({data})
        // TODO: authorization
        const attributes = ["mode", "nickname"];

        return await sequelize.transaction(async (t) => {
          data.forEach(async ({ id, ...payload }) => {
            // Find user
            const __user = await User.findOne({ where: { id } });
            // get user role to determine which profile to update
            const { model } = __assertRole(__user?.role);

            let where = {
              user_id: id,
            };
            console.log({payloaad})
           return  __upsert(model, payload, where, { transaction: t, attributes });
          });
        });
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    /**
     * @function create - Creates currency (**Admin only**)
     * @param {Object} req - Request object
     * @param {Object} req.payload
     * @param {Array} req.payload.data
     * @returns
     */
    create: async (req) => {
      const {
        payload: { data },
        pre: { user },
      } = req;

      try {
        return await sequelize.transaction(
          async (t) =>
            await User.bulkCreate(data, {
              transaction: t,
              validate: true,
              fields: ["email", "role"],
            })
        );
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    list: async (req) => {
      const {
        // pre: { isAdmin },
        query,
      } = req;
      const queryFilters = await filters({ query, searchFields: ["email"] });

      const queryset = await User.findAndCountAll({
        include: { association: "profile" },
        attributes: { exclude: ["password"] },
        ...queryFilters,
      });
      const { limit, offset } = queryFilters;
      return paginator({ queryset, limit, offset }).catch(boom.boomify);
    },

    async get(req, h) {
      const {
        query: { id },
      } = req;
      try {
        // handle invalid query <id> 400
        if (!id) return boom.badRequest();

        // Find target user
        return await User.findOne({
          where: { id },
        }).then(
          (_user) => _user?.toPublic() ?? boom.notFound("User not found!")
        );
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    async listBalance(req, h) {
      try {
        // Find target user
        return await User.findAndCountAll({
          include: [Wallet],
        }).then(
          (_user) => _user?.toPublic() ?? boom.notFound("User not found!")
        );
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },
  };
};
