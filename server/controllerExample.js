"use strict";

module.exports = (server) => {
  const {
    db: { Currency, sequelize },
    consts: { roles: _roles },
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
      
    },
    async list(req) {
      
    },
    async update(req) {
      
    },
    async delete(req) {
      
    },
    async bulkDelete(req) {
      
    },
    async bulkCreate(req) {
      
    },
  };
  const CurrencyGroupController = {}
    
  
  return {
    ...CurrencyController,
    group: CurrencyGroupController,
  };
};
