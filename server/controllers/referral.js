"use strict";
const assert = require("assert");

module.exports = (server) => {
  const {
    db: { Referral,Profile },
    boom,
    helpers:{
      filters,
      paginator
    }
  } = server.app;

  const orderController = {
    async create(req) {
      const {
        auth:{
          credentials:{
            user
          }
        },
        payload:{
          referrer_code
        }
        
      } = req
      
      const userProfile = await Profile.findOne({where:{
        user_id:user.id
      }})

      if(!userProfile) throw boom.notfound()
      
      
      return Referral.create({  user_id: user.id,referrer_id:userProfile.referrer_id });
      
    },

    // Delete Order
    async destroy(req) {
      const { id } = req.params;
      
      return await Referral.destroy({
        where: id,
        force: true,
      });
    },

    

    // retrieve Order
    async get(req) {
      const { id } = req.params;
      return Referral.findByPk(id);
    },

    // fetch all Orders
    async getAll(req) {
      const {
        query,
        pre:{
          isAdmin
        },
        auth:{
            credentials:{
                user
            }
        }
      } = req
      
      
      
      
      if(isAdmin){
          const filterResults = await filters({query,searchFields:[]})
    
          const queryset = Referral.findAndCountAll(filterResults)
    
          return await paginator({queryset,limit:filterResults.limit,offset:filterResults.offset})
          
        }else{
          const filterResults = await filters({query:{},extra:{
            referrer_id:user.id
          }})
    
          const queryset = Referral.findAndCountAll(filterResults)
    
          const {count} = await paginator({queryset,limit:filterResults.limit,offset:filterResults.offset})
          return count
          
      }
    },
  };
  
  const orderGroupController = (req, h) => { };
  
  return { ...orderController, group: orderGroupController };
};
