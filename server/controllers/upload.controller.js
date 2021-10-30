"use strict";
const { Op } = require("sequelize");

const { filterFields } = require("../services/model");
const { uploader, imageFilter } = require("../services/fileUpload");

module.exports = function UploadController(server) {
  const {
    db: { Upload },
    consts: { FILE_UPLOAD_PATH },
    helpers: { filters, paginator },
    boom,
  } = server.app;
  /* const queryInterface = sequelize.getQueryInterface();
      const table = Currency.getTableName(); */
  return {
    //   RETRIEVE ---------------------------------------------------
    /**
     * @function get - Gets currency collection
     * @param {Object} req
     * @returns
     */
    async retrieve(req) {
      const {
        params: { id },

        pre: { user },
      } = req;

      const upload = await Upload.findOne({
        where: {
          id,
          ...(!user?.isAdmin && { user_id: user.id }),
        },
        attributes: {
          exclude: [
            "deleted_at",
            "user_id",
            "UserId",
            "updated_at",
            "updatedAt",
          ],
        },
      });

      if (!Upload) {
        throw boom.notFound(`Upload not found!`);
      }
      return upload;
    },
    async bulkRetrieve(req) {
      const {
        query,
        pre: { user },
      } = req;

      try {
        let extend = query.extend;
        const filterResults = await filters({
          query,
          extra: {
            ...(!(user?.isAdmin && !!extend) && { user_id: user?.id }),
          },
        });

        const queryset = Upload.findAndCountAll({
          ...filterResults,
          attributes: [
            "id",
            "mimetype",
            "original",
            "thumbnail",
            "description",
            "created_at",
          ],
        });
        return await paginator({
          queryset,
          limit: filterResults.limit,
          offset: filterResults.offset,
        });
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    //   CREATE ---------------------------------------------------
    /**
     * @function create
     * @param {Object} req
     * @returns
     */
    async create(req) {
      const {
        payload: { file },
        pre: { user },
      } = req;

      const fileOptions = {
        dest: `${FILE_UPLOAD_PATH}/`,
        fileFilter: imageFilter,
      };

      try {
        // save the file
        const fileDetails = await uploader(file, fileOptions);

        if (!Array.isArray(fileDetails)) {
          const upload = await Upload.create({
            mimetype: fileDetails.mimetype,
            original: fileDetails,
            user_id: user.id,
          });

          return filterFields({
            object: upload.dataValues,
            include: ["id", "original", "mimetype", "created_at"],
          });
        } else {
          const uploads = await Upload.bulkCreate(
            fileDetails.map((value) => ({
              mimetype: value.mimetype,
              original: value,
              user_id: user?.id,
            }))
          );

          return await Promise.all(
            uploads.map((value) =>
              filterFields({
                object: value.dataValues,
                include: ["id", "original", "mimetype", "created_at"],
              })
            )
          );
        }
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    //   REMOVE ---------------------------------------------------

    async remove(req) {
      const {
        params: { id },
        pre: { user },
      } = req;

      const result = await Upload.destroy({
        where: {
          id,
          ...(!user?.isAdmin && { user_id: user.id }),
        },
      });

      if (!result) throw boom.notFound();

      return result;
    },

    /**
     * @function bulkRemove
     * @param {Object} req
     * @returns
     */
    async bulkRemove(req) {
      const {
        pre: { user },
        payload,
      } = req;

      const result = await Upload.destroy({
        where: {
          id: {
            [Op.in]: payload,
          },
          ...(!user?.isAdmin && { user_id: user.id }),
        },
      });

      if (!result) throw boom.notFound();
      return result;
    },
  };
};
