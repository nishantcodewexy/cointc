"use strict";
const assert = require("assert");

const { Op } = require("sequelize");

module.exports = (server) => {
  const { 
    db:{
      Secession
    },
    boom,
    helpers:{
      filters,
      paginator
    },
   } = server.app;
  const secessionController = {
    async create(req){

      const {
        payload,
        auth:{
          credentials:{
            user
          }
        },
      } = req

      
      const {id,level,status,description} =  await Secession.create({...payload,user_id:user.id})
      return {id,level,status,description}
      
    },
    async getAll(req){
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
        const filterResults = await filters({query,searchFields:[
          "status",
          "description"
        ]})

        
        const queryset = Secession.findAndCountAll(filterResults)
        
        
        return await paginator({queryset,limit:filterResults.limit,offset:filterResults.offset})
        
      }else{
        const filterResults = await filters({query,extra:{
          user_id:user.id,
          archived_at:{
            [Op.is]: null
          }
        }})
        
        const queryset = Secession.findAndCountAll(filterResults)
  
        return await paginator({queryset,limit:filterResults.limit,offset:filterResults.offset})
        
        
    }

    },
    async get(req){
      const {
        params:{id},
        pre:{
          isAdmin
        }
      } = req
      
      if(!isAdmin) throw boom.forbidden()

      return await Secession.findByPk(id)
    },
    async delete_(req){
      const {
        params:{
          id
        },
        pre:{
          isAdmin
        }
      } = req


      if(!isAdmin) throw boom.forbidden()

      return await Secession.destroy({
        where:{id},
      })

    },
    async bulkDelete(req){
      const {
        pre:{
          isAdmin
        },
        payload
      } = req


      if(!isAdmin) throw boom.forbidden()

      return await Secession.destroy({
        where:{
          id:{
            [Op.in]:payload
          }
        },
      })

    },
    async update(req){
      const {
        payload,
        params:{
          id
        }
      } = req

      return await Secession.update(payload, {
        where: {id}
      })
    },
  };
  
  const secessionGroupController = (req, h) => {};

  return { ...secessionController, group: secessionGroupController };
};
