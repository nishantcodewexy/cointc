const Joi = require("joi");
// CREATE ------------------------------------------------

/**
 * @function create - Schema validator for creating a single currency entity
 * @param {Object} server - Hapi server instance
 * @returns {Object} validator
 */
function create(server) {
  const {
    consts: { patterns },
  } = server.app;

  return {
    payload: Joi.object({
      min_order_qty: Joi.number().required(),
      max_order_qty: Joi.number().required(),
      min_order_price: Joi.number().required(),
      max_order_price: Joi.number().required(),
      payment_method: Joi.string().required(),
      type: Joi.string()
        .pattern(patterns.ad_type)
        .required(),
      price: Joi.string().required(),
      qty: Joi.number().required(),
      crypto_currency: Joi.string().required(),
      fiat_currency: Joi.string().required(),
      payment_time_limit: Joi.string()
        .isoDate()
        .optional(),
      floating_price: Joi.boolean().optional(),
      remark: Joi.string().optional(),
      auto_reply_message: Joi.string().optional(),
      trade_conditions: Joi.string().optional(),
      published: Joi.boolean()
        .default(false)
        .optional(),
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
        .uuid()
        .required()
        .error(boom.badRequest(`Required input <id::uuid> is invalid`)),
    }),
    payload: Joi.object({
      min_order_qty: Joi.number()
        .optional()
        .error(
          boom.badRequest(`Required input <min_order_qty::number> is invalid`)
        ),

      max_order_qty: Joi.number()
        .optional()
        .error(
          boom.badRequest(`Required input <max_order_qty::number> is invalid`)
        ),

      min_order_price: Joi.number()
        .optional()
        .error(
          boom.badRequest(`Required input <min_order_price::number> is invalid`)
        ),

      max_order_price: Joi.number()
        .optional()
        .error(
          boom.badRequest(`Required input <max_order_price::number> is invalid`)
        ),

      payment_method: Joi.object()
        .optional()
        .error(
          boom.badRequest(`Required input <payment_method::objec> is invalid`)
        ),

      payment_time_limit: Joi.string()
        .isoDate()
        .optional()
        .error(boom.badRequest(`Required input <id::uuid> is invalid`)),

      price: Joi.string()
        .optional()
        .error(boom.badRequest(`Required input <id::uuid> is invalid`)),

      floating_price: Joi.boolean()
        .optional()
        .error(boom.badRequest(`Required input <id::uuid> is invalid`)),

      qty: Joi.number()
        .optional()
        .error(boom.badRequest(`Required input <id::uuid> is invalid`)),

      crypto_currency: Joi.string()
        .optional()
        .error(boom.badRequest(`Required input <id::uuid> is invalid`)),

      fiat_currency: Joi.string()
        .optional()
        .error(boom.badRequest(`Required input <id::uuid> is invalid`)),

      remark: Joi.string()
        .optional()
        .error(boom.badRequest(`Required input <id::uuid> is invalid`)),

      auto_reply_message: Joi.string()
        .optional()
        .error(boom.badRequest(`Required input <id::uuid> is invalid`)),

      trade_conditions: Joi.string()
        .optional()
        .error(boom.badRequest(`Required input <id::uuid> is invalid`)),

      published: Joi.boolean()
        .default(false)
        .optional()
        .error(boom.badRequest(`Required input <id::uuid> is invalid`)),
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
      data: Joi.array().items(update(server)?.payload),
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
    }),

    params: update(server)?.params,
  };
}

function bulkRemove(server) {
  const { boom } = server.app;
  return {
    payload: Joi.object({
      data: Joi.array()
        .items(
          Joi.string()
            .uuid()
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
  return {
    params: update(server)?.params,
  };
}

function bulkRestore(server) {
  const { boom } = server.app;
  return {
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

module.exports = {
  create,
  update,
  remove,
  bulkCreate,
  bulkUpdate,
  bulkRemove,
  restore,
  bulkRestore,
};
