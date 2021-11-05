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
    boom,
  } = server.app;

  return {
    payload: Joi.object({
      min_order_qty: Joi.number()
        .required()
        .error(
          boom.badRequest(`Required input <min_order_qty::number> is invalid`)
        ),
      max_order_qty: Joi.number()
        .required()
        .error(
          boom.badRequest(`Required input <max_order_qty::number> is invalid`)
        ),
      min_order_price: Joi.number()
        .required()
        .error(
          boom.badRequest(`Required input <min_order_price::number> is invalid`)
        ),
      max_order_price: Joi.number()
        .required()
        .error(
          boom.badRequest(`Required input <max_order_price::number> is invalid`)
        ),
      payment_methods: Joi.any()
        .allow(
          Joi.object().allow({}),
          Joi.array().items(Joi.object()),
          Joi.string()
        )
        .required()
        .error(
          boom.badRequest(
            `Required input <payment_method::array[string]> is invalid`
          )
        ),
      type: Joi.string()
        .pattern(patterns.ad_type)
        .required()
        .error(boom.badRequest(`Required input <type::string> is invalid`)),
      price: Joi.number()
        .required()
        .error(boom.badRequest(`Required input <price::number> is invalid`)),
      qty: Joi.number()
        .required()
        .error(boom.badRequest(`Required input <qty::number> is invalid`)),
      crypto: Joi.string()
        .required()
        .error(boom.badRequest(`Required input <crypto::string> is invalid`)),
      fiat: Joi.string()
        .label("Fiat currency")
        .required()
        .error(boom.badRequest(`Required input <fiat::string> is invalid`)),
      payment_ttl_mins: Joi.number()
        .integer()
        .allow(-1)
        .label("Payment time to live")
        .optional()
        .error(
          boom.badRequest(
            `Optional input <payment_time_limit::number> is invalid`
          )
        ),
      floating_price: Joi.number()
        .optional()
        .error(
          boom.badRequest(`Optional input <floating_price::number> is invalid`)
        ),
      remarks: Joi.string()
        .optional()
        .error(boom.badRequest(`Optional input <remarks::string> is invalid`)),
      auto_reply_message: Joi.string()
        .optional()
        .error(
          boom.badRequest(
            `Optional input <auto_reply_message::string> is invalid`
          )
        ),
      trade_conditions: Joi.string()
        .optional()
        .error(
          boom.badRequest(
            `Optional input <trade_conditions::string> is invalid`
          )
        ),
      published: Joi.boolean()
        .default(false)
        .optional()
        .error(
          boom.badRequest(`Optional input <published::string> is invalid`)
        ),
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
      ids: Joi.array().items(
        Joi.string()
          .uuid()
          .error(boom.badRequest(`Required input <id::uuid> is invalid`))
      ),
      id: Joi.string()
        .uuid()
        .error(boom.badRequest(`Required input <id::uuid> is invalid`)),
      min_order_qty: Joi.number()
        .optional()
        .error(
          boom.badRequest(`optional input <min_order_qty::number> is invalid`)
        ),
      max_order_qty: Joi.number()
        .optional()
        .error(
          boom.badRequest(`optional input <max_order_qty::number> is invalid`)
        ),
      min_order_price: Joi.number()
        .optional()
        .error(
          boom.badRequest(`optional input <min_order_price::number> is invalid`)
        ),
      max_order_price: Joi.number()
        .optional()
        .error(
          boom.badRequest(`optional input <max_order_price::number> is invalid`)
        ),
      payment_methods: Joi.any()
        .allow(
          Joi.object().allow({}),
          Joi.array().items(Joi.object()),
          Joi.string()
        )
        .optional()
        .error(
          boom.badRequest(`optional input <payment_method::any> is invalid`)
        ),
      price: Joi.number()
        .optional()
        .error(boom.badRequest(`optional input <price::number> is invalid`)),
      qty: Joi.number()
        .optional()
        .error(boom.badRequest(`optional input <qty::number> is invalid`)),
      crypto: Joi.string()
        .optional()
        .error(boom.badRequest(`optional input <crypto::string> is invalid`)),
      fiat: Joi.string()
        .optional()
        .error(boom.badRequest(`optional input <fiat::string> is invalid`)),
      payment_ttl_mins: Joi.number()
        .integer()
        .allow(-1)
        .label("Payment time to live")
        .optional()
        .error(
          boom.badRequest(
            `Optional input <payment_ttl_mins::number> is invalid`
          )
        ),
      floating_price: Joi.number()
        .optional()
        .error(
          boom.badRequest(`Optional input <floating_price::number> is invalid`)
        ),
      remarks: Joi.string()
        .optional()
        .error(boom.badRequest(`Optional input <remarks::string> is invalid`)),
      auto_reply_message: Joi.string()
        .optional()
        .error(
          boom.badRequest(
            `Optional input <auto_reply_message::string> is invalid`
          )
        ),
      trade_conditions: Joi.string()
        .optional()
        .error(
          boom.badRequest(
            `Optional input <trade_conditions::string> is invalid`
          )
        ),
      published: Joi.boolean()
        .default(false)
        .optional()
        .error(
          boom.badRequest(`Optional input <published::string> is invalid`)
        ),
    })
      .xor("id", "ids")
      .without("id", "ids"),
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
      ids: Joi.array().items(update(server)?.payload),
    }),
  };
}
// RETRIEVE ------------------------------------------------

function findByID(server) {
  return {
    params: update(server)?.params,
  };
}
// REMOVE ------------------------------------------------

function remove(server) {
  const { boom } = server.app;
  return {
    params: Joi.object({
      id: Joi.string()
        .uuid()
        .error(boom.badRequest(`Required input [<id::uuid>] is invalid`)),
    }),
    payload: Joi.object({
      ids: Joi.array()
        .items(
          Joi.string()
            .uuid()
            .error(boom.badRequest(`Required input [<id::uuid>] is invalid`))
        )
        .optional()
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
  bulkUpdate,
  restore,
  bulkRestore,
  retrieve: findByID,
};
