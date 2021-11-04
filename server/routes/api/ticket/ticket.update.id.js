"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      support_ticket: { updateByID },
    },
    consts: { TicketPriorityType, TicketStatusType },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  const schema = Joi.object({
    priority: Joi.string()
      .valid(...Object.keys(TicketPriorityType))
      .optional(),
    subject: Joi.string().optional(),
    status: Joi.string()
      .valid(...Object.keys(TicketStatusType))
      .optional(),
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
      handler: updateByID,
      auth: "jwt",
      validate: {
        payload: schema,
      },
    },
  };
};
