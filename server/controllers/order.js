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

  const orderController = {
    async create(req) {
      const {
        pre:{
          user,
          data:{payload}
        }
        
      } = req
      
      
      try {
        return await user.createOrder(payload)
        
      } catch (error) {
        console.error(error)
        throw boom.boomify(error)
      }
      
    },

    // Delete Order
    async destroy(req) {
      const { id } = req.params;
      const { user } = req.pre;
      

      try {
        const {error,value} = Joi.object({
          force:Joi.boolean().default(false).optional()
        }).validate(req.payload)
        
        let where,options,force_
        where = user.isAdmin?{id}:{
          id,
          from_user_id:user.id
        }

        force_ = user.isAdmin&&value?value.force:false
        
        options = {}
        
        return await __destroy("Order",where,force_,options)
        
        
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
      if(user.isAdmin){
        force_ = force
        where = {}
      }else{
        force = false
        where = {
          [Op.in]: data.map(v=>v.id),
          from_user_id:user,id
        }
      }

      return await __destroy("Order",where,force_,options)
    },

    

    // retrieve Order
    async retrieve(req) {
      const { id } = req.params;
      const { user } = req.pre;
      
      try {
        let where
        if(user.isAdmin){
          where = {id}
        }else{
          where = {
            id,
            from_user_id:user.id
          }
        }
        return Order.findOne({where});
        
      } catch (error) {
        console.error(error)
        throw boom.boomify(error)
      }
    },

    // fetch all Orders
    async list(req) {
      const {
        query,
        pre:{
          user
        }
      } = req

      let where,searchFields,options
      searchFields = [
        "status",
        "appeal",
        "remark"
      ]
      options={}
      
      if(user.isAdmin){
        where = {}
      }else{
        where = {
          from_user_id:user.id
        }
      }
      

      try {
        return await __findAllWithPagination("Order",query,where,searchFields,options)
       
      } catch (error) {
        console.error(error)
        throw boom.boomify(error)
      }
    },
    async update(req){
      const {
        pre:{
          user,
          data:{
            payload
          }
        },
        params:{
          id
        }
      } = req


      try {
        
          let where,options
    
    
          // const order = await Order.findOne({
          //   where:{
          //     id,
          //     from_user_id:user.id
          //   }
          // })
          // const advert = await order.getAdvert()
          // console.log("order",order)
          // console.log("advert",advert)
    
          options = {}
    
          where = {
            id,
            from_user_id:user.id
          }
          return await  __update("Order",payload,where,options)
      } catch (error) {
        console.error(error)
        throw boom.boomify(error)
      }
    }
  };
  
  
  
  return orderController
};
