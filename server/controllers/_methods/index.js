/* const { sequelize } = require("../../database/models")

module.exports = {
  bulkDestroy({ table, where, options, model }) {
    const queryInterface = sequelize.getQueryInterface();
    try {
      return {
        deleted: await sequelize.transaction(
        t => {
          data.forEach(id => {
            await queryInterface.bulkDelete(table_name, { id, created_by: user.id }, {}, Currency)
          });
          return true
        }
      )};
    } catch (error) {
      console.error(error);
      return boom.boomify(error);
    }
  }
} */