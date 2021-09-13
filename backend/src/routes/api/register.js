const Joi = require("joi");
const { create: handler } = require("../../controllers/auth/User");

const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")).required(),
  referrer: Joi.string().min(21),
});

module.exports.register = (server) => {
  const db = server.app.database;

  server.route({
    method: "POST",
    path: `/api/v1/auth/register`,
    handler,
    options: {
      validate: {
        payload: schema,
      },
    },
  });
};
