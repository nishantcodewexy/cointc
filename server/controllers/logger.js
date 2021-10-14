"use strict";
const assert = require("assert");
const boom = require("@hapi/boom")
const {Op} = require("sequelize")
const Joi = require("joi")

module.exports = (server) => {
  const {
    __findAllWithPagination,
    __destroy,
    __update

  } = require("./_methods")(server)
  const {
    db: { Order },
  } = server.app;

  const loggerController = {
    

    // Delete Order
    async destroy(req) {
      const { id } = req.params;
      

      try {
        const {error,value} = Joi.object({
          force:Joi.boolean().default(false).optional()
        }).validate(req.payload)
        if(error) throw boom.badRequest(error)
        
        let where,options,force_
        where = {id}

        force_ = value?value.force:false
        
        options = {}
        
        return await __destroy("Logger",where,force_,options)
        
        
      } catch (error) {
        console.error(error)
        throw boom.boomify(error)
      }
    },



    // bulk delete
    async bulkDestroy(req) {
      const {
        pre:{
          user
        },
        payload:{
          data,
          force
        }
      } = req


      let where,options,force_
      options = {}
      where = {
        [Op.in]: data.map(v=>v.id),
        
      }
      force_ = force
      

      return await __destroy("Logger",where,force_,options)
    },

    


    // fetch all Orders
    async list(req) {
      const {
        query,
      } = req

      let searchFields,options
      searchFields = []
      options={}
      
      try {
        return await __findAllWithPagination("Logger",query,{},searchFields,options)
      } catch (error) {
        console.error(error)
        throw boom.boomify(error)
      }
      
    },
    
  };
  
  
  
  return loggerController
};
