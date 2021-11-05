const Joi = require("joi");

module.exports = function(server) {
  let schema = _getSchema(server);
  const { boom } = server.app;
  return {
    // AUTHENTICATE ------------------------------------------
    /**
     * @function login
     * @returns
     */
    login() {
      return {
        payload: Joi.object({
          email: schema?.email?.required(),
          password: schema?.password?.required(),
          access_level: schema?.access_level?.required(),
        }).with("email", "password"),
      };
    },

    // REGISTER ------------------------------------------------

    /**
     * @function register - Schema validator for creating a single record
     * @returns {Object} validator
     */
    register() {
      return {
        payload: Joi.object({
          email: schema?.email?.required(),
          password: schema?.password?.required(),
          invite_code: schema?.invite_code,
          repeat_password: schema?.repeat_password,
        }).with("password", "repeat_password"),
      };
    },

    // CREATE ------------------------------------------------

    /**
     * @function create - Schema validator for creating a single record
     * @returns {Object} validator
     */
    create() {
      const {
        boom,
        consts: { patterns },
      } = server.app;

      return {
        payload: Joi.object({
          email: schema?.email,
          password: schema?.password,
          invite_code: schema?.invite_code,
        }),
      };
    },
    // UPDATE ------------------------------------------------

    /**
     * @function updateByID - Schema validator for updating a single currency entity
     * @returns
     */
    updateByID() {
      const _update_schema = _sudo_update_schema(server);
      return {
        payload: Joi.object(_update_schema).allow({}),
        params: Joi.object({ id: schema.id?.required() }),
      };
    },

    /**
     * @function update - Schema validator for creating bulk currency entities
     * @returns
     */
    update() {
      const _update_schema = _sudo_update_schema(server);
      return {
        payload: Joi.alternatives().try(
          Joi.object().keys({
            active: Joi.boolean(),
          }),
          Joi.object()
            .keys({
              ids: Joi.array().items(schema?.id),
              ..._update_schema,
            })
            .or("active", "ids", "suitability")
        ),
      };
    },
    // REMOVE ------------------------------------------------
    /**
     * @function removeByID
     * @returns
     */
    removeByID() {
      return {
        payload: Joi.object({
          force: schema?.force,
        }).optional(),
        params: Joi.object({ id: schema?.id?.required() }),
      };
    },
    /**
     * @function remove
     * @returns
     */
    remove() {
      const { boom } = server.app;
      return {
        payload: Joi.object({
          data: Joi.array()
            .items(schema?.id)
            .optional()
            .error(boom.badRequest(`Required input <data::Array> is invalid`)),
          force: schema?.force,
        }).error(
          boom.badRequest(`Required input <payload::Object> is invalid`)
        ),
      };
    },

    // RESTORE ------------------------------------------------
    /**
     * @function restoreByID
     * @returns
     */
    restoreByID() {
      return {
        params: Joi.object({ id: schema?.id?.required() }),
      };
    },
    /**
     * @function restore
     * @returns
     */
    restore() {
      const { boom } = server.app;
      return {
        payload: Joi.object({
          data: Joi.array()
            .items(schema?.id)
            .error(boom.badRequest(`Required input <data::Array> is invalid`)),
        }),
      };
    },
    // RETRIEVE ------------------------------------------------
    /**
     * @function find
     * @returns
     */
    find() {
      return {};
    },

    /**
     * @function findByID
     * @returns
     */
    findByID() {
      return {
        params: Joi.object({ id: schema?.id?.required() }),
      };
    },
  };
};

function _sudo_update_schema(server) {
  const { boom } = server.app;
  return {
    active: Joi.boolean(),
    suitability: Joi.number(),
  };
}

function _getSchema(server) {
  const {
    boom,
    consts: { patterns },
  } = server.app;
  return {
    id: Joi.string()
      .uuid()
      .error(boom.badRequest(`<id::uuid> is invalid`)),
    force: Joi.boolean()
      .default(false)
      .error(boom.badData("<force::boolean> is invalid")),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .label("Email address")
      .error(boom.badData("<email::string> is invalid")),
    password: Joi.string()
      .pattern(patterns.password)
      .error(boom.badData("<password::string> is invalid")),
    repeat_password: Joi.ref("password"),
    invite_code: Joi.string()
      .label("Invitation code")
      .allow("", null)
      .error(boom.badRequest("<invite_code::string> is invalid")),
    access_level: Joi.number()
      .max(3)
      .default(1)
      .label("Access Level")
      .error(boom.badData("<access_level::number> is invalid")),
  };
}
