"use strict";

const AdvertController = (server) => {
  const {
    db: { Advert, User, sequelize },
    boom,
  } = server.app;

  async function completionRate(total_orders, total_completed_orders) {
    return (total_completed_orders / total_orders) * 100;
  }

  return {
    /**
     * @function create - Creates a single advert
     * @param {Object} req 
     * @returns 
     */
    async create(req) {
      const { payload, user } = req;
      try {
        return user.createAdverts([payload]);
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },

    // REMOVE ---------------------------------------
    async remove(req) {
      const { id } = req.params;

      return await Advert.destroy({
        where: id,
      });
    },

    // RETRIEVE ------------------------------------------------
    async retrieve(req) {
      const { id } = req.params;

      return Advert.findByPk(id);
    },

    // fetch all adverts
    async bulkRetrieve(req) {
      return await Advert.findAll({
        group: ["user_id"],
        raw: true,
        include: [
          {
            association: "orders",
            attributes: [
              [
                sequelize.fn(
                  "sum",
                  sequelize.col("status"),
                  sequelize.literal("="),
                  sequelize("orders.status.value")
                ),
                "completed_orders",
              ],
              [sequelize.fn("sum", sequelize.col("status")), "total_orders"],
            ],
          },
        ],
        // attributes: [[sequelize.fn() , 'completion_rate']],
        logging: console.log,
      });
    },
  };
};

module.exports = AdvertController;
