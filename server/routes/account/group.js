"use strict";
const Joi = require("joi");

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
    db: { User },
    helpers: {
      jwt: { decodeUser },
    },
    boom,
    consts: { roles: _roles },
  } = server.app;

  return {
    method: ["POST", "GET", "PUT", "DELETE"],
    path: "/account/group/{kind}",
    config: {
      pre: [
        {
          method: (req) => {
            return User.findOne({
              where: {
                id: decodeUser(req),
              },
            });
          },
          assign: "user",
        },
        {
          method: groupRouteHandler,
          assign: "action",
        },
      ],
      handler: (req, h) => req.pre.action(req, h),
      auth: "jwt",
    },
  };

  function groupRouteHandler(req, h) {
    // get the method of request
    let method = req.method.toLowerCase();
    // {POST, GET, PUT or DELETE}
    let {
      query,
      pre,
      params: { kind },
      payload,
    } = req;
    debugger;

    // Only admins can use this route
    if (pre.user.role == _roles.admin) {
      switch (kind) {
        case "user":
        case "users": {
          switch (method) {
            case "post": {
              return user.create(payload);
            }
            case "delete": {
              return;
            }

            case "put": {
              return;
            }
            case "get":
            default: {
              if (query?.id) return user.group.getOne;
              return user.group.getMany;
            }
          }
        }

        case "statistics":
        case "stats": {
          switch (method) {
            case "get":
            default: {
              // return statistics.group.getMany(query);
            }
          }
        }

        case "permission":
        case "permissions": {
          switch (method) {
            case "get":
            default: {
              // return permission.group;
            }
          }
        }

        case "wallet":
        case "wallets": {
          switch (method) {
            case "get":
            default: {
              // return wallet.group;
            }
          }
        }

        case "ticket":
        case "tickets": {
          switch (method) {
            case "get":
            default: {
              // return ticket.group;
            }
          }
        }

        case "secession":
        case "secessions": {
          switch (method) {
            case "get":
            default: {
              // return secession.group;
            }
          }
        }

        case "kyc":
        case "kycs": {
          switch (method) {
            case "get":
            default: {
              // return kyc.group;
            }
          }
        }

        case "trade":
        case "trades": {
          switch (method) {
            case "get":
            default: {
              // return trade.group;
            }
          }
        }

        case "chat":
        case "chats": {
          switch (method) {
            case "get":
            default: {
              // return chat.group;
            }
          }
        }

        case "security":
        case "securities": {
          switch (method) {
            case "get":
            default: {
              // return security.group;
            }
          }
        }

        case "ad":
        case "ads":
        case "advert":
        case "adverts": {
          switch (method) {
            case "get":
            default: {
              // return secession.group;
            }
          }
        }
      }
    }
    return () => boom.unauthorized();
  }
};
