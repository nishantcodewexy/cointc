"use strict";
const assert = require("assert");
const {Op} = require("sequelize")

module.exports = (server) => {
  const {__findAllWithPagination,__destroy} = require("./_methods")(server)
  const {
    db: { Referral,Profile,User },
    boom,
    helpers:{
      filters,
      paginator
    },
    
  } = server.app;

  const orderController = {

    // Delete Order
    async bulkDestroy(req) {

      

      

      try {
        const {data,force} = req.payload;
        const where = {
          [Op.or]:data
        }
        

        return await __destroy("Referral",where,force,{});
        
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
      
      
      
      try {


        let where,options,searchFields;
        searchFields = [

        ]
        options = {}
        
        if(user.isAdmin){
          where = {}
          
        }else{
          where = {
            referral_id:user.id
          }

        }

        return await __findAllWithPagination("Referral",query,where,searchFields,options)
        
      } catch (error) {
        console.error(error)
        throw boom.boomify(error)
      }
      
    },
  };
  
  const orderGroupController = (req, h) => { };
  
  return { ...orderController, group: orderGroupController };
};
