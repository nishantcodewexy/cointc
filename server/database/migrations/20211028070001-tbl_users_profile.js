"use strict";

let table_name = "tbl_users_profile";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface
        .describeTable(table_name)
        .then(
          async (d) =>
            await queryInterface.sequelize.transaction(async (t) => {
              return await Promise.all([
                !("date_of_birth" in d) &&
                  queryInterface.addColumn(
                    table_name,
                    "date_of_birth", // new field name
                    {
                      type: Sequelize.DATE,
                    },
                    {
                      transaction: t,
                    }
                  ),
              ]);
            })
        )
        .catch(
          async () =>
            await queryInterface.createTable(table_name, {
              profile_id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
              },
              mode: {
                type: Sequelize.ENUM,
                values: ["standard"],
                comment: "User mode state: [standard, merchant]",
              },
              invite_code: {
                type: Sequelize.STRING,
              },
              email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                  notEmpty: true,
                  isEmail: true,
                },
                references: {
                  model: 'tbl_users',
                  key: 'email'
                }
              },
              suitability: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                validate: {
                  min: 0,
                  max: 5,
                },
              },
              payment_methods: Sequelize.JSON,
              pname: { type: Sequelize.STRING, comment: "public name" },
              lname: {
                type: Sequelize.STRING,
                comment: "last name",
                allowNull: false,
              },
              oname: {
                type: Sequelize.STRING,
                comment: "other names",
                allowNull: false,
              },
              created_at: Sequelize.DATE,
              updated_at: Sequelize.DATE,
              archived_at: Sequelize.DATE,
              user_id: {
                type: Sequelize.UUID,
                references: { model: "tbl_users", key: "id" },
              },
            })
        );
    } catch (error) {
      console.error(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable(table_name, {
          transaction: t,
        }),
      ]);
    });
  },
};
