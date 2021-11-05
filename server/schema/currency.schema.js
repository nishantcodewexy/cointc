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
        .valid("fiat", "crypto")
        .insensitive()
        .required()
        .error(boom.badRequest("Required input <type::string> is invalid")),
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
        .valid("fiat", "crypto")
        .insensitive()
        .optional()
        .error(boom.badRequest("Required input <type::string> is invalid")),
    }),
  };
}

// REMOVE ------------------------------------------------

function remove(server) {
  const { boom } = server.app;
  return {
    params: Joi.object({
      id: Joi.string()
        .uuid()
        .error(
          boom.badRequest(`Required input [<id::uuid>] is missing or invalid`)
        ),
    }),
    payload: Joi.object({
      ids: Joi.array()
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
  restore,
  bulkRestore,
};
