"use strict";

module.exports = {
  afterFind: async (findResult, options) => {
    if (!findResult) return;
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (let instance of findResult) {
      let user = await instance?.getUser();

      instance.dataValues = {
        ...instance.dataValues,
        user: user?.dataValues,
      };
    }
  },
};
