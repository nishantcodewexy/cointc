"use strict";
const boom = require("@hapi/boom");
const assert = require("assert");
const { sequelize } = require("../database/models");
const {Op} = require("sequelize")
const {filterFields} = require("../helpers")
module.exports = (server) => {
  /*********************** HELPERS ***************************/
  const { __findAllWithPagination, __destroy,__update } = require("./_methods")(server);
  const { db } = server.app;


  const AdvertController = {
    async create(req) {
      const { user,data } = req.pre;
      
      

      try {
        return user.createAdvert(data)
        
        
      } catch (error) {
        
        console.error(error)
        throw boom.boomify(error)
      }
    },

    // Delete advert
    async destroy(req) {
      const { id } = req.params;
      const { force,options } = req.query;
      const { user } = req.pre;
      const where = {
        id,
        from_user_id:user.id
      }
      try {
        const options_ = await filterFields({
          object:options||{},
          include:[
            // allow fileds goes here
            "returning"
          ]
        })
        
        return await __destroy("Advert",where,force,options_)
        
      } catch (error) {
        console.log(error)
        boom.boomify(error)
      }
    },
    // Delete advert
    async bulkDelete(req) {
      const {
        
        pre:{
          user,
          dataset:{
            soft,
            data
          }
        }
      } = req
      
      
      const where = {
        id:{
          [Op.in]:data.map(value=>value.id)
        },
        from_user_id:user.id
      }
      try {
        return await sequelize.transaction(async (transaction)=>{
          return await __destroy("Advert",where,!soft,{transaction})
        })
        
        
        
      } catch (error) {
        console.log(error)
        throw boom.boomify(error)
      }
    },

    // retrieve advert
    async retrieve(req) {
      const { id } = req.params;

      return db.Advert.findByPk(id);
    },

    // fetch all adverts
    async list(req) {
      const {query} = req
      const searchFields = [
      ]
      const options = {
        // attributes:[]
      }
      return await __findAllWithPagination("Advert",query,{},searchFields,options)
      
    },
    // update
    async update(req) {
      const {
        pre:{
          data,
          user
        },
        params:{
          id
        }
      } = req
      const where = {
        id,
        from_user_id:user.id
      }
      const options = {
        
      }
      
      return await __update("Advert",data,where,options)
      
    },
    // bulkUdate
    async bulkUpdate(req) {
      const {
        pre:{
          dataset,
          user
        }
      } = req

      return await sequelize.transaction(async (transaction)=>{
        return await Promise.all(dataset.map(data=>{
          const where = {
            from_user_id:user.id,
            id:data.id
          }
          
          delete data.id
          return __update("Advert",data,where,{transaction})
        }))

      })
      
    },
  };
  // const AdvertGroupController = (req, h) => {
  //   console.log("User group controller called!");
  // };
  
  // return { ...AdvertController, group: AdvertGroupController };
  return AdvertController
};
