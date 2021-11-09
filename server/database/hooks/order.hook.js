const STATUS = {
  pending: "PENDING",
  completed: "COMPLETED",
  disputed: "DISPUTED",
  cancelled: "CANCELLED",
};
const {Model} = require('sequelize')


module.exports = {
  
  // prioryty 1
  // beforeBulkCreate:async (instances,options)=>{

  // },
  // beforeBulkDestroy:async (options)=>{

  // },
  // beforeBulkUpdate:async (options)=>{

  // },

  // prioryty 4
  /**
   * 
   * @param {Model} instance 
   * @param {Object} options 
   */
  beforeCreate:async (instance,options)=>{
    const {Wallet,} = instance?.sequelize?.models

    /**
     * @type {Model}
     */
    const advert = await instance?.getAdvert()

    

    const {crypto} = advert

    let wallet,currency,quantity;
    // get sellers wallet
    currency = crypto
    quantity = instance?.total_quantity
    
    

    // get wallet by sellersId
    /**
     * @type {Model}
     */
    wallet = await Wallet.findOne({
      where:{
        user_id:instance.blocked_account_id,
        currency
      }
    })

    // freeze amount in sellers wallet
    let {id:blockageId} = await wallet.freezeWallet(quantity)

    // set blockage id
    instance.blockage_id = blockageId


  },
  // beforeDestroy:async (instance,options)=>{

  // },
  // beforeUpdate:async (instance,options)=>{

  // },
  // beforeSave:async (instance,options)=>{

  // },
  // beforeUpsert:async (values,options)=>{

  // },

  // prioryty 5
  /**
   * 
   * @param {Model} instance 
   * @param {Object} options 
   */
  afterCreate:async (instance,options)=>{
    
    /**
     * @type {Model}
     */
    const advert = await instance?.getAdvert()

    

    // compute current_qty in advert
    /**
     * @type {Array}
     */
    const orders = await advert?.getOrders()

    const totalOrderQuantity = orders.filter((value)=>value.status != STATUS.cancelled).reduce((previousValue, currentValue)=>currentValue.total_quantity+previousValue,0)
    advert.current_qty = advert.initial_qty - totalOrderQuantity
    advert.save()

  },
  async afterFind(findResult, options) {
    if (!findResult) return;
    if (!Array.isArray(findResult)) findResult = [findResult];

    for (const instance of findResult) {
      if (instance instanceof this) {
        let user = await instance?.getUser();
        let advert = await instance.getAdvert();
        instance.dataValues = {
          ...instance?.dataValues,
          advert: advert?.dataValues,
          user: user?.dataValues,
        };
      }
    }
  },
  
  // afterDestroy:async (instance,options)=>{

  // },
  // afterUpdate:async (instance,options)=>{

  // },
  // afterSave:async (instance,options)=>{

  // },
  // afterUpsert:async (created,options)=>{

  // },

  // priority 6

  // afterBulkCreate:async (instances,options)=>{

  // },
  // afterBulkDestroy:async (options)=>{

  // },
  // afterBulkUpdate:async (options)=>{

  // },
};
