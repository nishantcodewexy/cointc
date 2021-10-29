const Joi = require("joi");

// AUTHENTICATE ------------------------------------------
function authenticate(server) {
  const {
    boom,
    consts: { patterns },
  } = server.app;

  return {
    payload: Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .error(boom.badData("Required data <email::string> is invalid")),
      password: Joi.string()
        .pattern(patterns.password)
        .required()
        .error(boom.badData("Required data <password::string> is invalid")),
      access_level: Joi.number()
        .max(3)
        .default(1)
        .required()
        .error(boom.badData("Required data <access_level::number> is invalid")),
    }).with("email", "password"),
  };
}

// REGISTER ------------------------------------------------

/**
 * @function register - Schema validator for creating a single record
 * @param {Object} server - Hapi server instance
 * @returns {Object} validator
 */
function register(server) {
  const {
    boom,
    consts: { patterns },
  } = server.app;

  return {
    payload: Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .error(boom.badRequest("Required data <email::string> is invalid")),
      password: Joi.string()
        .pattern(patterns.password)
        .required()
        .error(
          boom.badRequest(
            `Required input <password::string(${patterns.password})> is invalid`
          )
        ),
      repeat_password: Joi.ref("password"),
      invite_code: Joi.string()
        .allow("", null)
        .error(
          boom.badRequest("optional input <invite_code::string> is invalid")
        ),
    }).with("password", "repeat_password"),
  };
}

// CREATE ------------------------------------------------

/**
 * @function create - Schema validator for creating a single record
 * @param {Object} server - Hapi server instance
 * @returns {Object} validator
 */
function create(server) {
  const {
    boom,
    consts: { patterns },
  } = server.app;

  return {
    payload: Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .error(boom.badRequest("Required data <email::string> is invalid")),
      password: Joi.string()
        .pattern(patterns.password)
        .optional()
        .error(
          boom.badRequest(
            `optional data <password::string(${patterns.password})> is invalid`
          )
        ),
      invite_code: Joi.string()
        .optional()
        .error(
          boom.badRequest("optional data <invite_code::string> is invalid")
        ),
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
      iso_code: Joi.string()
        .optional()
        .error(boom.badRequest("Required input <iso_code::string> is invalid")),
      name: Joi.string()
        .optional()
        .error(boom.badRequest("Required input <name::string> is invalid")),
      type: Joi.string()
        .optional()
        .error(boom.badRequest("Required input <type::string> is invalid")),
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
  const { boom } = server.app;
  return {
    payload: Joi.object({
      force: Joi.boolean()
        .default(false)
        .optional()
        .error(boom.badData("Optional input <force::boolean> is invalid")),
    }).optional(),

    params: retrieve(server)?.params,
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
// RETRIEVE ------------------------------------------------

function retrieve(server) {
  return {
    params: update(server)?.params,
  };
}

module.exports = {
  authenticate,
  create,
  update,
  remove,
  bulkCreate,
  bulkUpdate,
  bulkRemove,
  restore,
  bulkRestore,
  retrieve,
  register,
};
