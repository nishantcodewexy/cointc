"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      user: { 
        group:{
          bulkCreate
        }
       },
    },
    consts: { roles: _roles },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  // const schema = Joi.array().items(Joi.object({
  //     email:Joi.string().email().required().required(),
  //     role:Joi.string().valid(...Object.values(_roles)).required()
  // }))


  return {
    method: "POST",
    path: "/users",
    config: {
      pre: [
        {
          method: (req) => {
            return _roles.admin;
          },
          assign: "role",
        },
        {
          method: isAdminOrError,
          assign: "isAdminOrError",
        },
      ],
      handler: bulkCreate,
      auth: "jwt",
      // validate:{
      //     payload:schema
      // }
    },
  };
};
