"use strict";
const {Op} = require('sequelize');

const {filterFields} = require("../services/model")

module.exports = (server) => {
  const {
    db: { ChatHistory, sequelize },
    consts: { roles: _roles },
    helpers:{
      filters,
      paginator
    },
    boom,
  } = server.app;
  /* const queryInterface = sequelize.getQueryInterface();
      const table = Currency.getTableName(); */
  const CurrencyController = {
    /**
     * @function get - Gets currency collection
     * @param {Object} req
     * @returns
     */
    async retrieve(req) {
        const {
            params:{
                id
            }
        } = req

        const chathistory =  await ChatHistory.findOne({
            where:{
                id
            },
            attributes: { exclude: ["deleted_at"] }
        })

        if(!chathistory){
            throw boom.notFound()
        }
        return chathistory
    },
    async list(req) {
        const {
            query,
        } = req

        
        try {


            const filterResults = await filters({
                query,
                searchFields:[
                    "browser"
                ]
            })
            
            
            const queryset = ChatHistory.findAndCountAll(filterResults)
            return await paginator({queryset,limit:filterResults.limit,offset:filterResults.offset})
            
        } catch (error) {
            console.error(error)
            throw boom.boomify(error)
            
        }

        
    },
    async create(req) {
        const {
            payload,
            
        } = req
        
        
        try {
            const chathistory = await ChatHistory.create({
                ...payload,
                browser:req.headers['user-agent'],
                started_at:new Date(Date.now()),
                ended_at:new Date(Date.now())
            },{
                fields:[
                    "country",
                    "visitor_email",
                    "started_at",
                    "ended_at",
                    "browser",
                ]
            })
            return filterFields({object:chathistory.dataValues,include:[
                "id",
                "country",
                "visitor_email",
                "browser",
                "started_at",
                "ended_at",
                "type",
                "created_at",
                "updated_at"
            ]})
            
            
        } catch (error) {
            console.error(error)
            throw boom.boomify(error)
        }
    },
    async delete_(req,reply) {
        const {
            params:{id}
        } = req

        const result = await ChatHistory.destroy({
            where:{
                id
            }
        })

        if(!result) throw boom.notFound()

        return null

        
    },
    // async bulkDelete(req) {
      
    // },
    // async bulkCreate(req) {
      
    // },
  };
  const CurrencyGroupController = {}
    
  
  return {
    ...CurrencyController,
    group: CurrencyGroupController,
  };
};
