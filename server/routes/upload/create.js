"use strict";
const Joi = require("joi")

module.exports = (server) => {
  const {
    controllers: {
      upload: { create },
    },
    consts: { 
      roles: _roles,
      types:{
        country
      }
    },
    helpers:{
      permissions:{
        isAdmin
      }
    }
  } = server.app;

  


  return {
    method: "POST",
    path: "/uploads",
    config: {
      pre: [
        {
          method: (req) =>{
            
            return _roles.admin
          },
          assign: "role",
        },
        [
          
          {
            method:isAdmin,
            assign: "isAdmin",
          },

        ]
      ],
      handler: create,
      auth: "jwt",
      payload:{
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        multipart: true
      }
      
    },
    
  };
};
