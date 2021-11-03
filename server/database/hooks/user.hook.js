const { encrypt } = require("../../helpers");
const _ = require("underscore");

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
    let trim = options?.trim ?? true;
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      let profile = await instance.getProfile();
      let addresses = await instance.getAddresses();
      // let kyc = await instance.getKyc();

      let compiled = {
        ...profile?.toJSON(),
        addresses,
       /*  kyc, */
        ...(trim
          ? _.omit(instance?.toJSON(), ["password"])
          : instance?.toJSON()),
      };
      instance.dataValues = {
        ...compiled,
      };
    }
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
