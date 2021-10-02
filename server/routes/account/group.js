"use strict"
const Joi = require('joi');

module.exports = (server) => {
  const {
    controllers: {
      statistics,
      permission,
      advert,
      trade,
      wallet,
      ticket,
      kyc,
      secession,
      security,
      user,
      chat,
    },
    helpers: {
      jwt: { decodeUser },
    },
    consts: { roles: _roles },
  } = server.app;

  return {
    method: ["POST", "GET", "PUT", "DELETE"],
    path: "/account/group",
    config: {
      pre: [
        [
          { method: decodeUser, assign: "user" },
          { method: () => _roles.admin, assign: "role" },
        ],
        {
          method: (req) => {
            return null;
          },
          assign: "group",
        },
      ],
      handler: groupRouteHandler,
      auth: "jwt",
    },
  };

  function groupRouteHandler(req, h) {
    // get the method of request
    let method = req.method.toLowerCase();
    // {POST, GET, PUT or DELETE}
    switch (method) {
      case "get": {
        let { kind } = req.query;
        switch (kind) {
          case "user":
          case "users":
            return user.group(req, h);
          case "statistics":
          case "stats":
            return statistics.group(req, h);
          case "permission":
          case "permissions":
            return permission.group(req, h);
          case "wallet":
          case "wallets":
            return wallet.group(req, h);
          case "ticket":
          case "tickets":
            return ticket.group(req, h);
          case "secession":
          case "secessions":
            return secession.group(req, h);
          case "kyc":
          case "kycs": {
            const schema = Joi.object({
              type: Joi.string()
                .allow("email", "id", "phone", "payment_methods")
                .optional(),
            });
            return kyc.group(req, h);
          }
          case "trade":
          case "trades":
            return trade.group(req, h);
          case "chat":
          case "chats":
            return chat.group(req, h);
          case "security":
          case "securities":
            return security.group(req, h);
          case "ad":
          case "ads":
          case "advert":
          case "adverts":
            return advert.group(req, h);
          default:
            return boom.badRequest(
              "Bad group request. Invalid kind of request"
            );
        }
      }
      default: {
        let { __kind, __group } = req.payload;
        if (!__group && __kind)
          return boom.badRequest("bad group request. Cannot find group option");

        switch (method) {
          case "delete": {
            return;
          }

          case "put": {
            return;
          }

          case "post": {
            switch (__kind) {
              case "user":
              case "users":
                return user.create;
              default:
                return boom.boomify("Invalid group request");
            }
          }
        }
      }
    }

    return () => boom.boomify();
  }
};
