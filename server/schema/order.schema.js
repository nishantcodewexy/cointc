const Joi = require("joi");
// CREATE ------------------------------------------------

/**
 * @function create - Schema validator for creating a single currency entity
 * @param {Object} server - Hapi server instance
 * @returns {Object} validator
 */
function confirm(server) {
  const { boom } = server.app;

  return {
    params: Joi.string().uuid().required()
    .error(boom.badData(`Id is required`))
  };
}
/**
 * @function create - Schema validator for creating a single currency entity
 * @param {Object} server - Hapi server instance
 * @returns {Object} validator
 */
function create(server) {
  const { boom } = server.app;

  return {
    payload: Joi.object({
      total_amount: Joi.number()
        .required()
        .error(boom.badData(`Required data <total_amount::number> is invalid`)),
      total_quantity: Joi.number()
        .required()
        .error(
          boom.badData(`Required data <total_quantity::number> is invalid`)
        ),
      advert_id: Joi.string()
        .uuid()
        .required()
        .error(boom.badData(`Required data <advert_id::uuid> is invalid`)),
    }),
  };
}
// UPDATE ------------------------------------------------

/**
 * @function update - Schema validator for updating a single currency entity
 * @param {Object} server - Hapi server instance
 * @returns
 */
function update(server) {
  const { boom } = server.app;

  return {
    params: Joi.object({
      id: Joi.string()
        .pattern(/^ORD-\d{13}$/)
        .required()
        .error(boom.badRequest(`Required input <id::uuid> is invalid`)),
    }),
    payload: Joi.object({
      /*  ids: Joi.array()
        .items(Joi.string().pattern(/^ORD-\d{13}$/))
        .optional(),
 */
      appeal: Joi.string()
        .max(100)
        .optional()
        .label("Order Appeal"),

      remark: Joi.string()
        .max(100)
        .label("Order remark")
        .optional()
        .error(
          boom.badRequest(
            `Missing or invalid payload input <remark::text>`
          )
        ),

      status: Joi.string()
        .valid(
          "unpaid",
          "paid",
          "completed",
          "disputed",
          "cancelled"
        )
        .optional()
        .error(
          boom.badRequest(`Missing or invalid payload input <status::string>`)
        ),

      rating: Joi.number()
        .integer()
        .min(0)
        .max(5)
        .optional()
        .error(boom.badRequest(`Required input <rating::number> is invalid`)),

      trx_id: Joi.string()
        .label("Transaction ID")
        .optional(),
    }),
  };
}

// REMOVE ------------------------------------------------

function remove(server) {
  const { boom } = server.app;
  return {
    params: retrieve(server)?.params,
    payload: Joi.object({
      ids: Joi.array()
        .items(
          Joi.string()
            .pattern(/^ORD-\d{13}$/)
            .error(boom.badRequest(`Required input [<id::uuid>] is invalid`))
        )
        .error(boom.badRequest(`Required input <data::Array> is invalid`)),
      force: Joi.boolean()
        .default(false)
        .optional()
        .error(new Error("Optional input <force::boolean> is invalid")),
    }).error(boom.badRequest(`Required input <payload::Object> is invalid`)),
  };
}

// RESTORE ------------------------------------------------

function restore(server) {
  const { boom } = server.app;
  return {
    params: update(server)?.params,
    payload: Joi.object({
      data: Joi.array()
        .items(
          Joi.string()
            .uuid()
            .error(boom.badRequest(`Required input [<id::uuid>] is invalid`))
        )
        .error(boom.badRequest(`Required input <data::Array> is invalid`)),
    }),
  };
}
// RETRIEVE ------------------------------------------------

function find(server) {
  const {
    consts: { patterns },
    boom,
  } = server.app;

  return {
    params: Joi.object({
      id: Joi.string()
        .pattern(patterns?.order_no)
        .required()
        .error(
          boom.badData("required data <id::string> is not a valid order number")
        ),
    }),
  };
}

module.exports = {
  create,
  update,
  remove,
  restore,
  find,
  confirm
};
