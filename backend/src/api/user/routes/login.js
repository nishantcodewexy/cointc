const Joi = require("joi");
const { authenticate: handler } = require("../controllers/user.js");

const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9@_-]{6,30}$"))
    .required(),
});

module.exports = {
  method: "POST",
  path: "/login",
  config: {
    handler,
    // auth: {
    //   mode: "try",
    // },
    validate: {
      payload: schema,
    },
  },
}
