const Joi = require("joi");

const create = (server) => {
  const {
    consts: {
      types: { currencies },
    },
    boom,
  } = server.app;

  Joi.object({
    account_no: Joi.string()
      .regex(/^\w{1,17}$/)
      .required()
      .error(boom.badRequest("Account number must be between 1 and 17")),
    /* 
     SWIFT CODE FORMAT: AAAABBCCDDD

    AAAA: 4 character bank code
    BB: 2 character country code
    CC: 2 character location code 
    */
    swift_code: Joi.string()
      .alphanum()
      .min(8)
      .max(11)
      .required()
      .error(boom.badRequest("Invalid SWIFT code")),

    currency: Joi.string()
      .valid(...Object.keys(currencies))
      .required()
      .error(boom.badRequest("Invalid currency input")),

    bank_name: Joi.string()
      .optional()
      .error(boom.badRequest("Bank name is invalid")),
  });
};

const update = create;

const remove = () => ({
  params: Joi.object({
    id: Joi.string()
      .uuid()
      .required()
      .error(new Error("Invalid ID provided")),
  }),
});

module.exports = {
  create,
  update,
  remove
};
