"use strict";
const {Op} = require('sequelize');
const bank_detail = require('../database/models/bank_detail');
module.exports = (server) => {
  const {
    db: { BankDetail, sequelize },
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

        return await BankDetail.findOne({
            where:{
                id,
                archive_at:null,
                ...(!isAdmin?{user_id:user.id}:{}),
            },
            attributes: { exclude: ['user_id',"archive_at","UserId"] }
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
                    "bank_name",
                    "currency",
                    "country"
                ],
                extra:{
                    ...(!isAdmin?{
                        user_id:user.id,
                    }:{}),
                    archive_at:null
                }
            })
            
            
            const queryset = BankDetail.findAndCountAll(filterResults)
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


        return await BankDetail.update(payload,{
            where:{
                ...(!isAdmin?{
                    user_id:user.id,
                }:{}),
                archive_at:null,
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
            const bank_detail = await BankDetail.create({...payload,user_id:user.id})
            return bank_detail
            
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

        return await BankDetail.update({archive_at:new Date(Date.now())},{
            where:{
                ...(!isAdmin?{
                    user_id:user.id,
                }:{}),
                archive_at:null,
                id
            }
        })
        
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
