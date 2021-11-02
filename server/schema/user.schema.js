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
      const _update_schema = _updateSchema(server);
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
      const _update_schema = _updateSchema(server);
      return {
        payload: Joi.alternatives().try(
          Joi.object(_update_schema),
          Joi.object({
            data: Joi.array().items(schema?.id),
          })
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

function _updateSchema(server) {
  const { boom } = server.app;
  return {
    profile: Joi.object({
      lname: Joi.string()
        .optional()
        .error(boom.badData("<lname::string> is invalid")),
      oname: Joi.string()
        .optional()
        .error(boom.badData("<oname::string> is invalid")),
      pname: Joi.string()
        .optional()
        .error(boom.badData("<pname::string> is invalid")),
      mode: Joi.string()
        .optional()
        .error(boom.badData("<mode::string> is invalid")),     
      payment_methods: Joi.any()
        .allow({})
        .optional()
        .error(boom.badData("<payment_methods::string> is invalid")),
    
    })
      ?.optional()
      .error(boom.badData("<profile::object> is invalid")),
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
      .error(boom.badData("<email::string> is invalid")),
    password: Joi.string()
      .pattern(patterns.password)
      .error(boom.badData("<password::string> is invalid")),
    repeat_password: Joi.ref("password"),
    invite_code: Joi.string()
      .allow("", null)
      .error(boom.badRequest("<invite_code::string> is invalid")),
    access_level: Joi.number()
      .max(3)
      .default(1)
      .error(boom.badData("<access_level::number> is invalid")),
  };
}
