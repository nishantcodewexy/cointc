"use strict";
const Joi = require("joi");
const kyc = require("./kyc");

module.exports = (server) => {
  const {
    controllers: {
      user: { profile, kyc, archive, update },
    },
    helpers: {
      jwt: { decodeUser },
    },
    boom,
    consts: { roles: _roles },
  } = server.app;

  return {
    method: ["GET", "DELETE", "PUT"],
    path: "/account",
    config: {
      pre: [
        [
          {
            method: decodeUser,
            assign: "user",
          },
        ],
        {
          method: accountHandler,
          assign: "action",
        },
      ],
      handler: (req, h) => req.pre.action(req, h),
      auth: "jwt",
    },
  };

  function accountHandler(req, h) {
    // get the method of request
    let method = req.method.toLowerCase();
    // {POST, GET, PUT or DELETE}
    switch (method) {
      // GET requests
      case "get": {
        let { kind } = req.query;

        const schema = Joi.object({
          role: Joi.string()
            .error((err) => {
              throw new Error('"role" required');
            })
            .required(),
        });

        try {
          schema.validate(req.query);

          switch (kind) {
            case "kyc": {
              const schema = Joi.object({
                type: Joi.string()
                  .allow("email", "id", "phone", "payment_methods")
                  .optional(),
              });

              let { error } = schema.validate(req.query);
              if (error) return boom.badRequest("Bad request");
              return kyc;
            }

            case "user":
            default: {
              return profile;
            }
          }
        } catch (err) {
          return boom.badRequest();
        }
      }

      default: {
        switch (method) {
          case "delete": {
            return archive;
          }

          case "put": {
            const schema = Joi.object({
              __update: Joi.object({
                kyc: Joi.object({
                  email: Joi.bool(),
                  payment_methods: Joi.object({
                    we_chat: Joi.any(),
                  }),
                  account_no: Joi.string(),
                  bank_name: Joi.string(),
                  IFSC_code: Joi.string(),
                  country: Joi.string(),
                  currency: Joi.string(),
                  created_at: Joi.string(),
                }),
              }),
            });
            return update;
          }
        }
      }
    }

    return () => boom.boomify;
  }
};
