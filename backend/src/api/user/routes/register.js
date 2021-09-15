const Joi = require("joi");
const { create: handler } = require("../controllers/user.js");

const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")).required(),
  referrer: Joi.string().min(21),
});

module.exports = {
  method: "POST",
  path: `/api/v1/auth/register`,
  handler,
  options: {
    auth: false,
    validate: {
      payload: schema,
    },
  },
}