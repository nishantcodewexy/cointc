const { encrypt } = require("../../helpers");

module.exports = {
  // prioryty 1
  // beforeBulkCreate:async (instances,options)=>{

  // },
  // beforeBulkDestroy:async (options)=>{

  // },
  // beforeBulkUpdate:async (options)=>{

  // },

  // prioryty 4
  beforeCreate: async (instance, options) => {
    if (!instance) return;
    instance.password = await encrypt(instance.password);
  },

  afterFind: async (findResult, options) => {
    if (!findResult) return;
    let _array = [];
    if (!Array.isArray(findResult)) _array = [findResult];
    for (const instance of _array) {
      let profile = await instance.getProfile();

      if (instance)
        instance.dataValues = {
          ...profile?.dataValues,
          ...instance?.dataValues,
        };
    }
    console.log(findResult);
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
  // afterCreate:async (instance,options)=>{

  // },
  // afterDestroy:async (instance,options)=>{

  // },
  //   afterUpdate: async (instance, options) => {
  //     let profile = await instance.getProfile();

  //     if (instance)
  //       instance.dataValues = {
  //         ...profile?.dataValues,
  //         ...instance?.dataValues,
  //       };
  //   },
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
