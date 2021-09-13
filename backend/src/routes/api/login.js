const Joi = require("joi");
const { authenticate: handler } = require("../../controllers/auth/user.js");

const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")).required(),
});

module.exports.register = (server) => {
  const db = server.app.database;

  server.route(
    {
      method: "POST",
      path: `/api/v1/auth/login`,
      handler,
      options: {
        validate: {
          payload: schema,
        },
      },
    },
    {
      method: "GET",
      path: "/api/v1/auth/logout",
      options: {
        handler: (request, h) => {
          request.cookieAuth.clear();
          return h.redirect("/");
        },
      },
    }
  );
};