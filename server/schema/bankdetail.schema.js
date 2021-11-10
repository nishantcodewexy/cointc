const Joi = require("joi");
// CREATE ------------------------------------------------

function create(server) {
  const {
    consts: { currencies },
    boom,
  } = server.app;

  return {
    payload: Joi.object({
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
    }),
  };
}

/**
 * @function bulkCreate - Schema validator for creating bulk currency entities
 * @param {Object} server - Hapi server instance
 * @returns
 */
function bulkCreate(server) {
  return {
    payload: Joi.object({
      data: Joi.array().items(create(server)?.payload),
    }),
  };
}

// UPDATE ------------------------------------------------

function update(server) {
  const {
    boom,
    consts: { currencies },
  } = server.app;
  return {
    params: Joi.object({
      id: Joi.string()
        .uuid()
        .required()
        .error(boom.badRequest(`Optional input <id::uuid> is invalid`)),
    }),
    payload: Joi.object({
      account_no: Joi.string()
        .regex(/^\w{1,17}$/)
        .optional()
        .error(
          boom.badRequest(`Optional input <account_no::string> is invalid`)
        ),
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
        .optional()
        .error(
          boom.badRequest(`Optional input <swift_code::string> is invalid`)
        ),

      currency: Joi.string()
        .valid(...Object.keys(currencies))
        .optional()
        .error(boom.badRequest(`Optional input <currency::string> is invalid`)),

      bank_name: Joi.string()
        .optional()
        .error(
          boom.badRequest(`Optional input <bank_name::string> is invalid`)
        ),
    }),
  };
}

/**
 * @function bulkUpdate - Schema validator for creating bulk currency entities
 * @param {Object} server - Hapi server instance
 * @returns
 */
function bulkUpdate(server) {
  const { boom } = server.app;
  return {
    payload: Joi.object({
      data: Joi.array().items(update(server?.payload)),
      paranoid: Joi.boolean()
        .optional()
        .error(boom.badRequest(`Optional input <paranoid::bool> is invalid`)),
    }),
  };
}

// REMOVE ------------------------------------------------

function remove(server) {
  return {
    payload: Joi.object({
      force: Joi.boolean()
        .default(false)
        .optional()
        .error(new Error("Optional input <force::boolean> is invalid")),
    }).optional(),

    params: update(server)?.params,
  };
}

// RESTORE ------------------------------------------------

function restore(server) {
  return {
    params: update(server)?.params,
  };
}

module.exports = {
  create,
  update,
  remove,
  restore,
  bulkCreate,
  bulkUpdate,
};
