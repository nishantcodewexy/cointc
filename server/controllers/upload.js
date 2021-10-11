"use strict";
const {Op} = require('sequelize');

const {filterFields} = require("../services/model")
const {
    uploader,
    imageFilter
} = require("../services/fileUpload")

module.exports = (server) => {
  const {
    db: { Upload, sequelize },
    consts: { 
        roles: _roles,
        FILE_UPLOAD_PATH
     },
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
            },
            auth:{
                credentials:{
                    user
                }
            },
            pre:{
                isAdmin
            }
        } = req
        
        const upload =  await Upload.findOne({
            where:{
                id,
                ...(isAdmin?{}:{user_id:user.id})
            },
            attributes: { exclude: ["deleted_at","user_id","UserId","updated_at","updatedAt"] }
        })

        if(!Upload){
            throw boom.notFound()
        }
        return upload
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
            let extend = query.extend
            const filterResults = await filters({
                query,
                extra:{
                    ...(isAdmin&&!!extend?{}:{user_id:user.id})
                }
                
            })
            
            
            const queryset = Upload.findAndCountAll({
                ...filterResults,
                attributes:[
                    "id",
                    "mimetype",
                    "original",
                    "thumbnail",
                    "description",
                    "created_at"
                ]
            })
            return await paginator({queryset,limit:filterResults.limit,offset:filterResults.offset})
            
        } catch (error) {
            console.error(error)
            throw boom.boomify(error)
            
        }

        
    },
    async create(req) {
        const {
            payload:{
                file
            },
            auth:{
                credentials:{
                    user
                }
            }
        } = req

        
        
        const fileOptions = {
            dest:`${FILE_UPLOAD_PATH}/`,
            fileFilter:imageFilter
        }
        
        try {
            // save the file
            const fileDetails = await uploader(file, fileOptions);
            
            if(!Array.isArray(fileDetails)){
                const upload = await Upload.create({
                    mimetype:fileDetails.mimetype,
                    original:fileDetails,
                    user_id:user.id,
                })

                return filterFields({object:upload.dataValues,include:[
                    "id",
                    "original",
                    "mimetype",
                    "created_at"
                ]})

            }else{
                const uploads = await Upload.bulkCreate(fileDetails.map(value=>({
                    mimetype:value.mimetype,
                    original:value,
                    user_id:user.id,
                })))
                
                
                return await Promise.all(uploads.map(value=>filterFields({object:value.dataValues,include:[
                    "id",
                    "original",
                    "mimetype",
                    "created_at"
                ]})))
            }
            
            
            
        } catch (error) {
            console.error(error)
            throw boom.boomify(error)
        }
    },
    async delete_(req) {
        const {
            params:{id},
            pre:{
                isAdmin
            },
            auth:{
                credentials:{
                    user
                }
            }
        } = req

        const result = await Upload.destroy({
            where:{
                id,
                ...(isAdmin?{}:{user_id:user.id})
            }
        })

        if(!result) throw boom.notFound()

        return result

        
    },
    async bulkDelete(req) {
        const {
            pre:{
                isAdmin
            },
            auth:{
                credentials:{
                    user
                }
            },
            payload
        } = req

        const result = await Upload.destroy({
            where:{
                id:{
                    [Op.in]:payload
                },
                ...(isAdmin?{}:{user_id:user.id})
            }
        })

        if(!result) throw boom.notFound()

        return result
    },
    // async bulkCreate(req) {
      
    // },
  };
  const CurrencyGroupController = {}
    
  
  return {
    ...CurrencyController,
    group: CurrencyGroupController,
  };
};
