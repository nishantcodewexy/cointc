"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { profile, remove, update },
      currency,
      kyc,
    },
    helpers: {
      jwt: { decodeUser },
    },
    boom,
    db: { User },
    consts: { roles: _roles },
  } = server.app;

  return {
    method: ["GET", "DELETE", "PUT"],
    path: "/account/{kind?}",
    config: {
      pre: [
        {
          method: async (req) => {
            return await User.findOne({
              where: {
                id: decodeUser(req),
              },
            });
          },
          assign: "user",
        },
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
    const {
      params: { kind },
    } = req;

    try {
      switch (kind) {
        // KYC
        case "kyc": {
          switch (method) {
            case "get":
            default: {
              const schema = Joi.object({
                type: Joi.string()
                  .allow(
                    "email",
                    "id",
                    "sms",
                    "payment_methods",
                    "OTP",
                    "otp",
                    "ID",
                    "bank_details"
                  )
                  .optional(),
              });

              let { error } = schema.validate(req.query);
              if (error) throw new Error("Bad Request Input");

              return kyc.fetch;
            }
          }
        }
        // USER
        case "user":
        default: {
          switch (method) {
            case "put": {
              const schema = Joi.object({
                data: Joi.array().items(
                  Joi.object({
                    kyc: Joi.object({
                      email: Joi.bool(),
                      payment_methods: Joi.object({
                        we_chat: Joi.any(),
                      }),
                      sms: Joi.string(),
                      id: Joi.string(),
                      account_no: Joi.string(),
                      bank_name: Joi.string(),
                      IFSC_code: Joi.string(),
                      country: Joi.string(),
                      currency: Joi.string(),
                    }),
                  })
                ),
              });

              let { error } = schema.validate(req.query);
              if (error) throw new Error("Bad request input");

              return update;
            }

            case "delete": {
              return remove;
            }

            case "get":
            default: {
              return profile;
            }
          }
        }
          
        case 'currency': {
          switch (method) {
            case 'get':
              return currency.get
          }
          }
      }
    } catch (err) {
      return boom.badRequest(err.message);
    }
  }
};
