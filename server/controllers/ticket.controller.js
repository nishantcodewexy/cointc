"use strict";
const {Op} = require('sequelize');

const {filterFields} = require("../services/model")

module.exports = function SupportTicketController (server) {
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
  return  {
    /**
     * @function get - Gets currency collection
     * @param {Object} req
     * @returns
     */
    async retrieve(req) {
        const {
            query,
            pre:{
                isAdmin
            },
            auth:{
                credentials:{
                    user
                }
            },
            params:{
                id
            }
        } = req

        return await Ticket.findOne({
            where:{
                id,
                ...(!isAdmin?{user_id:user.id}:{}),
            },
            attributes: { exclude: ['user_id',"UserId","deleted_at"] }
        })
    },
    async list(req) {
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

        
        try {


            const filterResults = await filters({
                query,
                searchFields:[
                    "description"
                ],
                extra:{
                    ...(!isAdmin?{
                        user_id:user.id,
                    }:{})
                }
            })
            
            
            const queryset = Ticket.findAndCountAll(filterResults)
            return await paginator({queryset,limit:filterResults.limit,offset:filterResults.offset})
            
        } catch (error) {
            console.error(error)
            throw boom.boomify(error)
            
        }

        
    },
    async update(req) {
        const {
            pre:{
                isAdmin
            },
            auth:{
                credentials:{
                    user
                }
            },
            payload,
            params:{
                id
            }
        } = req


        return await Ticket.update(payload,{
            where:{
                ...(!isAdmin?{
                    user_id:user.id,
                }:{}),
                id
            }
        })
    },
    async create(req) {
        const {
            payload,
            auth:{
                credentials:{
                    user
                }
            }
        } = req
        try {
            const object =  await Ticket.create({...payload,user_id:user.id})
            return filterFields({object:object.dataValues,exclude:[
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
    async delete_(req) {
        const {
            pre:{
                isAdmin
            },
            auth:{
                credentials:{
                    user
                }
            },
            params:{id}
        } = req

        return await Ticket.destroy({
            where:{
                ...(!isAdmin?{
                    user_id:user.id,
                }:{}),
                id
            }
        })
        
    },
    // async bulkDelete(req) {
      
    // },
    // async bulkCreate(req) {
      
    // },
  };
};
