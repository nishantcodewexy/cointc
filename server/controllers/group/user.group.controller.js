const update = require("../../routes/api/_user/update");
const uuid = require("uuid");
const faker = require("faker");
const { filterFields } = require("../../services/model");
const Joi = require("joi");
<<<<<<< HEAD
const {
  roles,
  types: { ProfileModeType, country },
} = require("../../consts");
const Sequelize = require("sequelize")
=======

>>>>>>> b8f4f43ecc150cb9fc57733d45a634b0b0574b89
module.exports = (server) => {
  /*********************** HELPERS ***************************/
  const { __upsert, __destroy, __assertRole } = require("../_methods/index")(
    server
  );

  const {
    db,
    db: { User, sequelize, Wallet, AdminProfile, BasicProfile,Message },
    boom,
    helpers: { paginator, filters },
    consts: {
      roles: _roles,
      types: { ProfileModeType, country },
    },
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
      let {
        payload: { data, soft },
        params: { id },
      } = req;

      if (id) {
        data = [id];
        if (!soft) soft = true;
      }
      return {
        deleted: Boolean(
          await sequelize.transaction(async (t) => {
            data.forEach(async (id) => {
              let where = { id };
              await __destroy("User", where, soft, { transaction: t });
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
    async bulkUpdate(req) {
      try {
        const {
          payload: { data, suspend = false, sudo },
        } = req;
        console.log({ data });
        // TODO: authorization

        const attributes = ["mode", "nickname", "role"];

        return await sequelize.transaction(async (t) => {
          return data.map(async ({ id, ...payload }) => {
            // Find user
            const __user = await User.findOne({ where: { id } });
            // get user role to determine which profile to update
            const { model } = __assertRole(__user?.role);
            let where = {
              user_id: id,
            };
            if (suspend) {
              // Soft delete user
              // payload.archived_at = new Date().toLocaleString();
              let destroyed = await __destroy(User?.name, { id }, true, {
                transaction: t,
              });
              console.log({ destroyed });
            }

            console.log({ payload });
            return await __upsert(model, payload, where, {
              transaction: t,
              attributes,
            });
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
     * @param {Object[]} req.payload.data
     * @returns
     */
    bulkCreate: async (req) => {
      const {
        payload = [],
        pre: { isAdminOrError },
      } = req;

      const payloadSchema = Joi.array().items(
        Joi.object({
          email: Joi.string()
            .email()
            .required(),
          role: Joi.string()
            .valid(...Object.keys(_roles))
            .required(),
          profile: Joi.object(),
        })
      );

      const adminProfileSchema = Joi.object({
        mode: Joi.string().valid(...Object.keys(ProfileModeType)),
        nickname: Joi.string().optional(),
      });

      const userProfileSchema = Joi.object({
        mode: Joi.string().valid(...Object.keys(ProfileModeType)),
        nickname: Joi.string().optional(),
        country: Joi.string()
          .valid(...Object.keys(country))
          .optional(),
        last_name: Joi.string().optional(),
        other_names: Joi.string().optional(),
      });

      const { value, error } = payloadSchema.validate(payload);

      if (error) throw boom.badData("invalid data", error);

      try {
        return await sequelize.transaction(async (t) => {
          return await Promise.all(
            value.map(async (data) => {
              let password = faker.internet.password();
              if (data.role == roles.admin) {
                let { error } = adminProfileSchema.validate(data.profile || {});

                if (error) return { error };

                let profileData = data.profile || {};
                delete data.profile;

                let user = await User.create(
                  {
                    ...data,
                    password,
                    profile: profileData,
                    include: [
                      {
                        association: "admin_profile",
                      },
                    ],
                  },
                  {
                    transaction: t,
                  }
                );
                // await AdminProfile.create({...profileData,user_id:user.id},{
                //   transaction: t,
                // })
                return {
                  id: user.id,
                  ...data,
                  profile: profileData,
                };
              } else {
                let { error } = userProfileSchema.validate(data.profile || {});
                if (error) return { error };

                let profileData = data.profile || {};
                delete data.profile;

                let user = await User.create(
                  {
                    ...data,
                    password,
                    profile_admin: profileData,
                  },
                  {
                    transaction: t,
                    include: [
                      {
                        association: "profile",
                      },
                    ],
                  }
                );
                // await Profile.create({...profileData,user_id:user.id},{
                //   transaction: t,
                // })
                return {
                  id: user.id,
                  ...data,
                  profile: profileData,
                };
              }
            })
          );
        });
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    list: async (req) => {
      try {
        const {
          // pre: { isAdmin },
          query,
        } = req;
        const { paranoid = 1,extend=0 } = query;
        
        const queryFilters = await filters({ query, searchFields: ["email"] });

        const user = await User.findAndCountAll({
          // include: [AdminProfile, BasicProfile],
          attributes: { exclude: ["password"] },
          // attributes: { 
          //   include: [[Sequelize.fn("COUNT", Sequelize.col("messages.id")), "messagesCount"]] 
          //  },
          // include:[
          //   {
          //     model:Message,
          //     attributes:[
               
          //     ]
          //   }
          // ],
          ...queryFilters,
          paranoid: Boolean(+paranoid),
        });
        
        const { limit, offset } = queryFilters;
        
        return paginator({
          queryset: user,
          limit,
          offset,
        });
      } catch (error) {
        console.error(error);
        boom.boomify(error)
      }
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
