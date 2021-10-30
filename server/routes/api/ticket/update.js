"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      support_ticket: { update },
    },
    consts: { TicketSubjectType, TicketStatusType },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  const schema = Joi.object({
    subject: Joi.string().required(),
    severity: Joi.string().valid(...Object.keys(TicketSubjectType)),
    status: Joi.string().valid(...Object.keys(TicketStatusType)),
  });

  return {
    method: "PUT",
    path: "/ticket/{id}",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: update,
      auth: "jwt",
      validate: {
        payload: schema,
      },
    },
  };
};
