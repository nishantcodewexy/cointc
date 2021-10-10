"use strict";
const assert = require("assert");
const {Op} = require("sequelize")

module.exports = (server) => {
  const {
    db: { Referral,Profile,User },
    boom,
    helpers:{
      filters,
      paginator
    },
    
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
          referral_code
        },
        pre:{
          isAdmin
        }
        
      } = req



      
      

      if(!isAdmin) throw boom.forbidden()
      
      const userProfile = await Profile.findOne({
        where:{
          referral_code
        }
      })

      

      if(!userProfile) throw boom.notFound()
      
      let referrer = await User.findByPk(userProfile.user_id,{
        attributes:[
          "id",
          "email",
        ]
      });
      user.addReferrer(referrer)
      return referrer

      
    },

    // Delete Order
    async bulkDestroy(req) {

      const {
        pre:{
          isAdmin
        }
      } = req

      // only allow action if it admin
      if(!isAdmin) throw boom.forbidden()

      const data = req.payload;

      return await Referral.destroy({
        where: {
          [Op.or]:data
        },
        force: true,
      });
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
      
      
      return {}
      
      
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
