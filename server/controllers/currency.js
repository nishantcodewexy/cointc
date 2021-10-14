"use strict";
const uuid = require("uuid");
module.exports = (server) => {
  const {__findAllWithPagination} = require("./_methods")(server)
  const {
    db: { Currency, sequelize },
    consts: { roles: _roles },
    helpers: { filters, paginator },
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
      try {
        let {
          query,
          pre: { user },
        } = req;
        // let where = id ? { id } : null;
        //TODO: Only admins are allowed to see who created the currency
        const filterResult = await filters({
          query,
          searchFields: ["name", "iso_code", "type"],
        });
        let queryset = Currency.findAndCountAll(filterResult);
        return paginator({
          queryset,
          limit: filterResult,
          offset: filterResult.offset,
        });
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    async list(req) {
      try {
        let {
          query,
          pre:{
            user
          }
        } = req;
        

        let { paranoid = true } = query;
        

        let options,searchFields

        paranoid = query.paranoid
        delete query.paranoid
        options = {}

        searchFields = ["name", "iso_code", "type"]
        options = {
          attributes:[
            "id",
            "name",
            "iso_code",
            "type",
            "created_at",
            "updated_at",
            "archived_at",
          ]
        }
        if(user.isAdmin){
          options = {...options,paranoid}
        }

        return await __findAllWithPagination("Currency",query,{},searchFields,options)
        
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },
        /**
     * @function create - Creates currency (**Admin only**)
     * @param {Object} req - Request object
     * @param {Object[]} req.payload
     * @returns
     */
         create: async (req) => {
          const {
            payload,
            pre:{
              user
            }
          } = req;
         

          /**
           * @type {Array}
           */
          const data = payload?.map(currency=>({
            ...currency,
            created_by : user.id,
            id : uuid.v4(),
          }))
          
          
          try {
            return await sequelize.transaction(
              async (t) =>
                 await Currency.bulkCreate(data, {
                  transaction: t,
                  validate: true,
                  fields: ["id", "type", "iso_code", "name", "created_by"],
                  returning: ["id", "type", "iso_code", "name"],
                })
            );
          } catch (error) {
            console.error(error);
            return boom.boomify(error);
          }
        },
        async update(req) {
          const {
            payload,
            auth: {
              credentials: { user },
            },
          } = req;
    
          try {
            return await sequelize.transaction(async (t) => {
              return Promise.all(
                payload.map(
                  async ({ id, restore, ...row }) =>
                    await Currency.update(
                      { ...row },
                      {
                        where: { id, created_by: user.id },
                        transaction: t,
                        validate: true,
                        returning: ["id", "name", "iso_code", "type", "created_by"],
                        fields: ["name", "iso_code", "type"],
                        // logging: console.log,
                      }
                    ).then(async ([count, affectedRows]) => {
                      restore &&
                        (await Currency.restore({
                          where: { id, created_by: user.id },
                        }));
                      return affectedRows[0];
                    })
                )
              );
            });
          } catch (error) {
            console.error(error);
            return boom.forbidden(error);
          }
        },
        async destroy(req) {
          const {
            payload: { data, force = false },
            pre:{
              user
            }
          } = req;
    
          try {
            return {
              deleted: await sequelize.transaction(async (t) => {
                return await Currency.destroy({
                  where: { id: data, created_by: user.id },
                  transaction: t,
                  force,
                }).then((affectedRows) => affectedRows);
              }),
            };
          } catch (error) {
            console.error(error);
            return boom.forbidden(error);
          }
        },
  };
  
  return CurrencyController
};
