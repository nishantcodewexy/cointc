"use strict";
const boom = require("@hapi/boom");

function OrderController(server) {
  const { __destroy } = require("./utils")(server);
  const {
    db: { Order, Advert, User, Wallet },
    helpers: { filters, paginator },
  } = server.app;

  return {
    // CREATE ---------------------------------------------------------

    /**
     * @function create - create single order record
     * @param {Object} req
     * @returns
     */
    async create(req) {
      const {
        pre: {
          user: { user, fake },
        },
        payload,
      } = req;

      const { advert_id,total_quantity } = payload;
      if (!advert_id) throw boom.badRequest("Missing advert_id in request");
      
      try {
        // find advert
        let ad = await Advert.findByPk(advert_id);
        if (ad) {
          // create order using the user info
          let result;

          if(fake){
            result = await Order.FAKE()
          }else if(ad.publish && ad.current_qty >= total_quantity){

            let sellersId = ad.type === "sell"? ad.user_id : user.id

            // check if order is a sell order i.e advert is a buy advert
            // verify that seller has sufficient balance
            if(ad.type==="buy"){
              let sellersWallet = Wallet.findOne({
                where:{
                  user_id:sellersId,
                  currency:ad.crypto
                }
              })

              /**
               * @typedef {Object} Balance
               * @property {String} availableBalance
               * @property {String} accountBalance
               */

              /**
               * @type {Balance}
               */
              let {availableBalance} = await sellersWallet.getBalance()
              
              if(parseFloat(availableBalance) < parseFloat(total_quantity)){
                throw boom.badRequest("insufficient balance")
              }
              

            }



            
            result = await user.createOrder({
              ...payload,
              blocked_account_id:sellersId
            })

          }else{
            throw boom.notFound(
              "Not permitted"
            );
          }

          return {
            
            result
          };
        } else
          throw boom.notFound(
            "Advert cannot be found! Cannot create order for non-existent ad"
          );
      } catch (error) {
        console.error(error);
        throw boom.internal(error.message, error);
      }
    },
    // REMOVE ---------------------------------------------------------

    /**
     * @function removeByID - remove a single record
     * @param {Object} req
     * @returns
     */
    async removeByID(req) {
      const {
        params: { id },
        payload: { force = false },
        pre: {
          user: {
            user: { user, sudo },
          },
        },
      } = req;

      try {
        let where = { id };
        return { deleted: Boolean(await __destroy("Order", where, force)) };
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    // RETRIEVE ---------------------------------------------------------
    /**
     * @function findByID
     * @param {Object} req
     * @returns
     */
    async findByID(req) {
      const {
        params: { id },
        pre: {
          user: { user, fake },
        },
      } = req;
      try {
        let result = fake ? await Order.FAKE() : await Order.findByPk(id);
        return { result };
      } catch (error) {
        console.error(error);
        throw boom.internal(error.message, error);
      }
    },
    // RETRIEVE ---------------------------------------------------------
    /**
     * @function findByID
     * @param {Object} req
     * @returns
     */
    async confirmByID(req) {
      const {
        params: { id },
        pre: {
          user: { user, fake },
        },
      } = req;
      try {

        let result;
        if (fake){
          result = await Order.FAKE()

        }else{

          let buyersId,sellersId;
          
          // get order by id
          const order = await Order.findByPk(id);

          // get advert from order
          const advert = await order.getAdvert()

          // check if user is permitted to confirm order
          let permitted = order.user_id === user.id || advert.user_id == user.id

          // throught error if user is not permitted
          !permitted && boom.badRequest("you do not have permission to confirm this order")

          if(order.order_user_confirm&&order.advert_user_confirm){
            throw boom.badRequest("order has already been confirmed")
          }

          // set order confirm
          if(order.user_id === user.id){
            order.order_user_confirm = user.id
            
          }else if(advert.user_id == user.id){
            order.advert_user_confirm = user.id
          }

          // save order after confirm
          await order.save()


          // set buyers and sellers id
          if(advert.type==="buy"){
            buyersId = advert.user_id
            sellersId = order.user_id;
          }else{
            buyersId = order.user_id
            sellersId = advert.user_id
          }


          // unfreeze sellers Wallet if both buyer and seller confirms order
          if(order.order_user_confirm&&order.advert_user_confirm){
            const sellerWallet = await Wallet.findOne({
              where:{
                user_id:sellersId,
                currency:advert.crypto
              }
            })

            const buyersWallet = await Wallet.findOne({
              where:{
                user_id:buyersId,
                currency:advert.crypto
              }
            })


            // unfreeze sellers wallet 
            await sellerWallet.unfreezeWallet(order.blockage_id)

            // send fund to buyer
            await sellerWallet.transfer({
              wallet:buyersWallet,
              qty:order.total_quantity
            })

          }
          
        }

        return { result };
      } catch (error) {
        console.error(error);
        throw boom.internal(error.message, error);
      }
    },

    /**
     * @function find
     * @param {Object} req
     * @returns
     */
    async find(req) {
      const {
        query,
        pre: {
          user: { user, fake, fake_count },
        },
      } = req;

      try {
        const queryFilters = await filters({
          query,
          searchFields: ["appeal", "remark", "status"],
        });

        const options = {
          ...queryFilters,
          // include: [{ model: Advert }, User],
        };

        const queryset = fake
          ? await Order.FAKE(fake_count)
          : await Order.findAndCountAll(options);
        const { limit, offset } = queryFilters;
        return await paginator({
          queryset,
          limit,
          offset,
        });
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    /**
     * @function updateByID
     * @param {Object} req
     * @returns
     */
    async updateByID(req) {
      const {
        params: { id },
        payload,
        pre: {
          user: { user, sudo, fake, fake_count },
        },
      } = req;

      try {
        let fields = ["status", "rating", "trx_id", "appeal", "remark"],
          result,
          where = {
            id,
            ...(!sudo && { user_id: user?.id }),
          };

          const {status} = payload
          
        
        result = await Order.update(payload, {
          where,
          fields,
          returning: true,
        }).then(([count]) => count);

        return {
          id,
          status: Boolean(result),
        };
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },
  };
}

module.exports = OrderController;
