module.exports = {
  // prioryty 1
  // beforeBulkCreate:async (instances,options)=>{

  // },
  // beforeBulkDestroy:async (options)=>{

  // },
  // beforeBulkUpdate:async (options)=>{

  // },

  // prioryty 4
  // beforeCreate:async (instance,options)=>{
  //     console.log("this is called",instance)
  // },
  // beforeDestroy:async (instance,options)=>{

  // },
  // beforeUpdate:async (instance,options)=>{

  // },
  // beforeSave:async (instance,options)=>{

  // },
  // beforeUpsert:async (values,options)=>{

  // },

  // prioryty 5
  afterCreate:async (instance,options)=>{
    const {crypto,type,user_id} = instance.advert
    let wallet,sellersId;
    // get sellers wallet
    if(type == "buy"){
      sellersId = instance.user_id
    }else{
      sellersId = user_id
    }
    // get wallet by sellersId
    // freeze amount in sellers wallet
    
    
    // compute current_qty in advert

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
