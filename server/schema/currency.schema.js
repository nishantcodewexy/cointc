const Joi = require("joi");

// CREATE ------------------------------------------------

/**
 * @function create - Schema validator for creating a single currency entity
 * @param {Object} server - Hapi server instance
 * @returns {Object} validator
 */
function create(server) {
  const { boom } = server.app;

  return {
    payload: Joi.object({
      iso_code: Joi.string()
        .required()
        .error(boom.badRequest("Required input <iso_code::string> is invalid")),
      name: Joi.string()
        .required()
        .error(boom.badRequest("Required input <name::string> is invalid")),
      type: Joi.string()
        .required()
        .error(boom.badRequest("Required input <type::string> is invalid")),
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
