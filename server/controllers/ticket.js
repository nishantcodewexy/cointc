"use strict";
const {Op} = require('sequelize');

const {filterFields} = require("../services/model")

module.exports = (server) => {
    const {__findAllWithPagination,__update,__destroy} = require("./_methods")(server)
  const {
    db: { Ticket, sequelize },
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
            pre:{
                user
            },
            params:{
                id
            }
        } = req

        let where

        if(user.isAdmin){
            where = {}
        }else{
            where = {
                user_id:user.id
            }
        }

        return await Ticket.findOne({
            where,
            attributes: { exclude: ["UserId","deleted_at"] }
        })
    },
    async list(req) {
        const {
            query,
            pre:{
                user
            }
        } = req

        let where,searchFields
        searchFields = [
            "description"
        ]
        try {
            if(user.isAdmin){
                where = {}
            }else{
                where = {
                    user_id:user.id
                }
            }

            return await __findAllWithPagination("Ticket",query,where,searchFields,{})
            
        } catch (error) {
            console.error(error)
            throw boom.boomify(error)
            
        }

        
    },
    async update(req) {
        const {
            payload,
            params:{
                id
            }
        } = req

        return await __update("Ticket",payload,{id},{})
        
    },
    async create(req) {
        const {
            pre:{
                user,
                data
            }
        } = req
        try {
            const object =  await Ticket.create({...data,user_id:user.id})
            return await filterFields({object:object.dataValues,exclude:[
                "user_id",
                "deleted_at",
                "UserId",
                "user_id"
            ]})
            
            
        } catch (error) {
            console.error(error)
            throw boom.boomify(error)
        }
    },
    async destory(req) {
        const {
            query:{
                force
            },
            params:{id}
        } = req

        return await __destroy("Ticket",{id},Boolean(force),{})
        
    },
    // async bulkDelete(req) {
      
    // },
    // async bulkCreate(req) {
      
    // },
  };
  const CurrencyGroupController = {}
    
  
  return CurrencyController
};
